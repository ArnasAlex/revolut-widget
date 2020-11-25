export function round(amount: string): string {
  const num = parseFloat(amount);
  return parseFloat(num.toFixed(2)).toString();
}

export function convertAmount(
  amount: string,
  rate: string,
  invertRate?: boolean
): string {
  if (amount === "" || rate === "") {
    return "";
  }

  const rateNum = parseFloat(rate);
  const normalizedRate = invertRate ? 1 / rateNum : rateNum;
  const num = parseFloat(amount) * normalizedRate;

  return round(num.toString());
}

export function parseAmountInput(amount: string) {
  let text = amount.trim();
  text = text.replace(/,/g, ".");
  const num = parseFloat(text);
  if (isNaN(num)) {
    return "";
  }

  const rounded = round(num.toString());
  if (text[text.length - 1] === ".") {
    return rounded + ".";
  }

  return rounded;
}

export function subtractAmount(amount: string, subtraction: string) {
  const amountNum = parseFloat(amount);
  const deductionNum = parseFloat(subtraction);
  const result = amountNum - deductionNum;
  return round(result.toString());
}

export function addAmount(amount: string, addition: string) {
  const amountNum = parseFloat(amount);
  const deductionNum = parseFloat(addition);
  const result = amountNum + deductionNum;
  return round(result.toString());
}
