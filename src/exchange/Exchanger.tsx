import React from "react";
import styled from "styled-components";
import { ExchangeRate } from "../types";
import { Account } from "./Account";

const Wrapper = styled.div``;

export function Exchanger() {
  const exchangeRate: ExchangeRate = {
    baseCcy: "GBP",
    quoteCcy: "EUR",
    rate: "0.74",
  };

  return (
    <Wrapper>
      <Account base ccy={exchangeRate.baseCcy} amount="50" totalAmount="58.33" />
      <Account
        ccy={exchangeRate.quoteCcy}
        amount="67.22"
        totalAmount="116.12"
        exchangeRate={exchangeRate}
      />
    </Wrapper>
  );
}
