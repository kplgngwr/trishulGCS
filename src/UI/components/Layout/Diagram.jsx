import React, { useEffect } from 'react';
import * as d3 from 'd3';

const Diagram = () => {
  useEffect(() => {
    d3.select('.diagram-container').selectAll('*').remove();
    const svg = d3.select('.diagram-container')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '50 10 800 1000');

    const drawEngine = (x, y, rectWidth, rectHeight, triBase, triHeight, color = 'white') => {
      svg.append('rect')
      .attr('x', x)
      .attr('y', y)
      .attr('width', rectWidth)
      .attr('height', rectHeight)
      .style('fill', color)
      .style('stroke', 'none');
      const upperTrianglePoints = [
      [x, y + rectHeight],
      [x + rectWidth, y + rectHeight],
      [x + rectWidth / 2, y + rectHeight + triHeight]
      ].map(point => point.join(',')).join(' ');
      svg.append('polygon')
      .attr('points', upperTrianglePoints)
      .style('fill', color)
      .style('stroke', 'none');
      const lowerTrianglePoints = [
      [x - triBase / 2, y + rectHeight + triHeight],
      [x + rectWidth + triBase / 2, y + rectHeight + triHeight],
      [x + rectWidth / 2, y + rectHeight]
      ].map(point => point.join(',')).join(' ');
      svg.append('polygon')
      .attr('points', lowerTrianglePoints)
      .style('fill', color)
      .style('stroke', 'none');
    };

    const addText = (x, y, textContent, position) => {
      svg.append('text')
        .attr('x', x)
        .attr('y', y + 8)
        .text(textContent)
        .style('font-size', '20px')
        .style('text-anchor', position)
        .style('fill', 'black')
        .style('letter-spacing', '0px')
        .style('stroke', 'black');
    };

    const drawLine = (x1, y1, x2, y2) => {
      svg.append('line')
        .attr('x1', x1)
        .attr('y1', y1)
        .attr('x2', x2)
        .attr('y2', y2)
        .style('stroke', 'black')
        .style('stroke-width', 2.5);
    };

    const drawBox = (x, y, width, height) => {
      svg.append('rect')
        .attr('x', x)
        .attr('y', y)
        .attr('width', width)
        .attr('height', height)
        .style('fill', 'lightgray')
        .style('stroke', 'black');
    };

    const dataBox = (x, y, width, height, downHeight, upperText, lowerText, upperColor = 'white', lowerColor = 'red') => {
      svg.append('rect')
        .attr('x', x)
        .attr('y', y)
        .attr('width', width)
        .attr('height', height)
        .style('fill', upperColor)
        .style('stroke', 'black')
        .style('stroke-width', 1);
      addText(x + width/2, y + height/2, upperText, 'middle'); 
      svg.append('rect')
        .attr('x', x)
        .attr('y', y + height)
        .attr('width', width)
        .attr('height', downHeight)
        .style('fill', lowerColor)
        .style('stroke', 'black')
        .style('stroke-width', 1); 
      addText(x + width/2, y + height + downHeight/2, lowerText, 'middle');
      return svg;
    };

    const drawMechanicalValve = (x, y, size) => {
      const valve = svg.append('g');
      valve.append('line')
        .attr('x1', x - size / 2)
        .attr('y1', y - size / 2)
        .attr('x2', x + size / 2)
        .attr('y2', y + size / 2)
        .style('stroke', 'black')
        .style('stroke-width', 1.5);
      valve.append('line')
        .attr('x1', x - size / 2)
        .attr('y1', y + size / 2)
        .attr('x2', x + size / 2)
        .attr('y2', y - size / 2)
        .style('stroke', 'black')
        .style('stroke-width', 1.5);
      valve.append('line')
        .attr('x1', x - size / 2)
        .attr('y1', y - size / 2)
        .attr('x2', x + size / 2)
        .attr('y2', y - size / 2)
        .style('stroke', 'black')
        .style('stroke-width', 1.5);
      valve.append('line')
        .attr('x1', x - size / 2)
        .attr('y1', y + size / 2)
        .attr('x2', x + size / 2)
        .attr('y2', y + size / 2)
        .style('stroke', 'black')
        .style('stroke-width', 1.5);      
      return valve;
    };

    const gasCylinder = (cx, cy, rx, height, fillPercentage = 25, fillColor = 'red') => {
      const cylinderGroup = svg.append('g');
      const fillHeight = height * (fillPercentage / 100);
      const fillStartY = cy + (height / 2) - fillHeight;
      if (fillPercentage > 0) {
        cylinderGroup.append('path')
          .attr('d', `M ${cx - rx} ${fillStartY} 
              L ${cx - rx} ${cy + height / 2} 
              A ${rx} ${rx * 0.4} 0 0 0 ${cx + rx} ${cy + height / 2} 
              L ${cx + rx} ${fillStartY}
              Z`)
          .style('fill', fillColor)
          .style('stroke', 'none');
      }
      cylinderGroup.append('path')
        .attr('d', `M ${cx - rx} ${cy - height / 2} 
            A ${rx} ${rx * 0.4} 0 0 1 ${cx + rx} ${cy - height / 2}`)
        .style('fill', 'none')
        .style('stroke', 'black')
        .style('stroke-width', 1);
      cylinderGroup.append('path')
        .attr('d', `M ${cx - rx} ${cy + height / 2} 
        A ${rx} ${rx * 0.4} 0 0 0 ${cx + rx} ${cy + height / 2}`)
        .style('fill', 'none')
        .style('stroke', 'black')
        .style('stroke-width', 1);
      cylinderGroup.append('line')
        .attr('x1', cx - rx)
        .attr('y1', cy - height / 2)
        .attr('x2', cx - rx)
        .attr('y2', cy + height / 2)
        .style('stroke', 'black')
        .style('stroke-width', 1);
      cylinderGroup.append('line')
        .attr('x1', cx + rx)
        .attr('y1', cy - height / 2)
        .attr('x2', cx + rx)
        .attr('y2', cy + height / 2)
        .style('stroke', 'black')
        .style('stroke-width', 1);
      return cylinderGroup;
    };


    gasCylinder(300, 120, 30, 70);
    gasCylinder(400, 120, 30, 70);
    gasCylinder(500, 120, 30, 70);
    addText(310, 120, '25', 'end');
    addText(410, 120, '25', 'end');
    addText(510, 120, '25', 'end');

    drawLine(300, 160, 300, 210);
    drawLine(400, 160, 400, 265);
    drawLine(500, 160, 500, 210);
    drawLine(300, 210, 400, 210);
    drawLine(500, 210, 400, 210);

    drawMechanicalValve(400,280,30);
    addText(430, 280, 'ON', 'start');
    drawLine(400, 295, 400, 350);

    dataBox(350, 350, 100, 30, 30, '50%', '⋈ M.V', 'yellow', 'green');
    drawLine(400, 410, 400, 470);

    dataBox(350, 470, 100, 30, 30, '55 kgs⁻¹', 'ṁ');
    drawLine(400, 530, 400, 620);

    dataBox(350, 620, 100, 30, 30, '25 bar', 'P.T');
    drawLine(400, 680, 400, 760);

    // drawBox(400, 660, 140, 30);
    dataBox(350, 760, 100, 30, 30, '25 N', 'Thrust');
    drawEngine(360, 820, 80, 100, 80, 70,'grey');
    dataBox(365, 850, 70, 30, 30, '25 Bar', 'P.T', 'white', 'orange');
  }, []);

  return <div className="diagram-container"></div>;
};

export default Diagram;