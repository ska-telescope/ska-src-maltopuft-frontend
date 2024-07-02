import React from 'react';

import { Label } from '../types';

interface LabelButtonProps {
  key: number;
  entityId: number;
  type: string;
  labels: Label[];
  setLabels: React.Dispatch<React.SetStateAction<Label[]>>;
  selection: number[];
  setSelection: React.Dispatch<React.SetStateAction<number[]>>;
}

function LabelButton({ ...props }: LabelButtonProps) {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>): void {
    // Don't propagate click up to parent element
    e.stopPropagation();

    if (props.selection.length === 0) {
      return;
    }

    const newLabels: Label[] = [
      // Remove existing labels if selection includes labelled candidates
      ...props.labels.filter((label: Label) => !props.selection.includes(label.candidate_id)),
      ...props.selection.map((selectedId: number) => ({
        candidate_id: selectedId,
        entity_id: props.entityId,
        // Hard code user id for now
        labeller_id: 1
      }))
    ];

    props.setLabels(newLabels);
    props.setSelection([]);
  }

  return (
    <button type="button" onClick={(e) => handleClick(e)}>
      {props.type}
    </button>
  );
}

export default LabelButton;
