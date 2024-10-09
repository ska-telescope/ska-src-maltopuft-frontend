import React from 'react';

import { Label } from '../types';

interface LabelButtonProps {
  key: number;
  entityId: number;
  type: string;
  labelsAssigned: Label[];
  setLabelsAssigned: React.Dispatch<React.SetStateAction<Label[]>>;
  selection: number[];
}

function LabelButton({ ...props }: LabelButtonProps) {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>): void {
    // Don't propagate click up to parent element
    e.stopPropagation();

    if (props.selection.length === 0) {
      return;
    }

    // Get existing labels not included in the current selection
    const unselectedLabels = props.labelsAssigned.filter(
      (label: Label) => !props.selection.includes(label.candidate_id)
    );

    const newLabels: Label[] = props.selection.map((selectedId: number) => ({
      candidate_id: selectedId,
      entity_id: props.entityId
    }));

    // Update the state with combined labels
    props.setLabelsAssigned([...unselectedLabels, ...newLabels]);
  }

  return (
    <>
      <button type="button" onClick={(e) => handleClick(e)}>
        {props.type}
      </button>
      {'  '}
    </>
  );
}

export default LabelButton;
