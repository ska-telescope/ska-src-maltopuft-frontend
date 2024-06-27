// Plotly.js chart configuration
export const basePlotData: Partial<Plotly.PlotData> = {
  mode: 'markers',
  type: 'scatter',
  marker: {
    size: 12,
    opacity: 0.8
  }
};

export const basePlotLayout: Partial<Plotly.Layout> = {
  showlegend: true,
  width: 1000,
  height: 600,
  xaxis: {
    title: {
      text: 't',
      font: {
        family: 'Times New Roman, monospace',
        size: 18,
        color: '#cccccc'
      }
    },
    color: '#cccccc'
  },
  yaxis: {
    title: {
      text: 'DM',
      font: {
        family: 'Times New Roman, monospace',
        size: 18,
        color: '#cccccc'
      }
    },
    color: '#cccccc'
  },
  paper_bgcolor: 'rgba(0, 0, 0, 0)',
  plot_bgcolor: 'rgba(0, 0, 0, 0)',
  modebar: { bgcolor: 'rgba(0, 0, 0, 0)' },
  clickmode: 'event+select',
  legend: { font: { color: '#cccccc' } },
  uirevision: 'true',
  hovermode: 'closest'
};

export const subplotDimensions = {
  width: 500,
  height: 350
};
