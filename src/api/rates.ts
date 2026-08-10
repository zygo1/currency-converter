const API = "https://api.frankfurter.dev/v2/rates";

type Rate = {
  date: string;
  base: string;
  quote: string;
  rate: number;
};

type Rates = Rate[];

export type RatesSnapshot = {
  base: string;
  rates: Record<string, { rate: number; date: string }>;
};

export async function getRates(): Promise<RatesSnapshot> {
  const url = new URL(API);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch the data.`);
  }

  const data = (await response.json()) as Rates;

  if (data.length === 0) throw new Error("No rates returned");
  const rates: RatesSnapshot["rates"] = {};
  for (const rate of data) {
    rates[rate.quote] = { rate: rate.rate, date: rate.date };
  }

  return {
    base: data[0].base,
    rates,
  };
}
