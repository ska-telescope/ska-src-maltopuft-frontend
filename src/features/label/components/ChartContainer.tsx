import { useEntities } from '../api/getEntities';
import { useSinglePulses } from '../api/getSinglePulses';
import { basePlotData } from '../config';
import { Entity, Label, SinglePulse } from '../types';

import Chart from './Chart';

interface ChartContainerProps {
  labels: Label[];
  setSelection: React.Dispatch<React.SetStateAction<number[]>>;
}

function ChartContainer({ ...props }: ChartContainerProps) {
  const entitiesQuery = useEntities();
  const singlePulseQuery = useSinglePulses();

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
    const labelCandidateIds = labels.map((label: Label) => label.candidate_id);
    const unlabelledEntity = entities.filter((entity) => entity.type === 'UNLABELLED')[0];

    const labelledEntitiesData = entities.map((entity: Entity) => ({
      ...entity,
      labels: labels.filter((label: Label) => label.entity_id === entity.id)
    }));

    const unlabelledEntityData = {
      ...unlabelledEntity,
      labels: data
        .filter((sp: SinglePulse) => !labelCandidateIds.includes(sp.candidate_id))
        .map((sp: SinglePulse) => ({
          candidate_id: sp.candidate_id,
          entity_id: unlabelledEntity.id,
          labeller_id: null
        }))
    };
    return [unlabelledEntityData, ...labelledEntitiesData];
  }

  /**
   * Transforms an array of arrays of SinglePulse objects to an array of
   * SinglePulse objects with the same ordering as the array of Label
   * objects
   * @param labels An array of Label objects
   * @param data An array of SinglePulse objects
   * @returns An array of SinglePulse objects
   */
  function mapToSinglePulseArray(labels: Label[], data: SinglePulse[]): SinglePulse[] {
    const dataMap = new Map<number, SinglePulse>();
    data.map((sp: SinglePulse) => dataMap.set(sp.candidate_id, sp));
    // @ts-ignore: the filter condition ensures that the Map.get result
    // is not null
    return labels
      .map((label) => dataMap.get(label.candidate_id) ?? null)
      .filter((value) => value !== null);
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
      candidates: mapToSinglePulseArray.apply(data, [entity.labels, data])
    }));
  }

  /**
   * Creates the Plotly.Chart data prop, which expects an array of
   * Plotly.PlotData objects. Each object contains the data for a
   * unique entity, allowing them to be styled differently etc.
   * @returns
   */
  function getPlotData(
    entities: Entity[],
    labels: Label[],
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

  if (entitiesQuery.isLoading && singlePulseQuery.isLoading) {
    return <Chart data={[]} setSelection={props.setSelection} />;
  }
  if (entitiesQuery.isSuccess && singlePulseQuery.isSuccess) {
    const data = getPlotData(entitiesQuery.data, props.labels, singlePulseQuery.data);
    return <Chart data={data} setSelection={props.setSelection} />;
  }
  return null;
}

export default ChartContainer;
