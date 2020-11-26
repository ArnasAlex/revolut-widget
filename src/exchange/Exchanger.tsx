import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { AccountContext } from "../AccountContext";
import { color } from "../styles";
import { ExchangeRate } from "../types";
import { getNextIndex, getPrevIndex } from "../utils/list";
import { convertAmount, parseAmountInput } from "../utils/number";
import { Account } from "./Account";
import { Button } from "./Button";

const Wrapper = styled.div``;

const TopRow = styled.div`
  display: flex;
  background: ${color.blueLight};
  justify-content: space-between;
  border-bottom: 1px solid ${color.whiteTransparent};
`;

const exchangeRate: ExchangeRate = {
  baseCcy: "GBP",
  quoteCcy: "EUR",
  rate: "0.74",
};

export function Exchanger() {
  const { state: accounts, dispatch } = React.useContext(AccountContext);
  const [baseAmount, setBaseAmount] = useState("");
  const [quoteAmount, setQuoteAmount] = useState("");
  const [baseAccountIdx, setBaseAccountIdx] = useState(0);
  const [quoteAccountIdx, setQuoteAccountIdx] = useState(1);
  const baseAccount = accounts[baseAccountIdx];
  const quoteAccount = accounts[quoteAccountIdx];

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
        base: { ccy: baseAccount.ccy, amount: baseAmount },
        quote: { ccy: quoteAccount.ccy, amount: quoteAmount },
      },
    });
  }, [dispatch, baseAccount, quoteAccount, baseAmount, quoteAmount]);

  const handleBaseAccountChange = useCallback(
    (next?: boolean) => {
      setBaseAccountIdx((cur) =>
        next ? getNextIndex(accounts, cur) : getPrevIndex(accounts, cur)
      );
    },
    [accounts, setBaseAccountIdx]
  );

  const handleQuoteAccountChange = useCallback(
    (next?: boolean) => {
      setQuoteAccountIdx((cur) =>
        next ? getNextIndex(accounts, cur) : getPrevIndex(accounts, cur)
      );
    },
    [accounts, setQuoteAccountIdx]
  );

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
        ccy={baseAccount.ccy}
        amount={baseAmount}
        totalAmount={baseAccount.amount}
        onAmountChange={handleBaseAmountChange}
        onAccountChange={handleBaseAccountChange}
      />
      <Account
        ccy={quoteAccount.ccy}
        amount={quoteAmount}
        totalAmount={quoteAccount.amount}
        exchangeRate={exchangeRate}
        onAmountChange={handleQuoteAmountChange}
        onAccountChange={handleQuoteAccountChange}
      />
    </Wrapper>
  );
}
