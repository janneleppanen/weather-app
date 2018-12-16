import * as React from "react";
import { withParentSize } from "@vx/responsive";
import { scaleTime, scaleLinear } from "@vx/scale";
import { AreaClosed, LinePath } from "@vx/shape";
import { curveMonotoneX } from "@vx/curve";
import { extent, max, min } from "d3-array";
import { AxisRight, AxisBottom } from "@vx/axis";

interface DataItem {
  date: Date;
  value: number;
}

interface Props {
  data: Array<DataItem>;
  parentWidth: number;
}

const RangeChart = (props: Props) => {
  const { data } = props;

  const x = (d: DataItem) => d.date;
  const y = (d: DataItem) => d.value;

  const xMax = props.parentWidth;
  const yMax = 200;

  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(data, x)
  });

  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [min(data, y) - 1, max(data, y) + 1]
  });

  const { parentWidth } = props;

  function numTicksForHeight() {
    return Math.floor(max(data, y)) - Math.floor(min(data, y)) + 2;
  }

  return (
    <svg width={parentWidth} height={200 + 25}>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="tomato" stopOpacity={0.6} />
          <stop offset="100%" stopColor="tomato" stopOpacity={1.0} />
        </linearGradient>
      </defs>
      <AreaClosed
        data={data}
        xScale={xScale}
        yScale={yScale}
        x={x}
        y={y}
        strokeWidth={1}
        stroke={"url(#gradient)"}
        fill={"url(#gradient)"}
        curve={curveMonotoneX}
      />
      <LinePath
        data={data}
        xScale={xScale}
        yScale={yScale}
        x={x}
        y={y}
        stroke="tomato"
        strokeWidth={1}
        curve={curveMonotoneX}
      />
      <AxisRight
        top={10}
        left={0}
        scale={yScale}
        hideZero
        stroke="transparent"
        tickStroke="transparent"
        numTicks={numTicksForHeight()}
      />
      <AxisBottom
        top={yMax}
        scale={xScale}
        stroke="transparent"
        tickStroke="transparent"
      />
    </svg>
  );
};

export default withParentSize(RangeChart);
