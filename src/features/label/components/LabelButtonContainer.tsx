import { useEntities } from '../api/getEntities';
import { Entity, Label } from '../types';

import LabelButton from './LabelButton';

interface LabelButtonsBarContainerProps {
  labels: Label[];
  setLabels: React.Dispatch<React.SetStateAction<Label[]>>;
  selection: number[];
  setSelection: React.Dispatch<React.SetStateAction<number[]>>;
}

function LabelButtonContainer({ ...props }: LabelButtonsBarContainerProps) {
  const entitiesQuery = useEntities();

  if (entitiesQuery.isLoading) {
    return <p>Loading...</p>;
  }
  if (entitiesQuery.isSuccess) {
    return entitiesQuery.data
      .filter((ent: Entity) => ent.type !== 'UNLABELLED')
      .map((ent: Entity) => (
        <LabelButton
          key={ent.id}
          entityId={ent.id}
          type={ent.type}
          labels={props.labels}
          setLabels={props.setLabels}
          selection={props.selection}
          setSelection={props.setSelection}
        />
      ));
  }

  return null;
}

export default LabelButtonContainer;
