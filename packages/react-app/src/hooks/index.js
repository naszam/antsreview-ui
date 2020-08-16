import React, { createContext, useMemo, useReducer } from "react";
import { useHistory } from "react-router-dom";

export const ActionContext = createContext();
export const StateContext = createContext();

export const AppProvider = (props) => {
  const history = useHistory();
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "SET_WEB3":
          return {
            ...prevState,
            web3: action.web3,
          };
        case "SET_NETWORK_ID":
          return {
            ...prevState,
            networkId: action.networkId,
          };
        case "SET_WALLET_ADDRESS":
          return {
            ...prevState,
            accounts: action.accounts,
          };
        case "SET_ANTS_REVIEW_INSTANCE":
          return {
            ...prevState,
            antsReviewInstance: action.antsReviewInstance,
          };
        case "SET_ANTS_FAUCET_INSTANCE":
          return {
            ...prevState,
            antsFaucetInstance: action.antsFaucetInstance,
          };
        case "SET_SELECTED_MENU":
          return {
            ...prevState,
            selectedMenu: action.selectedMenu,
          };
        default:
      }
    },
    {
      web3: null,
      networkId: -1,
      accounts: "",
      antsReviewInstance: null,
      antsFaucetInstance: null,
      selectedMenu: "explorer",
    }
  );

  const actionContext = useMemo(
    () => ({
      addWeb3Config: async (pWalletConfig) => {
        console.log(pWalletConfig);
        dispatch({ type: "SET_WEB3", web3: pWalletConfig.web3 });
        dispatch({
          type: "SET_NETWORK_ID",
          networkId: pWalletConfig.networkId,
        });
        dispatch({
          type: "SET_WALLET_ADDRESS",
          accounts: pWalletConfig.accounts,
        });
        dispatch({
          type: "SET_ANTS_REVIEW_INSTANCE",
          antsReviewInstance: pWalletConfig.antsReviewInstance,
        });
        dispatch({
          type: "SET_ANTS_FAUCET_INSTANCE",
          antsFaucetInstance: pWalletConfig.antsFaucetInstance,
        });
      },
      selectMenu: (pMenu) => {
        history.push(`/${pMenu}`);
        dispatch({ type: "SET_SELECTED_MENU", selectedMenu: pMenu });
      },
      setNetworkId: (pNetworkId) => {
        dispatch({
          type: "SET_NETWORK_ID",
          networkId: pNetworkId,
        });
      },
      setAccount: (pAccount) => {
        dispatch({
          type: "SET_WALLET_ADDRESS",
          accounts: pAccount,
        });
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <ActionContext.Provider value={actionContext}>
      <StateContext.Provider value={state}>
        {props.children}
      </StateContext.Provider>
    </ActionContext.Provider>
  );
};
