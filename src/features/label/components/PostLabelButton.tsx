import { useCreateLabels } from '../api/createLabels';
import { useLabels } from '../api/getLabels';
import { useSinglePulses } from '../api/getSinglePulses';
import { useUpdateLabel } from '../api/updateLabels';
import { Label, SinglePulse } from '../types';

interface PostLabelButtonProps {
  labelsAssigned: Label[];
  setLabelsAssigned: React.Dispatch<React.SetStateAction<Label[]>>;
  pageNumber: number;
  pageSize: number;
}

function LabelButton({ ...props }: PostLabelButtonProps) {
  const singlePulseQuery = useSinglePulses(props.pageNumber, props.pageSize);
  const labelsQuery = useLabels(
    singlePulseQuery.isSuccess
      ? singlePulseQuery.data.map((sp: SinglePulse) => sp.candidate_id)
      : []
  );
  const createLabelsMutation = useCreateLabels();
  const updateLabelMutation = useUpdateLabel();

  function getRelabelled(labelsAssigned: Label[], labelsFetched: Label[]): Label[] {
    const labelsFetchedMap = new Map(
      labelsFetched.map((label: Label) => [label.candidate_id, label.id])
    );

    return labelsAssigned
      .filter((assigned: Label) => labelsFetchedMap.has(assigned.candidate_id))
      .map((assigned: Label) => ({
        ...assigned,
        id: labelsFetchedMap.get(assigned.candidate_id)
      }));
  }

  function handleClick(): void {
    if (props.labelsAssigned.length === 0) {
      return;
    }

    // First, handle label updates
    const labelsToUpdate = getRelabelled(props.labelsAssigned, labelsQuery?.data ?? []);
    const labelsToCreate = props.labelsAssigned.filter(
      (assigned: Label) =>
        !labelsToUpdate.some((updated: Label) => updated.candidate_id === assigned.candidate_id)
    );

    if (labelsToUpdate.length > 0) {
      labelsToUpdate.forEach((lab: Label) =>
        updateLabelMutation.mutate(lab, {
          // Remove updated label from state using functional form of
          // setState to ensure that previous state dependency is up-to-date
          onSuccess: () => {
            props.setLabelsAssigned((prevAssigned) =>
              prevAssigned.filter((assigned: Label) => lab.candidate_id !== assigned.candidate_id)
            );
          }
        })
      );
    }

    if (labelsToCreate.length > 0) {
      createLabelsMutation.mutate(labelsToCreate, {
        onSuccess: () => {
          // Remove created labels from state
          props.setLabelsAssigned([]);
        }
      });
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={
        createLabelsMutation.isPending ||
        !labelsQuery.isSuccess ||
        props.labelsAssigned.length === 0
      }
    >
      Save labels
    </button>
  );
}

export default LabelButton;
