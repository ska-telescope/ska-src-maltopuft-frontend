import Plot from 'react-plotly.js';

import { basePlotLayout, basePlotData } from '../config';
import { SinglePulse } from '../types';

interface ChartProps {
  data: SinglePulse[] | [];
}

function Chart({ ...props }: ChartProps) {
  function getUnlabelledPlotData(): Partial<Plotly.PlotData> {
    return {
      ...basePlotData,
      name: 'Unlabelled',
      x: props.data.map((d: SinglePulse) => d.observed_at),
      y: props.data.map((d: SinglePulse) => d.candidate.dm),
      customdata: props.data.map((d: SinglePulse) => d.id),
      marker: {
        ...basePlotData.marker,
        color: 'Viridis'
      }
    };
  }

  function getPlotData() {
    if (props.data.length === 0) {
      return [
        {
          ...basePlotData,
          x: [],
          y: []
        }
      ];
    }
    return [getUnlabelledPlotData()];
  }

  return (
    <div>
      <Plot
        data={getPlotData()}
        layout={basePlotLayout}
        style={{ width: '100%' }}
        useResizeHandler
      />
    </div>
  );
}

export default Chart;
