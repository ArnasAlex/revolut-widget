import React, { useCallback } from "react";
import styled from "styled-components";
import { AppContext } from "../AppContext";
import { color } from "../styles";
import { getCcyRate } from "../utils/api";
import { Account } from "./Account";
import { Button } from "./Button";

const refreshRate = 10 * 1000;

const Wrapper = styled.div``;

const TopRow = styled.div`
  display: flex;
  background: ${color.blueLight};
  justify-content: space-between;
  border-bottom: 1px solid ${color.whiteTransparent};
`;

export function Exchanger() {
  const { state, dispatch } = React.useContext(AppContext);
  const {
    accounts,
    baseAmount,
    quoteAmount,
    baseAccountIdx,
    quoteAccountIdx,
    rate,
  } = state;
  const baseAccount = accounts[baseAccountIdx];
  const quoteAccount = accounts[quoteAccountIdx];

  React.useEffect(() => {
    if (baseAccount.ccy === quoteAccount.ccy) {
      dispatch({ type: "RateChanged", payload: { rate: "1" } });
      return;
    }

    let timeout: number;
    const fetch = async () => {
      const newRate = await getCcyRate(baseAccount.ccy, quoteAccount.ccy);
      dispatch({ type: "RateChanged", payload: { rate: newRate } });
      timeout = setTimeout(fetch, refreshRate);
    };

    fetch();

    return () => clearTimeout(timeout);
  }, [baseAccount.ccy, quoteAccount.ccy, dispatch]);

  const handleBaseAmountChange = useCallback(
    (text) => {
      dispatch({ type: "BaseAmountChanged", payload: { amount: text } });
    },
    [dispatch]
  );

  const handleQuoteAmountChange = useCallback(
    (text) => {
      dispatch({ type: "QuoteAmountChanged", payload: { amount: text } });
    },
    [dispatch]
  );

  const handleExchange = useCallback(() => {
    dispatch({ type: "Exchange", payload: {} });
  }, [dispatch]);

  const handleBaseAccountChange = useCallback(
    (next?: boolean) => {
      dispatch({ type: "BaseAccountChanged", payload: { next } });
    },
    [dispatch]
  );

  const handleQuoteAccountChange = useCallback(
    (next?: boolean) => {
      dispatch({ type: "QuoteAccountChanged", payload: { next } });
    },
    [dispatch]
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
        exchangeRate={{
          baseCcy: baseAccount.ccy,
          quoteCcy: quoteAccount.ccy,
          rate,
        }}
        onAmountChange={handleQuoteAmountChange}
        onAccountChange={handleQuoteAccountChange}
      />
    </Wrapper>
  );
}
