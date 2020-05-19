import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

import classes from "./BarChart.module.css";

const chartWidth = 650;
const chartHeight = 400;
const margin = { top: 20, right: 5, bottom: 20, left: 35 };
const formatTime = d3.timeFormat("%H:%M");
const dateFormat = d3.timeFormat("%b %d");

const formatMinutes = (minutes) => formatTime(new Date(2020, 0, 1, 0, minutes));
const formatDate = (date) => {
  /* Workaround for JavaScript converting a Date object from a string to the
   * date of the given string minus one (i.e., '2020-05-19' will be converted to
   * '2020-05-18'). Passing the individual values of year, month and day
   * as parameters avoids this issue.
   */
  const dateData = date.split("-");
  return dateFormat(new Date(dateData[0], dateData[1] - 1, dateData[2]));
};

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

    const yMax = d3.max(data, (d) => d.time);
    const yScale = d3
      .scaleLinear()
      .domain([0, Math.max(yMax, 5)])
      .range([chartHeight - margin.bottom, margin.top]);

    const xAxis = d3.axisBottom(xScale).tickFormat(formatDate);
    const yAxis = d3.axisLeft(yScale).tickFormat(formatMinutes);
    d3.select(xAxisRef.current).call(xAxis);
    d3.select(yAxisRef.current).call(yAxis);

    setBars(
      data.map((d) => {
        return {
          x: xScale(d.date),
          y: yScale(d.time),
          height: chartHeight - margin.bottom - yScale(d.time),
          width: xScale.bandwidth(),
          titleDate: d.title_date,
          time: d.time,
        };
      })
    );
  }, [data]);

  return (
    <div className={classes.BarChart}>
      <svg width={chartWidth} height={chartHeight}>
        {bars.map((bar, index) => {
          return (
            <rect
              key={index}
              x={bar.x}
              y={bar.y}
              height={bar.height}
              width={bar.width}
            >
              <title>{`${bar.titleDate}: ${formatMinutes(bar.time)}`}</title>
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
