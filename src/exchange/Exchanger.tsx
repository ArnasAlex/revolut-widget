import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { ExchangeRate } from "../types";
import { Account } from "./Account";

const Wrapper = styled.div``;

export function Exchanger() {
  const [baseAmount, setBaseAmount] = useState("");
  const [quoteAmount, setQuoteAmount] = useState("");

  const exchangeRate: ExchangeRate = {
    baseCcy: "GBP",
    quoteCcy: "EUR",
    rate: "0.74",
  };

  const handleBaseAmountChange = useCallback(
    (text) => {
      setBaseAmount(text);
    },
    [setBaseAmount]
  );

  const handleQuoteAmountChange = useCallback(
    (text) => {
      setQuoteAmount(text);
    },
    [setQuoteAmount]
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
