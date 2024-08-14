import { DateTimePicker } from '@mui/x-date-pickers';

import dayjs from '@/lib/dayjs';

import '../styles/ObservationDataRangePicker.css';

interface ObservationDateRangePickerProps {
  startTime: dayjs.Dayjs;
  setStartTime: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  endTime: dayjs.Dayjs;
  setEndTime: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  fetchLatest: boolean;
}

function ObservationDateRangePicker({ ...props }: ObservationDateRangePickerProps) {
  const inlineStyling = {
    width: 220,
    '& .MuiInputBase-root': {
      color: 'rgba(255, 255, 255, 0.87)'
    },
    '& .MuiOutlinedInput-root': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(255, 255, 255, 0.87)'
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#cccccc',
        borderWidth: 2
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#646cff'
      },
      '& .MuiSvgIcon-root': {
        color: 'rgba(255, 255, 255, 0.87)'
      },
      '&:hover .MuiSvgIcon-root': {
        color: '#cccccc'
      },
      '&.Mui-focused .MuiSvgIcon-root': {
        color: '#646cff'
      }
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(255, 255, 255, 0.87)',
      '&:hover': {
        color: '#cccccc'
      },
      '&.Mui-focused': {
        color: '#646cff'
      }
    }
  };

  return (
    <div className="date-range-picker-container">
      <DateTimePicker
        label="Observation start time"
        timezone="UTC"
        value={props.startTime}
        onAccept={(newStartTime) => {
          if (newStartTime) {
            props.setStartTime(newStartTime);
          }
        }}
        sx={inlineStyling}
        disabled={props.fetchLatest}
      />
      <DateTimePicker
        label="Observation end time"
        timezone="UTC"
        value={props.endTime}
        onAccept={(newEndTime) => {
          if (newEndTime) {
            props.setEndTime(newEndTime);
          }
        }}
        sx={inlineStyling}
        disabled={props.fetchLatest}
      />
    </div>
  );
}

export default ObservationDateRangePicker;
