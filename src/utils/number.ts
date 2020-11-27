const defaultPrecision = 2;

export function round(amount: string, precision = defaultPrecision): string {
  const num = parseFloat(amount);
  return parseFloat(num.toFixed(precision)).toString();
}

export function invertRate(rate: string) {
  const rateNum = parseFloat(rate);
  const inverted = 1 / rateNum;
  return inverted.toString();
}

export function convertAmount(
  amount: string,
  rate: string,
): string {
  if (amount === "" || rate === "") {
    return "";
  }

  const rateNum = parseFloat(rate);
  const num = parseFloat(amount) * rateNum;

  return round(num.toString());
}

export function parseAmountInput(amount: string) {
  let text = amount.trim();
  text = text.replace(/,/g, ".");
  const num = parseFloat(text);
  if (isNaN(num)) {
    return "";
  }

  let rounded = round(num.toString());
  const split = text.split(".");
  if (split.length > 1) {
    if (!rounded.includes(".")) {
      rounded += ".";
    }

    const twoDecimalPlaces = split[1].substr(0, defaultPrecision);
    if (["0", "00"].includes(twoDecimalPlaces)) {
      rounded += twoDecimalPlaces;
    }
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
