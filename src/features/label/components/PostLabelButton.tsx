import { useCreateLabels } from '../api/createLabels';
import { Label } from '../types';

interface PostLabelButtonProps {
  labels: Label[];
}

function LabelButton({ ...props }: PostLabelButtonProps) {
  const createLabelsMutation = useCreateLabels();

  const handleClick = () => {
    if (props.labels.length === 0) {
      return;
    }
    createLabelsMutation.mutate(props.labels);
  };

  return (
    <button type="button" onClick={handleClick} disabled={createLabelsMutation.isPending}>
      Save labels
    </button>
  );
}

export default LabelButton;
