import { CurrencyCode } from "../currencies";

const API = "https://api.frankfurter.dev/v2/rates";

type Response = {
  date: string;
  base: string;
  quote: string;
  rate: number;
};

export type PeriodRates = {
  rates: number[];
  min: number;
  max: number;
};

export async function getPeriod(
  base: CurrencyCode,
  quotes: CurrencyCode,
  signal?: AbortSignal,
): Promise<PeriodRates> {
  const today = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

  const toDate = today.toISOString().slice(0, 10);
  const fromDate = oneMonthAgo.toISOString().slice(0, 10);

  const url = new URL(API);
  url.searchParams.set("from", fromDate);
  url.searchParams.set("to", toDate);
  url.searchParams.set("base", base);
  url.searchParams.set("quotes", quotes);

  const response = await fetch(url, { signal });

  if (!response.ok) throw new Error(`Failed to fetch the period data.`);

  const data: Response[] = await response.json();

  if (data.length === 0) throw new Error("No rates returned");

  const rates = data.map((record) => record.rate);
  const min = Math.min(...rates);
  const max = Math.max(...rates);
  return { rates, min, max };
}
