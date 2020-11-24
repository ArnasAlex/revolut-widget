const ccySymbol: { [key in string]: string } = {
  EUR: "€",
  USD: "$",
  GBP: "£",
};

export function getCcySymbol(ccy: string): string {
  const result = ccySymbol[ccy];
  if (result) {
    return result;
  }

  return "";
}
