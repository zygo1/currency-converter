import React from "react";
import styled from "styled-components";

type SparklineProps = {
  rates: number[];
  width?: number;
  height?: number;
};

const ChartSvg = styled.svg`
  width: 100%;
  height: 56px;

  polyline {
    fill: none;
    stroke: ${(p) => p.theme.colors.accent};
    stroke-width: 1.5;
    stroke-linejoin: round;
    stroke-linecap: round;
  }

  circle {
    fill: ${(p) => p.theme.colors.accent};
  }
`;

export function Sparkline({ rates, width = 340, height = 56 }: SparklineProps) {
  if (rates.length < 2) return null;

  const min = Math.min(...rates);
  const max = Math.max(...rates);
  const range = max - min || 1;

  const coords = rates.map((rate, i) => ({
    x: (i / (rates.length - 1)) * width,
    y: height - ((rate - min) / range) * height,
  }));

  const points = coords
    .map((c) => `${c.x.toFixed(1)},${c.y.toFixed(1)}`)
    .join(" ");
  const last = coords[coords.length - 1];

  return (
    <ChartSvg viewBox={`0 0 ${width} ${height}`} role="img">
      <polyline points={points} />
      <circle cx={last.x} cy={last.y} r="3" />
    </ChartSvg>
  );
}
