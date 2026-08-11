import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getRates, type RatesSnapshot } from "./api/rates";
import { CURRENCIES, CurrencyCode } from "./currencies";
import { MoonIcon, SunIcon, SwapIcon } from "./Icons";
import { converter } from "./converter";
import { getPeriod, PeriodRates } from "./api/period";
import { Sparkline } from "./Chart";

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
  gap: 16px;
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

const Label = styled.span`
  font-size: ${(p) => p.theme.font.size.sm}px;
  color: ${(p) => p.theme.colors.textMuted};
`;

const Field = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: ${(p) => p.theme.radii.sm}px;
  padding: ${(p) => p.theme.space[3]}px;
`;

const PickerBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-right: 12px;
  border-right: 1px solid ${(p) => p.theme.colors.border};
`;

const HiddenSelect = styled.select`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const AmountInput = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  background: none;
  outline: none;
  text-align: right;
  color: inherit;
  font-size: ${(p) => p.theme.font.size.xl}px;
  font-weight: ${(p) => p.theme.font.weight.medium};
  font-variant-numeric: tabular-nums;
`;

const SwapButton = styled.button<{ $turns: number }>`
  align-self: center;
  width: 32px;
  height: 32px;
  margin: 16px 0 0 0;
  border-radius: 50%;
  background: ${(p) => p.theme.colors.surfaceAlt};
  border: 1px solid ${(p) => p.theme.colors.border};
  color: ${(p) => p.theme.colors.textMuted};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;

  &:hover {
    color: ${(p) => p.theme.colors.text};
    border-color: ${(p) => p.theme.colors.borderStrong};
  }

  svg {
    transition: transform 0.25s ease;
    transform: rotate(${(p) => p.$turns * 180}deg);
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(p) => p.theme.colors.border};
`;
type ThemeType = "dark" | "light";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

type ConverterProps = {
  mode: ThemeType;
  onToggleMode: () => void;
};

export function Converter({ mode, onToggleMode }: ConverterProps) {
  const [snapshot, setSnapshot] = useState<RatesSnapshot | null>(null);
  const [periodRates, setPeriodRates] = useState<PeriodRates | null>(null);
  const [from, setFrom] = useState<CurrencyCode>("EUR");
  const [to, setTo] = useState<CurrencyCode>("USD");
  const [amount, setAmount] = useState<string>("100");
  const [error, setError] = useState<string | null>(null);
  const [turns, setTurns] = useState(0);

  useEffect(() => {
    getRates()
      .then(setSnapshot)
      .catch((e) => setError(e.message));
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    getPeriod(from, to, controller.signal)
      .then((data) => {
        setPeriodRates(data);
      })
      .catch((e) => {
        if (e.name !== "AbortError") {
          console.error(e);
        }
      });

    return () => controller.abort();
  }, [from, to]);

  if (error) return <Wrapper>Couldn't load rates. {error}</Wrapper>;
  if (!snapshot) return <Wrapper>Loading…</Wrapper>;

  const numericAmount = Number(amount);
  const isValid = amount.trim() !== "" && Number.isFinite(numericAmount);

  const conversion = isValid
    ? converter(snapshot, from, to, numericAmount)
    : null;

  const toCurrency = CURRENCIES.find((c) => c.code === to);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <Wrapper>
      <Header>
        <span>Convert</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Label>ECB · {conversion ? formatDate(conversion.asOf) : "-"}</Label>
          <IconButton onClick={onToggleMode} aria-label="Toggle theme">
            {mode === "dark" ? <SunIcon /> : <MoonIcon />}
          </IconButton>
        </div>
      </Header>
      <section style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Label>You send</Label>
        <Field>
          <PickerBox>
            <span>{CURRENCIES.find((c) => c.code === from)?.flag}</span>
            <span>{from}</span>
            <HiddenSelect
              value={from}
              onChange={(e) => setFrom(e.target.value as CurrencyCode)}
            >
              {CURRENCIES.map((c) => (
                <option value={c.code} key={c.code}>
                  {c.code} - {c.name}
                </option>
              ))}
            </HiddenSelect>
          </PickerBox>
          <AmountInput
            value={amount}
            onChange={(e) => {
              const v = e.target.value;
              if (v === "" || /^\d*\.?\d*$/.test(v)) setAmount(v);
            }}
            inputMode="decimal"
          />
        </Field>
      </section>
      <SwapButton
        onClick={() => {
          swap();
          setTurns(turns + 1);
        }}
        $turns={turns}
        aria-label="Swap currencies"
      >
        <SwapIcon />
      </SwapButton>
      <section style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Label>They receive</Label>
        <Field>
          <PickerBox>
            <span>{CURRENCIES.find((c) => c.code === to)?.flag}</span>
            <span>{to}</span>
            <HiddenSelect
              value={to}
              onChange={(e) => setTo(e.target.value as CurrencyCode)}
            >
              {CURRENCIES.map((c) => (
                <option value={c.code} key={c.code}>
                  {c.code} - {c.name}
                </option>
              ))}
            </HiddenSelect>
          </PickerBox>
          <AmountInput
            value={
              conversion
                ? conversion.result.toFixed(toCurrency?.decimals ?? 2)
                : "-"
            }
            readOnly
          />
        </Field>
      </section>
      <Label>
        1 {from} = {conversion?.rate.toFixed(5)} {to}
      </Label>
      <Divider />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Label>Last 30 days</Label>
        <Label>
          {periodRates
            ? `${periodRates.min.toFixed(4)} – ${periodRates.max.toFixed(4)}`
            : "—"}
        </Label>
      </div>
      {periodRates && <Sparkline rates={periodRates.rates} />}
    </Wrapper>
  );
}

// maybe replace conversion toFixed digits with Intl.NumberFormat, but I will think about it later

//TODO: replace the placeholder ECB with the real providers
