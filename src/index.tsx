import React from "react";
import { createRoot } from "react-dom/client";
import styled from "styled-components";
import { getRates } from "./api/rates";

const Title = styled.h1`
  color: rebeccapurple;
`;

const container = document.querySelector("#root");
if (!container) throw new Error("Root element #root not found");

const rates = getRates();
rates.then(console.log).catch(console.error);
createRoot(container).render(<Title>It works</Title>);
