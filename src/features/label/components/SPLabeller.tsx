import { useState } from 'react';

import { Label } from '../types';

import ChartContainer from './ChartContainer';
import LabelButtonContainer from './LabelButtonContainer';
import PostLabelButton from './PostLabelButton';
import SinglePulsePaginationButton from './SinglePulsePaginationButton';

function SPLabeller() {
  const [labels, setLabels] = useState<Label[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [selection, setSelection] = useState<number[]>([]);

  return (
    <>
      <PostLabelButton labels={labels} />
      {'  '}
      <LabelButtonContainer labels={labels} setLabels={setLabels} selection={selection} />
      <ChartContainer labels={labels} setSelection={setSelection} page={pageNumber} />
      <SinglePulsePaginationButton
        pageSize={100}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </>
  );
}

export default SPLabeller;
