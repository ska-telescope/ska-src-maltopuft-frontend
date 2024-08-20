import { UseQueryResult } from '@tanstack/react-query';
import { useState } from 'react';

import { useEntities } from '../api/getEntities';
import { useSubplots } from '../api/getSubplot';
import { basePlotData, basePlotLayout } from '../config';
import {
  AxisValues,
  Entity,
  Label,
  Observation,
  SinglePulse,
  SubplotData,
  KnownPulsar,
  ObservationSources
} from '../types';

import Chart from './Chart';

import { queryClient } from '@/lib/react-query';

interface ChartContainerProps {
  labelsAssigned: Label[];
  setSelection: React.Dispatch<React.SetStateAction<number[]>>;
  labelsQuery: UseQueryResult<Label[]>;
  observationsQuery: UseQueryResult<Observation[]>;
  singlePulseQuery: UseQueryResult<SinglePulse[]>;
  observationRegionKnownPulsarsQuery: UseQueryResult<ObservationSources[]>;
}

function ChartContainer({ ...props }: ChartContainerProps) {
  const [hoverPoint, setHoverPoint] = useState<Plotly.PlotHoverEvent | null>(null);

  const entitiesQuery = useEntities();

  const fetchedSinglePulses = props.singlePulseQuery.isSuccess
    ? props.singlePulseQuery.data.map((sp: SinglePulse) => sp)
    : [];

  useSubplots(fetchedSinglePulses);

  /**
   * Merges the assigned and fetched labels to generate plot data.
   * Assigned labels take precedence over fetched labels, so elements are removed from
   * labelsFetched if they are present in labelsAssigned.
   * @param labelsAssigned Labels assigned to candidates in the interactive session
   * @param labelsFetched Candidate labels fetched with the MALTOPUFT API
   * @returns The union of fetched and assigned labels
   */
  function getPlotLabels(labelsAssigned: Label[], labelsFetched: Label[]): Label[] {
    if (labelsAssigned.length > 0 && labelsFetched.length > 0) {
      const assignedIds = new Set(labelsAssigned.map((label) => label.candidate_id));
      const filteredLabelsFetched = labelsFetched.filter(
        (fetched: Label) => !assignedIds.has(fetched.candidate_id)
      );
      return [...labelsAssigned, ...filteredLabelsFetched];
    }
    return [...labelsAssigned, ...labelsFetched];
  }

  /**
   * For an entities array (length N) and a labels array (length M), creates
   * a new array of length N which contains the entity objects with the
   * `labels` attribute.
   * @param entities An array of Entity objects
   * @param labels An array of Label objects for candidates which have been
   * labelled.
   * @returns An array of objects of type { ...Entity, labels: Label[]}
   */
  function entitiesWithLabels(entities: Entity[], labels: Label[], data: SinglePulse[]) {
    const labelCandidateIds = new Set(labels.map((label: Label) => label.candidate_id));

    const unlabelledEntity: Entity = { id: 0, css_color: '037ef2', type: 'UNLABELLED' };
    const unlabelledEntityData = {
      ...unlabelledEntity,
      labels: data
        .filter((sp: SinglePulse) => !labelCandidateIds.has(sp.candidate_id))
        .map((sp: SinglePulse) => ({
          candidate_id: sp.candidate_id,
          entity_id: unlabelledEntity.id
        }))
    };

    const labelledEntitiesData = entities.map((entity: Entity) => ({
      ...entity,
      labels: labels.filter((label: Label) => label.entity_id === entity.id)
    }));

    return [unlabelledEntityData, ...labelledEntitiesData];
  }

  /**
   * Transforms an array of SinglePulse objects to an array of
   * SinglePulse objects with the same ordering as the array of Label
   * objects
   * @param labels An array of Label objects
   * @param data An array of SinglePulse objects
   * @returns An array of SinglePulse objects
   */
  function mapToSinglePulseArray(labels: Label[], data: SinglePulse[]): SinglePulse[] {
    const dataMap = new Map<number, SinglePulse>();
    data.forEach((sp: SinglePulse) => dataMap.set(sp.candidate_id, sp));
    return labels
      .map((label) => dataMap.get(label.candidate_id))
      .filter((value): value is SinglePulse => value !== undefined);
  }

  /**
   * For an entities array (length N), a labels array (length M) and a data
   * array (length P), creates a new array of length N which contains the
   * entity objects with the `labels` and `candidates` attributes.
   * @param entities An array of Entity objects
   * @param labels An array of Label objects for candidates which have been
   * labelled.
   * @param data An array of SinglePulse objects
   * @returns An array of objects of type
   * { ...Entity, labels: Label[], candidates: SinglePulse[]}
   */
  function entitiesWithLabelsAndCandidates(
    entities: Entity[],
    labels: Label[],
    data: SinglePulse[]
  ) {
    const entityAndLabel = entitiesWithLabels(entities, labels, data);
    return entityAndLabel.map((entity) => ({
      ...entity,
      candidates: mapToSinglePulseArray.apply(data, [entity.labels as Label[], data])
    }));
  }

  /**
   * Creates the Plotly.Chart data prop, which expects an array of
   * Plotly.PlotData objects. Each object contains the data for a
   * unique entity, allowing them to be styled differently etc.
   * @param entities The objects that can be assigned as labels
   * @param labelsAssigned Labels assigned to candidates in the interactive session
   * @param labelsFetched Labels fetched from the MALTOPUFT API
   * @param data Single pulses fetched from the MALTOPUFT API
   * @returns An array of data to be rendered by the Plotly chart
   */
  function getPlotData(
    entities: Entity[],
    labelsAssigned: Label[],
    labelsFetched: Label[],
    data: SinglePulse[]
  ): Partial<Plotly.PlotData>[] {
    const plotData: Partial<Plotly.PlotData>[] = [];

    // Render empty chart if there's no data
    if (data.length === 0) {
      return [
        {
          ...basePlotData,
          x: [],
          y: []
        }
      ];
    }

    const labels = getPlotLabels(labelsAssigned, labelsFetched);
    const entitiesWithData = entitiesWithLabelsAndCandidates(entities, labels, data);

    entitiesWithData.forEach((entity) => {
      // Don't add the data to the Plotly.PlotData array if there's no data
      // for the given entity
      if (entity.labels.length === 0 || entity.candidates.length === 0) {
        return null;
      }

      plotData.push({
        ...basePlotData,
        name: entity.type,
        x: entity.candidates.map((sp: SinglePulse) => sp.observed_at),
        y: entity.candidates.map((sp: SinglePulse) => sp.candidate.dm),
        customdata: entity.candidates.map((sp: SinglePulse) => sp.candidate_id),
        marker: {
          ...basePlotData.marker,
          color: entity.css_color
        }
      });
      return plotData;
    });
    return plotData;
  }

  /**
   * Fetch the subplot for the data point being hovered over
   * @returns The base64 encoded subplot image data
   */
  function getSubplot(): string | undefined {
    if (hoverPoint === null) {
      return undefined;
    }
    const hoverCandidateId = hoverPoint.points[0].customdata;

    // Only return the subplot if fetch has completed
    const fetchState = queryClient.getQueryState(['subplot', hoverCandidateId]);
    if (fetchState?.status === 'success') {
      const hoverCandidateQueryData = queryClient.getQueryData<SubplotData>([
        'subplot',
        hoverCandidateId
      ]);
      if (hoverCandidateQueryData !== undefined) {
        return hoverCandidateQueryData.imageData;
      }
    }
    return undefined;
  }

  /**
   * Finds the minimum and maximum values of the DM(t) plot axes
   * for the selected single pulses.
   * @returns The minimum x and y axis values
   */
  function getAxisValues(): AxisValues {
    return fetchedSinglePulses.reduce<AxisValues>(
      (acc, curr) => {
        if (!acc.xMin || curr.observed_at < acc.xMin) {
          acc.xMin = curr.observed_at;
        }
        if (!acc.xMax || curr.observed_at > acc.xMax) {
          acc.xMax = curr.observed_at;
        }
        if (!acc.yMin || curr.candidate.dm < acc.yMin) {
          acc.yMin = curr.candidate.dm;
        }
        if (!acc.yMax || curr.candidate.dm > acc.yMax) {
          acc.yMax = curr.candidate.dm;
        }

        return acc;
      },
      {
        xMin: null,
        xMax: null,
        yMin: null,
        yMax: null
      }
    );
  }

  /**
   * Gets the Plotly.Shape objects defining the known pulsars which are
   * to be plotted on the Plotly.Chart component.
   *
   * The shape of each known pulsar is defined by a dashed line of constant
   * DM (y-axis) spanning all visible time values (x-axis) over the period
   * of time where the region of the known pulsar was being observed.
   * @param xMin The minimum date value of the x-axis
   * @param xMax The maximum date value of the x-axis
   * @param obsWithSources An array of observations containing an array of
   * the known pulsars in the same region
   * @returns An array of Plotly.Shape objects defining the known pulsars.
   */
  function getKnownPulsarShapes(
    xMin: Date,
    xMax: Date,
    obsSources: ObservationSources[]
  ): Partial<Plotly.Shape>[] {
    if (obsSources.length === 0) {
      return [];
    }

    const shapes: Partial<Plotly.Shape>[] = [];
    obsSources.forEach((obs) => {
      if (obs.sources.length === 0) {
        return null;
      }

      // Incase several candidates for several observations are fetched,
      // ensure current axis view covers part of the observation time
      // interval before rendering the observation's known sources
      if (xMax < obs.observation.t_min || xMin > obs.observation.t_max) {
        return null;
      }

      obs.sources.forEach((source: KnownPulsar) =>
        shapes.push({
          type: 'line',
          // Maximum of xMin and t_min
          x0: xMin > obs.observation.t_min ? xMin : obs.observation.t_min,
          // Minimum of xMax and t_max
          x1: xMax < obs.observation.t_max ? xMax : obs.observation.t_max,
          y0: source.dm,
          y1: source.dm,
          line: {
            color: '#a81963',
            width: 3,
            dash: 'dot'
          },
          label: {
            text: source.name,
            font: { size: 12, color: '#a81963' },
            textposition: 'end'
          }
        })
      );
      return shapes;
    });
    return shapes;
  }

  /**
   * If a known pulsar payload exists, update the Plotly.Layout object passed
   * to the Plotly.Chart component with the known pulsar shapes.
   * @returns A Plotly.Layout object updated with known pulsar shapes.
   */
  function prepareLayout(): Partial<Plotly.Layout> {
    const layout = basePlotLayout;
    if (!props.observationRegionKnownPulsarsQuery.isSuccess) {
      return layout;
    }

    const axisValues = getAxisValues();
    if (!(axisValues.xMin && axisValues.xMax && axisValues.yMin && axisValues.yMax)) {
      return layout;
    }

    layout.xaxis = layout.xaxis ?? {};
    layout.yaxis = layout.yaxis ?? {};
    layout.xaxis.range = [axisValues.xMin, axisValues.xMax];
    layout.yaxis.range = [axisValues.yMin, axisValues.yMax];

    layout.shapes = getKnownPulsarShapes(
      axisValues.xMin,
      axisValues.xMax,
      props.observationRegionKnownPulsarsQuery.data
    );
    return layout;
  }

  if (!(entitiesQuery.isSuccess && props.singlePulseQuery.isSuccess)) {
    return (
      <Chart
        data={[]}
        layout={basePlotLayout}
        setSelection={props.setSelection}
        setHoverPoint={setHoverPoint}
        subplot={undefined}
      />
    );
  }

  const data = getPlotData(
    entitiesQuery.data,
    props.labelsAssigned,
    props.labelsQuery?.data ?? [],
    props.singlePulseQuery.data
  );

  return (
    <Chart
      data={data}
      layout={prepareLayout()}
      setSelection={props.setSelection}
      setHoverPoint={setHoverPoint}
      subplot={getSubplot()}
    />
  );
}

export default ChartContainer;
