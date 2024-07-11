import { useEntities } from '../api/getEntities';
import { Entity, Label } from '../types';

import LabelButton from './LabelButton';

interface LabelButtonsBarContainerProps {
  labelsAssigned: Label[];
  setLabelsAssigned: React.Dispatch<React.SetStateAction<Label[]>>;
  selection: number[];
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
          labelsAssigned={props.labelsAssigned}
          setLabelsAssigned={props.setLabelsAssigned}
          selection={props.selection}
        />
      ));
  }

  return null;
}

export default LabelButtonContainer;
