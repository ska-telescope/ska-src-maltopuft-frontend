import { useState } from 'react';

import { Label } from '../types';

import ChartContainer from './ChartContainer';
import LabelButtonContainer from './LabelButtonContainer';
import PostLabelButton from './PostLabelButton';
import SinglePulsePaginationButton from './SinglePulsePaginationButton';

function SPLabeller() {
  const pageSize = 100;
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [labelsAssigned, setLabelsAssigned] = useState<Label[]>([]);
  const [selection, setSelection] = useState<number[]>([]);

  return (
    <>
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
      />
      <SinglePulsePaginationButton
        pageSize={pageSize}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </>
  );
}

export default SPLabeller;
