import React from "react";
import styled from "styled-components";

const Icon = styled.svg`
  width: 18px;
  height: 18px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

export const MoonIcon = () => (
  <Icon viewBox="0 0 24 24" aria-hidden="true">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </Icon>
);

export const SunIcon = () => (
  <Icon viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </Icon>
);

export const SwapIcon = () => (
  <Icon viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8 4v16M8 20l-3-3M8 20l3-3" />
    <path d="M16 20V4M16 4l-3 3M16 4l3 3" />
  </Icon>
);
