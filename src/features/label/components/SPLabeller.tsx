import { useSinglePulses } from '../api/getSinglePulses';

import Chart from './Chart';

function SPLabeller() {
  const singlePulseQuery = useSinglePulses();

  if (singlePulseQuery.isLoading) {
    return <Chart data={[]} />;
  }
  if (singlePulseQuery.isSuccess) {
    return <Chart data={singlePulseQuery.data} />;
  }

  return null;
}

export default SPLabeller;
