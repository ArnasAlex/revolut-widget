export function getCcyRateUrl(baseCcy: string, quoteCcy: string): string {
  return `https://api.exchangeratesapi.io/latest?base=${baseCcy}&symbols=${quoteCcy}`;
}

export async function getCcyRate(
  baseCcy: string,
  quoteCcy: string
): Promise<string> {
  const url = getCcyRateUrl(baseCcy, quoteCcy);
  const response = await fetch(url);
  const json = await response.json();
  return json.rates[quoteCcy].toString();
}
