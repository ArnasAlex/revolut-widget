import React from "react";
import styled, { css } from "styled-components";
import { color, fontSize } from "../styles";
import { ExchangeRate } from "../types";
import { TotalAmount } from "./TotalAmount";
import { UnitExchangeRate } from "./UnitExchangeRate";

const Wrapper = styled.div<{ base?: boolean }>`
  padding: 20px;
  color: ${color.white};
  background: ${(props) => (props.base ? color.blueLight : color.blue)};
`;

const Row = styled.div`
  display: flex;
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

export const Amount = styled.span``;

export interface AccountProps {
  ccy: string;
  amount: string;
  totalAmount: string;
  base?: boolean;
  exchangeRate?: ExchangeRate;
}

export function Account({
  base,
  ccy,
  amount,
  totalAmount,
  exchangeRate,
}: AccountProps) {
  return (
    <Wrapper base={base}>
      <Row>
        <Currency>{ccy}</Currency>
        <AmountWrapper>
          <Sign>{base ? "-" : "+"}</Sign>
          <Amount>{amount}</Amount>
        </AmountWrapper>
      </Row>
      <Row>
        <SmallText>
          <TotalAmount ccy={ccy} amount={totalAmount} />
        </SmallText>
        {exchangeRate && (
          <UnitExchangeRateWrapper>
            <UnitExchangeRate data={exchangeRate} />
          </UnitExchangeRateWrapper>
        )}
      </Row>
    </Wrapper>
  );
}
