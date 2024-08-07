import { useState } from 'react';

import { useSinglePulseCount } from '../api/countSinglePulses';
import { useLabels } from '../api/getLabels';
import { useObservations } from '../api/getObservations';
import { useSinglePulses } from '../api/getSinglePulses';
import { Label, Observation, SinglePulse } from '../types';

import ChartContainer from './ChartContainer';
import LabelButtonContainer from './LabelButtonContainer';
import ObservationDateRangePicker from './ObservationDateRangePicker';
import PostLabelButton from './PostLabelButton';
import SinglePulsePaginationButton from './SinglePulsePaginationButton';

import ToggleButton from '@/components/ToggleButton';
import dayjs from '@/lib/dayjs';

/**
 * SPLabeller Component
 *
 * Responsible for labeling single pulse candidates with 'RFI', 'Single pulse'
 * or 'Periodic pulse' labels.
 *
 * It provides controls for fetching data based on observation time interval,
 * setting observation date ranges, label assignment, and paginating through
 * large single pulse datasets.
 */
function SPLabeller() {
  const pageSize = 100;
  const todayStartUTC = dayjs().utc().startOf('day');

  /* State */
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [fetchLatest, setFetchLatest] = useState<boolean>(false);
  const [labelsAssigned, setLabelsAssigned] = useState<Label[]>([]);
  const [selection, setSelection] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<dayjs.Dayjs>(todayStartUTC);
  const [endTime, setEndTime] = useState<dayjs.Dayjs>(todayStartUTC.add(1, 'day'));

  /* UseQueryResult objects */
  const observationsQuery = useObservations(startTime, endTime);
  const observationIds = observationsQuery.isSuccess
    ? observationsQuery.data.map((obs: Observation) => obs.id)
    : [];

  const singlePulseQuery = useSinglePulses(pageNumber, pageSize, fetchLatest, observationIds);
  const singlePulseCount = useSinglePulseCount(observationIds, fetchLatest);
  const singlePulseCandidateIds = singlePulseQuery.isSuccess
    ? singlePulseQuery.data.map((sp: SinglePulse) => sp.candidate_id)
    : [];

  const labelsQuery = useLabels(singlePulseCandidateIds);

  return (
    <>
      <ToggleButton
        isToggled={fetchLatest}
        setIsToggled={setFetchLatest}
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
        labelsQuery={labelsQuery}
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
        labelsQuery={labelsQuery}
        observationsQuery={observationsQuery}
        singlePulseQuery={singlePulseQuery}
      />
      <SinglePulsePaginationButton
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        singlePulseQuery={singlePulseQuery}
        singlePulseCount={singlePulseCount}
      />
    </>
  );
}

export default SPLabeller;
