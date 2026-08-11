import React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Converter } from "./Converter";
import { useState } from "react";
import { theme } from "./theme";

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

type ThemeType = "dark" | "light";

export function App() {
  const [mode, setMode] = useState<ThemeType>(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  );

  return (
    <ThemeProvider theme={theme[mode]}>
      <GlobalStyle />
      <Converter
        mode={mode}
        onToggleMode={() => setMode(mode === "light" ? "dark" : "light")}
      />
    </ThemeProvider>
  );
}
