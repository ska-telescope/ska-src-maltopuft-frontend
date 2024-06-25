import Plot from 'react-plotly.js';

import { basePlotLayout } from '../config';

interface ChartProps {
  data: Partial<Plotly.PlotData>[];
  setSelection: React.Dispatch<React.SetStateAction<number[]>>;
}

function Chart({ ...props }: ChartProps) {
  function onPlotSelect(selectedData: Readonly<Plotly.PlotSelectionEvent>): void {
    if (selectedData.points.length > 0) {
      const selectedIds = selectedData.points.map((point) => point.customdata as number);
      props.setSelection(selectedIds);
    }
  }

  return (
    <div>
      <Plot
        data={props.data}
        onSelected={onPlotSelect}
        layout={basePlotLayout}
        style={{ width: '100%' }}
        useResizeHandler
      />
    </div>
  );
}

export default Chart;
