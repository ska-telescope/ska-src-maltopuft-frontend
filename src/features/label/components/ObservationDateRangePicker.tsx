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
        onAccept={(newStartTime) => props.setStartTime(newStartTime as dayjs.Dayjs)}
      />
      <DateTimePicker
        label="Observation end time"
        timezone="UTC"
        value={props.endTime}
        onAccept={(newEndTime) => props.setEndTime(newEndTime as dayjs.Dayjs)}
      />
    </div>
  );
}

export default ObservationDateRangePicker;
