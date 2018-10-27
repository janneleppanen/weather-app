import * as React from "react";
import { withParentSize } from "@vx/responsive";
import { scaleBand, scaleLinear } from "@vx/scale";
import { LinePath } from "@vx/shape";
import { extent, max } from "d3-array";

const RangeChart = props => {
  const xMax = props.parentWidth;
  const yMax = 200 / 8;

  const { data } = props;
  const x = d => d.time;
  const y = d => d.temperature;

  const xScale = scaleBand({
    rangeRound: [0, xMax],
    domain: extent(data, x)
  });

  const yScale = scaleLinear({
    rangeRound: [yMax, 0],
    domain: [0, max(data, y)]
  });

  const { parentWidth } = props;
  return (
    <svg width={parentWidth} height={200}>
      {data.map((d, i) => {
        // const d = { x: x(d), y: y(d) };
        return (
          <LinePath
            data={d}
            key={d.time}
            xScale={xScale}
            yScale={yScale}
            x={x}
            y={y}
            stroke="#000"
            strokeWidth={3}
          />
        );
      })}
    </svg>
  );
};

export default withParentSize(RangeChart);
