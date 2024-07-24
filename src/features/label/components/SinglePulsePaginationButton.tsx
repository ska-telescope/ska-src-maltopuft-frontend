import { useSinglePulseCount } from '../api/countSinglePulses';
import { useSinglePulses } from '../api/getSinglePulses';

interface SinglePulsePaginationButtonProps {
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  latest: boolean;
}

function SinglePulsePaginationButton({ ...props }: SinglePulsePaginationButtonProps) {
  const singlePulseQuery = useSinglePulses(props.pageNumber, props.pageSize, props.latest);
  const singlePulseCount = useSinglePulseCount(props.latest);

  function handleNextClick(): void {
    if (!singlePulseQuery.isPlaceholderData) {
      props.setPageNumber((old: number) => old + 1);
    }
  }

  function handlePrevClick(): void {
    props.setPageNumber((old: number) => Math.max(old - 1, 0));
  }

  return (
    <div>
      <span>
        Viewing page {props.pageNumber + 1} of{' '}
        {singlePulseCount.isSuccess ? Math.ceil(singlePulseCount.data / props.pageSize) : '...'}
      </span>
      {'  '}
      <button type="button" onClick={handlePrevClick} disabled={props.pageNumber === 0}>
        Previous Page
      </button>
      {'  '}
      <button
        type="button"
        onClick={handleNextClick}
        disabled={
          singlePulseQuery.isPlaceholderData ||
          !singlePulseCount.isSuccess ||
          (singlePulseCount.isSuccess &&
            (props.pageNumber + 1) * props.pageSize >= singlePulseCount.data)
        }
      >
        Next Page
      </button>
    </div>
  );
}

export default SinglePulsePaginationButton;
