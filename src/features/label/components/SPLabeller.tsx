import { useState } from 'react';

import { Label } from '../types';

import ChartContainer from './ChartContainer';
import LabelButtonContainer from './LabelButtonContainer';
import PostLabelButton from './PostLabelButton';
import SinglePulsePaginationButton from './SinglePulsePaginationButton';

function SPLabeller() {
  const [labels, setLabels] = useState<Label[]>([]);
  const [page, setPage] = useState<number>(0);
  const [selection, setSelection] = useState<number[]>([]);

  return (
    <>
      <PostLabelButton labels={labels} />
      <LabelButtonContainer
        labels={labels}
        setLabels={setLabels}
        selection={selection}
        setSelection={setSelection}
      />
      <ChartContainer labels={labels} setSelection={setSelection} page={page} />
      <SinglePulsePaginationButton page={page} setPage={setPage} />
    </>
  );
}

export default SPLabeller;
