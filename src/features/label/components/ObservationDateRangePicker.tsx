import { DateTimePicker } from '@mui/x-date-pickers';

import dayjs from '@/lib/dayjs';

interface ObservationDateRangePickerProps {
  startTime: dayjs.Dayjs;
  setStartTime: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  endTime: dayjs.Dayjs;
  setEndTime: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
}

function ObservationDateRangePicker({ ...props }: ObservationDateRangePickerProps) {
  return (
    <div>
      <DateTimePicker
        label="Observation start time"
        timezone="UTC"
        value={props.startTime}
        onAccept={(newStartTime) => {
          if (newStartTime) {
            props.setStartTime(newStartTime);
          }
        }}
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
      />
    </div>
  );
}

export default ObservationDateRangePicker;
