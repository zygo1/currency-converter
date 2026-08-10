import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getRates, type RatesSnapshot } from "./api/rates";
import { CurrencyCode } from "./currencies";
import { MoonIcon, SunIcon } from "./Icons";
import { converter } from "./converter";

const Wrapper = styled.div`
  background: ${(p) => p.theme.colors.surface};
  color: ${(p) => p.theme.colors.text};
  padding: ${(p) => p.theme.space[5]}px;
  width: 400px;
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: ${(p) => p.theme.space[3]}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: ${(p) => p.theme.colors.textMuted};
  display: flex;
  align-items: center;

  &:hover {
    color: ${(p) => p.theme.colors.text};
  }
`;

const Field = styled.div`
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: ${(p) => p.theme.radii.md}px;
  padding: ${(p) => p.theme.space[2]}px;
`;

const CurrencyPicker = styled.select``;

const Divider = styled.div`
  width: 1px;
  height: 90%;
  background-color: ${(p) => p.theme.colors.border};
`;

const AmountInput = styled.div``;

type ThemeType = "dark" | "light";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

export function App() {
  const [snapshot, setSnapshot] = useState<RatesSnapshot | null>(null);
  const [from, setFrom] = useState<CurrencyCode>("EUR");
  const [to, setTo] = useState<CurrencyCode>("USD");
  const [amount, setAmount] = useState<number>(100);
  const [mode, setMode] = useState<ThemeType>("dark");

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };
  useEffect(() => {
    getRates().then(setSnapshot).catch(console.error);
  }, []);

  if (!snapshot) return <Wrapper>Loading…</Wrapper>;

  const conversion = converter(snapshot, from, to, Number(amount));

  return (
    <Wrapper>
      <Header>
        <span>Convert</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>ECB · {formatDate(conversion.asOf)}</span>
          <IconButton onClick={toggleMode} aria-label="Toggle theme">
            {mode === "dark" ? <SunIcon /> : <MoonIcon />}
          </IconButton>
        </div>
      </Header>

      <section>
        <span>You send</span>
        <Field>
          <CurrencyPicker>
            <span>🇪🇺</span>
            <span>EUR</span>
            <option>...</option>
          </CurrencyPicker>
          <Divider />
          <AmountInput />
        </Field>
      </section>
    </Wrapper>
  );
}
