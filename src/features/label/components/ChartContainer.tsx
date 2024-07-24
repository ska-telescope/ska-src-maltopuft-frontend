import { UseQueryResult } from '@tanstack/react-query';
import { useState } from 'react';

import { useEntities } from '../api/getEntities';
import { useLabels } from '../api/getLabels';
import { useSinglePulses } from '../api/getSinglePulses';
import { useSubplots } from '../api/getSubplot';
import { basePlotData } from '../config';
import { Entity, Label, Observation, SinglePulse, SubplotData } from '../types';

import Chart from './Chart';

import { queryClient } from '@/lib/react-query';

interface ChartContainerProps {
  labelsAssigned: Label[];
  setSelection: React.Dispatch<React.SetStateAction<number[]>>;
  pageNumber: number;
  pageSize: number;
  latest: boolean;
  observationsQuery: UseQueryResult<Observation[]>;
}

function ChartContainer({ ...props }: ChartContainerProps) {
  const [hoverPoint, setHoverPoint] = useState<Plotly.PlotHoverEvent | null>(null);

  const observationIds = props.observationsQuery.isSuccess
    ? props.observationsQuery.data.map((obs: Observation) => obs.id)
    : [];

  const entitiesQuery = useEntities();
  const singlePulseQuery = useSinglePulses(
    props.pageNumber,
    props.pageSize,
    props.latest,
    observationIds
  );
  const labelsQuery = useLabels(
    singlePulseQuery.isSuccess
      ? singlePulseQuery.data.map((sp: SinglePulse) => sp.candidate_id)
      : []
  );

  useSubplots(singlePulseQuery.isSuccess ? singlePulseQuery.data.map((sp: SinglePulse) => sp) : []);

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

  if (!(entitiesQuery.isSuccess && singlePulseQuery.isSuccess)) {
    return (
      <Chart
        data={[]}
        setSelection={props.setSelection}
        setHoverPoint={setHoverPoint}
        subplot={undefined}
      />
    );
  }

  const data = getPlotData(
    entitiesQuery.data,
    props.labelsAssigned,
    labelsQuery?.data ?? [],
    singlePulseQuery.data
  );
  return (
    <Chart
      data={data}
      setSelection={props.setSelection}
      setHoverPoint={setHoverPoint}
      subplot={getSubplot()}
    />
  );
}

export default ChartContainer;
