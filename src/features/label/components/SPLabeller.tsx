import { useState } from 'react';

import { useObservations } from '../api/getObservations';
import { Label } from '../types';

import ChartContainer from './ChartContainer';
import LabelButtonContainer from './LabelButtonContainer';
import ObservationDateRangePicker from './ObservationDateRangePicker';
import PostLabelButton from './PostLabelButton';
import SinglePulsePaginationButton from './SinglePulsePaginationButton';

import ToggleButton from '@/components/ToggleButton';
import dayjs from '@/lib/dayjs';

function SPLabeller() {
  const pageSize = 500;
  const todayStartUTC = dayjs().utc().startOf('day')

  const [pageNumber, setPageNumber] = useState<number>(0);
  const [latest, setLatest] = useState<boolean>(false);
  const [labelsAssigned, setLabelsAssigned] = useState<Label[]>([]);
  const [selection, setSelection] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<dayjs.Dayjs>(todayStartUTC);
  const [endTime, setEndTime] = useState<dayjs.Dayjs>(todayStartUTC.add(1, 'day'));

  const observationsQuery = useObservations(startTime, endTime);

  return (
    <>
      <ToggleButton
        isToggled={latest}
        setIsToggled={setLatest}
        buttonLabel="Fetch latest observation data"
      />
      <ObservationDateRangePicker
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
      />
      <PostLabelButton
        labelsAssigned={labelsAssigned}
        setLabelsAssigned={setLabelsAssigned}
        pageNumber={pageNumber}
        pageSize={pageSize}
      />
      {'  '}
      <LabelButtonContainer
        labelsAssigned={labelsAssigned}
        setLabelsAssigned={setLabelsAssigned}
        selection={selection}
      />
      <ChartContainer
        labelsAssigned={labelsAssigned}
        setSelection={setSelection}
        pageNumber={pageNumber}
        pageSize={pageSize}
        latest={latest}
        observationsQuery={observationsQuery}
      />
      <SinglePulsePaginationButton
        pageSize={pageSize}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        latest={latest}
      />
    </>
  );
}

export default SPLabeller;
