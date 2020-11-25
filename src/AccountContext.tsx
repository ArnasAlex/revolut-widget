import { createContext, useReducer } from "react";
import { CcyAmount } from "./types";
import { addAmount, subtractAmount } from "./utils/number";

export interface AccountData {
  ccy: string;
  amount: string;
}

export function initialState(): AccountData[] {
  return [
    { ccy: "EUR", amount: "100" },
    { ccy: "USD", amount: "200" },
    { ccy: "GBP", amount: "300" },
  ];
}

interface AccountContextData {
  state: AccountData[];
  dispatch: (action: Action) => void;
}

interface ConvertAction {
  type: "Convert";
  payload: {
    base: CcyAmount;
    quote: CcyAmount;
  };
}

type Action = ConvertAction;

export const AccountContext = createContext<AccountContextData>({
  state: initialState(),
  dispatch: () => {},
});

export function AccountProvider({ children }: { children: React.ReactChild }) {
  const [state, dispatch] = useReducer(reducer, initialState());

  const contextValue: AccountContextData = {
    state,
    dispatch,
  };
  return (
    <AccountContext.Provider value={contextValue}>
      {children}
    </AccountContext.Provider>
  );
}

export function reducer(state: AccountData[], action: Action): AccountData[] {
  const { type } = action;
  switch (type) {
    case "Convert":
      return convertCurrency(state, action.payload);
    default:
      return state;
  }
}

function convertCurrency(
  accounts: AccountData[],
  payload: ConvertAction["payload"]
): AccountData[] {
  const baseAccount = accounts.find((x) => x.ccy === payload.base.ccy);
  const quoteAccount = accounts.find((x) => x.ccy === payload.quote.ccy);
  if (!baseAccount || !quoteAccount) {
    return accounts;
  }

  baseAccount.amount = subtractAmount(baseAccount.amount, payload.base.amount);
  quoteAccount.amount = addAmount(quoteAccount.amount, payload.quote.amount);

  return accounts.map((acc) => {
    if (acc.ccy === baseAccount.ccy) {
      return { ...baseAccount };
    }

    if (acc.ccy === quoteAccount.ccy) {
      return { ...quoteAccount };
    }

    return acc;
  });
}
