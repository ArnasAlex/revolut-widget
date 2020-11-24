import React from "react";
import { getCcySymbol } from "../utils/ccy";
import { ExchangeRate } from "../types";

export interface UnitExchangeRateProps {
  data: ExchangeRate;
}
export function UnitExchangeRate({ data }: UnitExchangeRateProps) {
  const text = `${getCcySymbol(data.baseCcy)}1 = ${getCcySymbol(
    data.quoteCcy
  )}${data.rate}`;

  return <div>{text}</div>;
}
