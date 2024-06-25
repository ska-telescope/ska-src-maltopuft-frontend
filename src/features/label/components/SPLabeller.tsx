import { useState } from 'react';

import { Label } from '../types';

import ChartContainer from './ChartContainer';
import LabelButtonContainer from './LabelButtonContainer';

function SPLabeller() {
  const [selection, setSelection] = useState<number[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);

  return (
    <>
      <LabelButtonContainer
        labels={labels}
        setLabels={setLabels}
        selection={selection}
        setSelection={setSelection}
      />
      <ChartContainer labels={labels} setSelection={setSelection} />
    </>
  );
}

export default SPLabeller;
