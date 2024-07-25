import { UseQueryResult } from '@tanstack/react-query';

import { SinglePulse } from '../types';

interface SinglePulsePaginationButtonProps {
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  singlePulseCount: UseQueryResult<number>;
  singlePulseQuery: UseQueryResult<SinglePulse[]>;
}

function SinglePulsePaginationButton({ ...props }: SinglePulsePaginationButtonProps) {
  function handleNextClick(): void {
    if (!props.singlePulseQuery.isPlaceholderData) {
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
        {props.singlePulseCount.isSuccess
          ? Math.ceil(props.singlePulseCount.data / props.pageSize)
          : '...'}
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
          props.singlePulseQuery.isPlaceholderData ||
          !props.singlePulseCount.isSuccess ||
          (props.singlePulseCount.isSuccess &&
            (props.pageNumber + 1) * props.pageSize >= props.singlePulseCount.data)
        }
      >
        Next Page
      </button>
    </div>
  );
}

export default SinglePulsePaginationButton;
