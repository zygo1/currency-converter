import React from "react";
import { createRoot } from "react-dom/client";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { App } from "./App";

const container = document.querySelector("#root");
if (!container) throw new Error("Root element #root not found");

const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }

  body {
    margin: 0;
    min-height: 100vh;
    background: ${(p) => p.theme.colors.bg};
    color: ${(p) => p.theme.colors.text};
    font-family: system-ui, -apple-system, sans-serif;
  }
  
  #root {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

createRoot(container).render(
  <ThemeProvider theme={theme.dark}>
    <GlobalStyle />
    <App />
  </ThemeProvider>,
);
