import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { ExchangeRate } from "../types";
import { convertAmount, parseAmountInput } from "../utils/number";
import { Account } from "./Account";

const Wrapper = styled.div``;
const exchangeRate: ExchangeRate = {
  baseCcy: "GBP",
  quoteCcy: "EUR",
  rate: "0.74",
};

export function Exchanger() {
  const [baseAmount, setBaseAmount] = useState("");
  const [quoteAmount, setQuoteAmount] = useState("");

  const handleBaseAmountChange = useCallback(
    (text) => {
      const parsed = parseAmountInput(text);
      setBaseAmount(parsed);
      setQuoteAmount(convertAmount(parsed, exchangeRate.rate));
    },
    [setBaseAmount, setQuoteAmount]
  );

  const handleQuoteAmountChange = useCallback(
    (text) => {
      const parsed = parseAmountInput(text);
      setQuoteAmount(parsed);
      setBaseAmount(convertAmount(parsed, exchangeRate.rate, true));
    },
    [setQuoteAmount, setBaseAmount]
  );

  return (
    <Wrapper>
      <Account
        base
        ccy={exchangeRate.baseCcy}
        amount={baseAmount}
        totalAmount="58.33"
        onChange={handleBaseAmountChange}
      />
      <Account
        ccy={exchangeRate.quoteCcy}
        amount={quoteAmount}
        totalAmount="116.12"
        exchangeRate={exchangeRate}
        onChange={handleQuoteAmountChange}
      />
    </Wrapper>
  );
}
