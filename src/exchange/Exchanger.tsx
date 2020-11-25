import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { AccountContext } from "../AccountContext";
import { color } from "../styles";
import { ExchangeRate } from "../types";
import { convertAmount, parseAmountInput } from "../utils/number";
import { Account } from "./Account";
import { Button } from "./Button";

const Wrapper = styled.div``;

const TopRow = styled.div`
  display: flex;
  background: ${color.blueLight};
  justify-content: space-between;
`;

const exchangeRate: ExchangeRate = {
  baseCcy: "GBP",
  quoteCcy: "EUR",
  rate: "0.74",
};

export function Exchanger() {
  const baseCcy = exchangeRate.baseCcy;
  const quoteCcy = exchangeRate.quoteCcy;
  const { state: accounts, dispatch } = React.useContext(AccountContext);
  const [baseAmount, setBaseAmount] = useState("");
  const [quoteAmount, setQuoteAmount] = useState("");

  const handleBaseAmountChange = useCallback(
    (text) => {
      const parsed = parseAmountInput(text);
      setBaseAmount(parsed);
      setQuoteAmount(convertAmount(parsed, exchangeRate.rate, true));
    },
    [setBaseAmount, setQuoteAmount]
  );

  const handleQuoteAmountChange = useCallback(
    (text) => {
      const parsed = parseAmountInput(text);
      setQuoteAmount(parsed);
      setBaseAmount(convertAmount(parsed, exchangeRate.rate));
    },
    [setQuoteAmount, setBaseAmount]
  );

  const handleExchange = useCallback(() => {
    setBaseAmount("");
    setQuoteAmount("");
    dispatch({
      type: "Convert",
      payload: {
        base: { ccy: baseCcy, amount: baseAmount },
        quote: { ccy: quoteCcy, amount: quoteAmount },
      },
    });
  }, [dispatch, baseCcy, baseAmount, quoteCcy, quoteAmount]);

  const baseAccount = accounts.find((x) => x.ccy === baseCcy);
  const quoteAccount = accounts.find((x) => x.ccy === quoteCcy);

  return (
    <Wrapper>
      <TopRow>
        <Button>Cancel</Button>
        <Button onClick={baseAmount.length > 0 ? handleExchange : undefined}>
          Exchange
        </Button>
      </TopRow>
      <Account
        base
        ccy={baseCcy}
        amount={baseAmount}
        totalAmount={baseAccount ? baseAccount.amount : "0"}
        onChange={handleBaseAmountChange}
      />
      <Account
        ccy={quoteCcy}
        amount={quoteAmount}
        totalAmount={quoteAccount ? quoteAccount.amount : "0"}
        exchangeRate={exchangeRate}
        onChange={handleQuoteAmountChange}
      />
    </Wrapper>
  );
}
