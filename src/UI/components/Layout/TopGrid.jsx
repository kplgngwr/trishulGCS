import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const TopGrid = ({ data }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Wait for container to be sized properly
    const container = containerRef.current;
    if (container.clientWidth === 0 || container.clientHeight === 0) {
      console.warn("TopGrid container has zero dimensions");
      return;
    }

    // Clear any existing chart
    d3.select(container).selectAll('*').remove();

    // Setup dimensions
    const margin = { top: 0, right: 0, bottom: 0, left: 0 };
    const width = container.clientWidth - margin.left - margin.right;
    const height = container.clientHeight - margin.top - margin.bottom;

    console.log("Container dimensions:", width, height);

    // Create SVG element with explicit dimensions
    const svg = d3.select(container)
      .append('svg')
      .attr('width', container.clientWidth)
      .attr('height', container.clientHeight)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // If no data, just render axes
    if (!data || data.length === 0) {
      // Setup scales for empty chart
      const xScale = d3.scaleLinear()
        .domain([0, 10])
        .range([0, width]);

      const yScale = d3.scaleLinear()
        .domain([0, 150])
        .range([height, 0]);

      // Add the X gridlines
      svg.append('g')
        .attr('class', 'grid')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(xScale)
          .ticks(10)
          .tickSize(-height)
          .tickFormat('')
        )
        .style('stroke', '#333')
        .style('opacity', 0.2);

      // Add the Y gridlines
      svg.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(yScale)
          .ticks(10)
          .tickSize(-width)
          .tickFormat('')
        )
        .style('stroke', '#333')
        .style('opacity', 0.2);
      
      return;
    }

    // Parse the data
    const parsedData = data.map((d, i) => {
      const values = d.split(',').map(v => parseFloat(v));
      return {
        time: i,
        value1: values[0] || 0,
        value2: values[1] || 0,
        value3: values[2] || 0,
        value4: values[3] || 0
      };
    });

    console.log("Parsed data:", parsedData);

    // Setup scales
    const xScale = d3.scaleLinear()
      .domain([0, parsedData.length - 1 > 0 ? parsedData.length - 1 : 1])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, 150])  // Fixed y-axis range as requested
      .range([height, 0]);

    // Generate line functions
    const line1 = d3.line()
      .x(d => xScale(d.time))
      .y(d => yScale(d.value1));

    const line2 = d3.line()
      .x(d => xScale(d.time))
      .y(d => yScale(d.value2));

    const line3 = d3.line()
      .x(d => xScale(d.time))
      .y(d => yScale(d.value3));

    const line4 = d3.line()
      .x(d => xScale(d.time))
      .y(d => yScale(d.value4));

    // Add the X gridlines
    svg.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale)
        .ticks(10)
        .tickSize(-height)
        .tickFormat('')
      )
      .style('stroke', '#333')
      .style('opacity', 0.2);

    // Add the Y gridlines
    svg.append('g')
      .attr('class', 'grid')
      .call(d3.axisLeft(yScale)
        .ticks(10)
        .tickSize(-width)
        .tickFormat('')
      )
      .style('stroke', '#333')
      .style('opacity', 0.2);

    // Add level lines for Y axis at important thresholds
    const levelValues = [50, 100];
    levelValues.forEach(value => {
      svg.append('line')
        .attr('x1', 0)
        .attr('x2', width)
        .attr('y1', yScale(value))
        .attr('y2', yScale(value))
        .attr('stroke', '#555')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '5,5');

      svg.append('text')
        .attr('x', width - 45)
        .attr('y', yScale(value) - 5)
        .attr('fill', '#555')
        .attr('font-size', '9px')
        .text(`Level ${value}`);
    });

    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .style('stroke', '#333')
      .style('font-size', '5px')
      .call(d3.axisBottom(xScale));

    // Add Y axis
    svg.append('g')
      .style('stroke', '#333')
      .style('font-size', '10px')
      .call(d3.axisLeft(yScale));

    // Add path lines with darker colors
    svg.append('path')
      .datum(parsedData)
      .attr('fill', 'none')
      .attr('stroke', '#b30000')  // darker red
      .attr('stroke-width', 2)
      .attr('d', line1);

    svg.append('path')
      .datum(parsedData)
      .attr('fill', 'none')
      .attr('stroke', '#008080')  // darker teal
      .attr('stroke-width', 2)
      .attr('d', line2);

    svg.append('path')
      .datum(parsedData)
      .attr('fill', 'none')
      .attr('stroke', '#c2a000')  // darker yellow
      .attr('stroke-width', 2)
      .attr('d', line3);

    svg.append('path')
      .datum(parsedData)
      .attr('fill', 'none')
      .attr('stroke', '#0066cc')  // darker blue
      .attr('stroke-width', 2)
      .attr('d', line4);

    // Add legend with darker colors
    const legend = svg.append('g')
      .attr('transform', `translate(${width - 100}, 0)`);

    const legendItems = [
      { color: '#b30000', text: 'Value 1' },
      { color: '#008080', text: 'Value 2' },
      { color: '#c2a000', text: 'Value 3' },
      { color: '#0066cc', text: 'Value 4' }
    ];

    legendItems.forEach((item, i) => {
      const g = legend.append('g')
        .attr('transform', `translate(0, ${i * 20})`);

      g.append('rect')
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', item.color);

      g.append('text')
        .attr('x', 15)
        .attr('y', 10)
        .attr('font-size', '10px')
        .attr('fill', '#333')  // darker text color
        .text(item.text);
    });
  }, [data]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '80px'
      }}
    />
  );
};

export default TopGrid;