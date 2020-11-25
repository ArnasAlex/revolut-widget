import React from "react";
import styled from "styled-components";
import { AccountProvider } from "./AccountContext";
import { Exchanger } from "./exchange";
import { GlobalStyles } from "./styles";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  margin-top: 50px;
  max-width: 600px;
  width: 100%;
`;

export function App() {
  return (
    <Wrapper>
      <GlobalStyles />
      <Content>
        <AccountProvider>
          <Exchanger />
        </AccountProvider>
      </Content>
    </Wrapper>
  );
}
