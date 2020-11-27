import React, { useCallback } from "react";
import styled, { css } from "styled-components";
import { color, fontSize } from "../styles";
import { ExchangeRate } from "../types";
import { AmountInput } from "./AmountInput";
import { Button } from "./Button";
import { TotalAmount } from "./TotalAmount";
import { UnitExchangeRate } from "./UnitExchangeRate";

const Wrapper = styled.div<{ base?: boolean }>`
  padding: 20px 20px 0 20px;
  color: ${color.white};
  background: ${(props) => (props.base ? color.blueLight : color.blue)};
`;

const Row = styled.div`
  display: flex;
`;

const Navigation = styled(Row)`
  justify-content: space-between;
`;

const BigText = styled.div`
  font-size: ${fontSize.big}px;
  padding: 12px 0;
`;

const SmallText = styled.div`
  font-size: ${fontSize.small}px;
  color: ${color.whiteTransparent};
`;

export const Currency = styled(BigText)``;

const flexRight = css`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const AmountWrapper = styled(BigText)`
  ${flexRight}
`;

const UnitExchangeRateWrapper = styled(SmallText)`
  ${flexRight}
`;

export const Sign = styled.span`
  margin-right: 5px;
`;

export interface AccountProps {
  ccy: string;
  amount: string;
  totalAmount: string;
  base?: boolean;
  exchangeRate?: ExchangeRate;
  onAmountChange: (text: string) => void;
  onAccountChange: (next?: boolean) => void;
}

export const Account = React.memo(
  ({
    base,
    ccy,
    amount,
    totalAmount,
    exchangeRate,
    onAmountChange,
    onAccountChange,
  }: AccountProps) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const handleClick = useCallback(() => {
      const { current } = inputRef;
      if (current) {
        current.focus();
      }
    }, []);

    const handleNext = useCallback(() => {
      onAccountChange(true);
    }, [onAccountChange]);

    const handlePrev = useCallback(() => {
      onAccountChange();
    }, [onAccountChange]);

    return (
      <Wrapper base={base} onClick={handleClick}>
        <Row>
          <Currency>{ccy}</Currency>
          <AmountWrapper>
            {amount.length > 0 && <Sign>{base ? "-" : "+"}</Sign>}
            <AmountInput
              value={amount}
              onChange={onAmountChange}
              inputRef={inputRef}
            />
          </AmountWrapper>
        </Row>
        <Row>
          <SmallText>
            <TotalAmount ccy={ccy} amount={totalAmount} />
          </SmallText>
          {exchangeRate && (
            <UnitExchangeRateWrapper>
              <UnitExchangeRate data={exchangeRate} rounded />
            </UnitExchangeRateWrapper>
          )}
        </Row>
        <Navigation>
          <Button onClick={handlePrev}>〈</Button>
          <Button onClick={handleNext}>〉</Button>
        </Navigation>
      </Wrapper>
    );
  }
);
