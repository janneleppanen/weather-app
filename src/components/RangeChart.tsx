import * as React from "react";
import { withParentSize } from "@vx/responsive";
import { scaleTime, scaleLinear } from "@vx/scale";
import { LinePath } from "@vx/shape";
import { extent, max, min } from "d3-array";

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
  const yMax = 200; //max(data, y);

  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(data, x)
  });

  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [min(data, y) - 1, max(data, y) + 1]
  });

  const { parentWidth } = props;

  console.log(data);
  return (
    <svg width={parentWidth} height={200}>
      <LinePath
        data={data}
        xScale={xScale}
        yScale={yScale}
        x={x}
        y={y}
        stroke="tomato"
        strokeWidth={3}
      />
    </svg>
  );
};

export default withParentSize(RangeChart);
