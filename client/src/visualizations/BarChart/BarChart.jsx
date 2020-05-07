import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

import classes from "./BarChart.module.css";

const chartWidth = 650;
const chartHeight = 400;
const margin = { top: 20, right: 5, bottom: 20, left: 35 };

const BarChart = React.memo(({ data }) => {
  const [bars, setBars] = useState([]);
  const xAxisRef = useRef();
  const yAxisRef = useRef();

  useEffect(() => {
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.date))
      .range([margin.left, chartWidth - margin.right])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.time)])
      .range([chartHeight - margin.bottom, margin.top]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    setBars(
      data.map((d) => {
        return {
          x: xScale(d.date),
          y: yScale(d.time),
          height: chartHeight - margin.bottom - yScale(d.time),
          width: xScale.bandwidth(),
        };
      })
    );

    d3.select(xAxisRef.current).call(xAxis);
    d3.select(yAxisRef.current).call(yAxis);
  }, [data]);

  return (
    <div className={classes.BarChart}>
      <svg width={chartWidth} height={chartHeight}>
        {bars.map((bar, index) => (
          <rect
            key={index}
            x={bar.x}
            y={bar.y}
            height={bar.height}
            width={bar.width}
          />
        ))}
        <g
          ref={xAxisRef}
          transform={`translate(0, ${chartHeight - margin.bottom})`}
        />
        <g ref={yAxisRef} transform={`translate(${margin.left}, 0)`} />
      </svg>
    </div>
  );
});

export default BarChart;
