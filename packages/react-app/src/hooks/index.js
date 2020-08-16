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
        case "SET_ANTS_INSTANCE":
          return {
            ...prevState,
            antsInstance: action.antsInstance,
          };
        case "SET_SELECTED_MENU":
          return {
            ...prevState,
            selectedMenu: action.selectedMenu,
          };
        case "TOGGLE_MODAL":
          return {
            ...prevState,
            openModal: action.modal.openModal,
            modalConfig: action.modal.modalConfig,
          };
        case "SET_ANT_REVIEW_EVENTS_ARRAY":
          return {
            ...prevState,
            antReviewBountyArray: action.antReviewBountyArray,
          };
        case "SET_CONTRIBUTE_BOUNTY_ID":
          return {
            ...prevState,
            contributeBountyId: action.contributeBountyId,
          };
        case "SET_FULFILL_BOUNTY_ID":
          return {
            ...prevState,
            fulfillBountyId: action.fulfillBountyId,
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
      antsInstance: null,
      selectedMenu: "explorer",
      openModal: false,
      modalConfig: {},
      antReviewBountyArray: [],
      contributeBountyId: -1,
      fulfillBountyId: -1,
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
        dispatch({
          type: "SET_ANTS_INSTANCE",
          antsInstance: pWalletConfig.antsInstance,
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
      setAntReviewEventsArray: (pAntReviewBountyArray) => {
        dispatch({
          type: "SET_ANT_REVIEW_EVENTS_ARRAY",
          antReviewBountyArray: pAntReviewBountyArray,
        });
      },
      toggleModal: (modal) => {
        dispatch({ type: "TOGGLE_MODAL", modal });
      },
      setContributeBountyId: (contributeBountyId) => {
        dispatch({ type: "SET_CONTRIBUTE_BOUNTY_ID", contributeBountyId });
      },
      setFulfillBountyId: (fulfillBountyId) => {
        dispatch({ type: "SET_FULFILL_BOUNTY_ID", fulfillBountyId });
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
