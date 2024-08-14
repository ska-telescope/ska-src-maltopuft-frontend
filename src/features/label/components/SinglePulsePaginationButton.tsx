import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { IconButton } from '@mui/material';
import { UseQueryResult } from '@tanstack/react-query';

import { SinglePulse } from '../types';

import '../styles/SinglePulsePaginationButton.css';

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
    <div className="sp-pagination-button-container">
      <div className="sp-pagination-button-nav">
        <IconButton
          type="button"
          onClick={handlePrevClick}
          disabled={props.pageNumber === 0}
          sx={{
            '&.Mui-disabled': {
              '& .MuiSvgIcon-root': {
                color: '#a0a0a0'
              }
            }
          }}
        >
          <NavigateBeforeIcon sx={{ color: '#cccccc' }} />
        </IconButton>
        <IconButton
          type="button"
          onClick={handleNextClick}
          disabled={
            props.singlePulseQuery.isPlaceholderData ||
            !props.singlePulseCount.isSuccess ||
            (props.singlePulseCount.isSuccess &&
              (props.pageNumber + 1) * props.pageSize >= props.singlePulseCount.data)
          }
          sx={{
            '&.Mui-disabled': {
              '& .MuiSvgIcon-root': {
                color: '#a0a0a0'
              }
            }
          }}
        >
          <NavigateNextIcon sx={{ color: '#cccccc' }} />
        </IconButton>
      </div>
      <span>
        Page {props.pageNumber + 1} of{' '}
        {props.singlePulseCount.isSuccess
          ? Math.ceil(props.singlePulseCount.data / props.pageSize)
          : '...'}
      </span>
    </div>
  );
}

export default SinglePulsePaginationButton;
