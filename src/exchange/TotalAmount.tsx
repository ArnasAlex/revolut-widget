import React from "react";
import { getCcySymbol } from "../utils/ccy";
import { CcyAmount } from "../types";

export function TotalAmount({ ccy, amount }: CcyAmount) {
  return (
    <div>
      You have {getCcySymbol(ccy)}
      {amount}
    </div>
  );
}
