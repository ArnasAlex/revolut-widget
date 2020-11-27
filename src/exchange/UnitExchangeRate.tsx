import React from "react";
import { ExchangeRate } from "../types";
import { getCcySymbol } from "../utils/ccy";
import { round } from "../utils/number";

export interface UnitExchangeRateProps {
  data: ExchangeRate;
  rounded?: boolean;
}
export function UnitExchangeRate({ data, rounded }: UnitExchangeRateProps) {
  const { rate, quoteCcy, baseCcy } = data;
  let text = "...";
  if (rate !== "Infinity" && rate !== "0") {
    const normalized = rounded ? round(rate) : rate;
    text = `${getCcySymbol(quoteCcy)}1 = ${getCcySymbol(baseCcy)}${normalized}`;
  }

  return <div>{text}</div>;
}
