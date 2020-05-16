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
      .domain(data.map((d) => d.day_of_the_month))
      .range([margin.left, chartWidth - margin.right])
      .padding(0.1);

    const yMax = d3.max(data, (d) => d.time);
    const yScale = d3
      .scaleLinear()
      .domain([0, Math.max(yMax, 5)])
      .range([chartHeight - margin.bottom, margin.top]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    d3.select(xAxisRef.current).call(xAxis);
    d3.select(yAxisRef.current).call(yAxis);

    setBars(
      data.map((d) => {
        return {
          x: xScale(d.day_of_the_month),
          y: yScale(d.time),
          height: chartHeight - margin.bottom - yScale(d.time),
          width: xScale.bandwidth(),
          date: d.date,
          time: d.time,
        };
      })
    );
  }, [data]);

  return (
    <div className={classes.BarChart}>
      <svg width={chartWidth} height={chartHeight}>
        {bars.map((bar, index) => {
          const barHours = Math.floor(bar.time / 60);
          const barMinutes = bar.time % 60;

          return (
            <rect
              key={index}
              x={bar.x}
              y={bar.y}
              height={bar.height}
              width={bar.width}
            >
              <title>{`${bar.date}: ${barHours}:${barMinutes}`}</title>
            </rect>
          );
        })}

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
