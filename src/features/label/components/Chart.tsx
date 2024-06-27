import { useState } from 'react';
import Plot from 'react-plotly.js';

import { basePlotLayout, subplotDimensions } from '../config';

interface ChartProps {
  data: Partial<Plotly.PlotData>[];
  setSelection: React.Dispatch<React.SetStateAction<number[]>>;
  setHoverPoint: React.Dispatch<React.SetStateAction<Plotly.PlotHoverEvent | null>>;
  subplot: string | undefined;
}

interface Coords {
  x: number;
  y: number;
}

function Chart({ ...props }: ChartProps) {
  const [subplotCoords, setSubplotCoords] = useState<Coords | null>();

  /**
   * Updates the local state to an array containing the `candidate_ids` of
   * the current selection.
   * @param selectedData An array of Plotly.Datum objects which are currently
   * selected
   */
  function handleSelect(selectedData: Readonly<Plotly.PlotSelectionEvent>): void {
    if (selectedData.points.length > 0) {
      const selectedIds = selectedData.points.map((point) => point.customdata as number);
      props.setSelection(selectedIds);
    }
  }

  /**
   * Transforms the coordinates of the point being hovered over to determine
   * the top left coordinates of the candidate subplot div for rendering.
   *
   * The subplot should be rendered (mostly) within the bounds of the Plot div
   * such that the browser window isn't resized when the subplot is rendered.
   *
   * This done by:
   *  - Adding left (top) padding if the hover x- (y-) coordinate
   *    <= 3/5*plot width (height).
   *  - Subtracting the plot width (height) and subtracting right (bottom)
   *    padding in the hover x- (y-) coordinate is > 3/5*plot width (height).
   * @param hoverCoords the coordinates of the point being hovered over
   * @returns the top left coordinates to render the subplot div
   */
  function computeTooltipCoords(hoverCoords: Coords): Coords {
    const rightPaddingPx = 17;
    const topPaddingPx = 17;
    const leftPaddingPx = 25;
    const bottomPaddingPx = 32;
    const mirrorFraction = 3 / 5;
    let { x, y } = hoverCoords;

    if (!('width' in basePlotLayout) || !('height' in basePlotLayout)) {
      return hoverCoords;
    }

    /* @ts-ignore basePlotLayout.width exists */
    if (x <= basePlotLayout.width * mirrorFraction) {
      x += rightPaddingPx;
    } else {
      x -= subplotDimensions.width + leftPaddingPx;
    }

    /* @ts-ignore basePlotLayout.height exists */
    if (y <= basePlotLayout.height * mirrorFraction) {
      y += topPaddingPx;
    } else {
      y -= subplotDimensions.height + bottomPaddingPx;
    }
    return { x, y };
  }

  /**
   * Updates the application state with the point currently being hovered
   * over and the coordinates to render the top left corner of the point's
   * subplot
   * @param hoverDatum A Plotly.Datum object containing the point currently
   * being hovered over.
   */
  function handleHover(hoverDatum: Readonly<Plotly.PlotHoverEvent>): void {
    props.setHoverPoint(hoverDatum);
    if ('bbox' in hoverDatum.points[0]) {
      let subplotTopLeft = {
        /* @ts-ignore: PlotDatum has bbox property */
        x: hoverDatum.points[0].bbox.x0 as number,
        /* @ts-ignore: PlotDatum has bbox property */
        y: hoverDatum.points[0].bbox.y0 as number
      };
      subplotTopLeft = computeTooltipCoords(subplotTopLeft);
      setSubplotCoords(subplotTopLeft);
      return;
    }

    setSubplotCoords(null);
  }

  /**
   * Updates the application state to set the point currently being hovered
   * over to `null` and set the coordinates to render the point's subplot
   * to null.
   */
  function handleUnhover(): void {
    setSubplotCoords(null);
    props.setHoverPoint(null);
  }

  return (
    <div>
      <Plot
        data={props.data}
        onSelected={handleSelect}
        onHover={handleHover}
        onUnhover={handleUnhover}
        layout={basePlotLayout}
        style={{ width: '100%' }}
        useResizeHandler
      />
      {subplotCoords && (
        // If subplotCoords are not null, render the subplot
        <div
          style={{
            position: 'absolute',
            top: `${subplotCoords.y}px`,
            left: `${subplotCoords.x}px`,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '10px',
            borderRadius: '5px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
          }}
        >
          <img
            src={props.subplot}
            alt="Frequency vs time plot"
            width={subplotDimensions.width}
            height={subplotDimensions.height}
          />
        </div>
      )}
    </div>
  );
}

export default Chart;
