import { useState } from 'react';

import { useSinglePulseCount } from '../api/countSinglePulses';
import { useLabels } from '../api/getLabels';
import { useObservationRegionKnownPulsars } from '../api/getObservationRegionKnownPulsars';
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

import '../styles/SPLabeller.css';

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

  const radius = 1;
  const observationRegionKnownPulsarsQuery = useObservationRegionKnownPulsars(
    observationIds,
    radius
  );

  const singlePulseQuery = useSinglePulses(pageNumber, pageSize, fetchLatest, observationIds);
  const singlePulseCount = useSinglePulseCount(observationIds, fetchLatest);
  const singlePulseCandidateIds = singlePulseQuery.isSuccess
    ? singlePulseQuery.data.map((sp: SinglePulse) => sp.candidate_id)
    : [];

  const labelsQuery = useLabels(singlePulseCandidateIds);

  return (
    <div className="sp-labeller-container">
      <div className="sp-options-container">
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
          fetchLatest={fetchLatest}
        />
      </div>
      <div className="sp-chart-container">
        <div className="sp-label-container">
          <PostLabelButton
            labelsAssigned={labelsAssigned}
            setLabelsAssigned={setLabelsAssigned}
            labelsQuery={labelsQuery}
          />
          <LabelButtonContainer
            labelsAssigned={labelsAssigned}
            setLabelsAssigned={setLabelsAssigned}
            selection={selection}
          />
        </div>
        <ChartContainer
          labelsAssigned={labelsAssigned}
          setSelection={setSelection}
          labelsQuery={labelsQuery}
          observationsQuery={observationsQuery}
          singlePulseQuery={singlePulseQuery}
          observationRegionKnownPulsarsQuery={observationRegionKnownPulsarsQuery}
        />
        <SinglePulsePaginationButton
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          pageSize={pageSize}
          singlePulseQuery={singlePulseQuery}
          singlePulseCount={singlePulseCount}
        />
      </div>
    </div>
  );
}

export default SPLabeller;
