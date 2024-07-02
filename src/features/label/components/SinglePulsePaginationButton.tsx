import { useSinglePulses } from '../api/getSinglePulses';

interface SinglePulsePaginationButtonProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

function SinglePulsePaginationButton({ ...props }: SinglePulsePaginationButtonProps) {
  const singlePulseQuery = useSinglePulses(props.page);

  function handleNextClick(): void {
    if (!singlePulseQuery.isPlaceholderData) {
      props.setPage((old: number) => old + 1);
    }
  }

  function handlePrevClick(): void {
    props.setPage((old: number) => Math.max(old - 1, 0));
  }

  return (
    <div>
      <span>Current Page: {props.page + 1}</span>
      {'  '}
      <button type="button" onClick={handlePrevClick} disabled={props.page === 0}>
        Previous Page
      </button>
      {'  '}
      <button
        type="button"
        // TODO: Work out if more data is available
        onClick={handleNextClick}
        disabled={singlePulseQuery.isPlaceholderData}
      >
        Next Page
      </button>
    </div>
  );
}

export default SinglePulsePaginationButton;

// <button
// onClick={() => setPage((old) => Math.max(old - 1, 0))}
// disabled={page === 0}
// >
// Previous Page
// </button>{' '}
// <button
// onClick={() => {
//   if (!isPlaceholderData && data.hasMore) {
//     setPage((old) => old + 1)
//   }
// }}
// // Disable the Next Page button until we know a next page is available
// disabled={isPlaceholderData || !data?.hasMore}
// >
// Next Page
// </button>
// {isFetching ? <span> Loading...</span> : null}{' '}
// </div>
