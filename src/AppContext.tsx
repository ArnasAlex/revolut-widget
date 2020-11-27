import { createContext, useReducer } from "react";
import { getNextIndex, getPrevIndex } from "./utils/list";
import {
  addAmount,
  convertAmount,
  parseAmountInput,
  subtractAmount,
} from "./utils/number";

export interface AppState {
  accounts: AccountData[];
  baseAccountIdx: number;
  quoteAccountIdx: number;
  baseAmount: string;
  quoteAmount: string;
  baseActive: boolean;
  rate: string;
}

export interface AccountData {
  ccy: string;
  amount: string;
}

export function initialState(): AppState {
  const accounts = [
    { ccy: "EUR", amount: "100" },
    { ccy: "USD", amount: "200" },
    { ccy: "GBP", amount: "300" },
  ];

  return {
    accounts,
    baseAccountIdx: 0,
    quoteAccountIdx: 1,
    baseAmount: "",
    quoteAmount: "",
    baseActive: true,
    rate: "0",
  };
}

interface AppContextValue {
  state: AppState;
  dispatch: (action: Action) => void;
}

interface RateChangedAction {
  type: "RateChanged";
  payload: {
    rate: string;
  };
}

interface BaseAccountChangedAction {
  type: "BaseAccountChanged";
  payload: {
    next?: boolean;
  };
}

interface QuoteAccountChangedAction {
  type: "QuoteAccountChanged";
  payload: {
    next?: boolean;
  };
}

interface BaseAmountChangedAction {
  type: "BaseAmountChanged";
  payload: {
    amount: string;
  };
}

interface QuoteAmountChangedAction {
  type: "QuoteAmountChanged";
  payload: {
    amount: string;
  };
}

interface ExchangeAction {
  type: "Exchange";
  payload: {};
}

type Action =
  | RateChangedAction
  | BaseAccountChangedAction
  | QuoteAccountChangedAction
  | BaseAmountChangedAction
  | QuoteAmountChangedAction
  | ExchangeAction;

export const AppContext = createContext<AppContextValue>({
  state: initialState(),
  dispatch: () => {},
});

export function AppContextProvider({
  children,
}: {
  children: React.ReactChild;
}) {
  const [state, dispatch] = useReducer(reducer, initialState());

  const contextValue: AppContextValue = {
    state,
    dispatch,
  };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "RateChanged":
      return rateChangedReducer(state, action.payload);
    case "BaseAccountChanged":
      return baseAccountChangedReducer(state, action.payload);
    case "QuoteAccountChanged":
      return quoteAccountChangedReducer(state, action.payload);
    case "BaseAmountChanged":
      return baseAmountChangedReducer(state, action.payload);
    case "QuoteAmountChanged":
      return quoteAmountChangedReducer(state, action.payload);
    case "Exchange":
      return exchangeReducer(state);
    default:
      return state;
  }
}

function exchangeReducer(state: AppState): AppState {
  const {
    accounts,
    baseAccountIdx,
    quoteAccountIdx,
    baseAmount,
    quoteAmount,
  } = state;
  const baseAccount = accounts[baseAccountIdx];
  const quoteAccount = accounts[quoteAccountIdx];
  if (!baseAccount || !quoteAccount) {
    return state;
  }

  baseAccount.amount = subtractAmount(baseAccount.amount, baseAmount);
  quoteAccount.amount = addAmount(quoteAccount.amount, quoteAmount);

  const updatedAccounts = accounts.map((acc) => {
    if (acc.ccy === baseAccount.ccy) {
      return { ...baseAccount };
    }

    if (acc.ccy === quoteAccount.ccy) {
      return { ...quoteAccount };
    }

    return acc;
  });

  return {
    ...state,
    accounts: updatedAccounts,
    baseAmount: "",
    quoteAmount: "",
  };
}

function baseAccountChangedReducer(
  state: AppState,
  payload: BaseAccountChangedAction["payload"]
): AppState {
  const { next } = payload;
  const { baseAccountIdx, accounts } = state;
  const newIdx = next
    ? getNextIndex(accounts, baseAccountIdx)
    : getPrevIndex(accounts, baseAccountIdx);

  return { ...state, baseAccountIdx: newIdx, rate: "0" };
}

function quoteAccountChangedReducer(
  state: AppState,
  payload: QuoteAccountChangedAction["payload"]
): AppState {
  const { next } = payload;
  const { quoteAccountIdx, accounts } = state;

  const newIdx = next
    ? getNextIndex(accounts, quoteAccountIdx)
    : getPrevIndex(accounts, quoteAccountIdx);

  return { ...state, quoteAccountIdx: newIdx, rate: "0" };
}

function baseAmountChangedReducer(
  state: AppState,
  payload: BaseAmountChangedAction["payload"]
): AppState {
  const baseAmount = parseAmountInput(payload.amount);
  return {
    ...state,
    baseAmount: baseAmount,
    quoteAmount: convertAmount(baseAmount, state.rate, true),
    baseActive: true,
  };
}

function quoteAmountChangedReducer(
  state: AppState,
  payload: QuoteAmountChangedAction["payload"]
): AppState {
  const quoteAmount = parseAmountInput(payload.amount);
  return {
    ...state,
    quoteAmount: quoteAmount,
    baseAmount: convertAmount(quoteAmount, state.rate),
    baseActive: false,
  };
}

function rateChangedReducer(
  state: AppState,
  payload: RateChangedAction["payload"]
): AppState {
  const { rate } = payload;
  if (rate === state.rate) {
    return state;
  }

  let { baseAmount, quoteAmount, baseActive } = state;

  if (baseActive) {
    quoteAmount = convertAmount(baseAmount, rate, true);
  } else {
    baseAmount = convertAmount(quoteAmount, rate);
  }

  return { ...state, rate: rate, baseAmount, quoteAmount };
}
