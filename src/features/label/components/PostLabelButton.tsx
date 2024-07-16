import { useCreateLabels } from '../api/createLabels';
import { useLabels } from '../api/getLabels';
import { useSinglePulses } from '../api/getSinglePulses';
import { useUpdateLabel } from '../api/updateLabels';
import { Label, SinglePulse } from '../types';

interface PostLabelButtonProps {
  labelsAssigned: Label[];
  setLabelsAssigned: React.Dispatch<React.SetStateAction<Label[]>>;
}

function LabelButton({ ...props }: PostLabelButtonProps) {
  const singlePulseQuery = useSinglePulses(0, 100);
  const labelsQuery = useLabels(
    singlePulseQuery.isSuccess
      ? singlePulseQuery.data.map((sp: SinglePulse) => sp.candidate_id)
      : []
  );
  const createLabelsMutation = useCreateLabels();
  const updateLabelMutation = useUpdateLabel();

  function getFetchedLabelId(label: Label, labelsFetched: Label[]) {
    return labelsFetched.filter((fetched: Label) => fetched.candidate_id === label.candidate_id)[0]
      .id;
  }

  function getRelabelled(labelsAssigned: Label[], labelsFetched: Label[]) {
    const relabelled = labelsAssigned.filter((assigned: Label) =>
      labelsFetched.some((fetched: Label) => fetched.candidate_id === assigned.candidate_id)
    );
    return relabelled.map((lab: Label) => ({
      ...lab,
      id: getFetchedLabelId(lab, labelsFetched)
    }));
  }

  const handleClick = () => {
    if (props.labelsAssigned.length === 0) {
      return;
    }

    const labelsToUpdate = getRelabelled(props.labelsAssigned, labelsQuery?.data ?? []);

    let labelsToCreate: Label[] = [];
    if (labelsToUpdate.length > 0) {
      labelsToUpdate.map((lab: Label) => updateLabelMutation.mutate(lab));

      labelsToCreate = props.labelsAssigned.filter((assigned: Label) =>
        labelsToUpdate.some((fetched: Label) => fetched.candidate_id !== assigned.candidate_id)
      );
    } else {
      labelsToCreate = props.labelsAssigned;
    }

    if (labelsToCreate.length > 0) {
      createLabelsMutation.mutate(labelsToCreate, {
        onSuccess: () => {
          props.setLabelsAssigned([]);
        }
      });
    }
  };

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
