import { ThemeProvider } from 'next-themes';
import type { FC, ReactNode } from 'react';
import React, { useCallback, useMemo } from 'react';

export interface State {
  displayModal: boolean;
  modalView: string;
  modalData?: any;
  modalActionType: string;
}

const initialState = {
  displayModal: false,
  modalView: 'LOGIN_VIEW',
  modalData: null,
  modalActionType: 'CREATE',
};

type Action =
  | {
      type: 'OPEN_MODAL';
      modalData?: any;
    }
  | {
      type: 'CLOSE_MODAL';
    }
  | {
      type: 'SET_MODAL_VIEW';
      view: MODAL_VIEWS;
    }
  | {
      type: 'SET_MODAL_ACTION_TYPE';
      actionType: MODAL_ACTION_TYPES;
    };

type MODAL_VIEWS = 'SIGNUP_VIEW' | 'LOGIN_VIEW' | 'TRANSACTION_VIEW';
export type MODAL_ACTION_TYPES = 'UPDATE' | 'READ' | 'CREATE';

export const UIContext = React.createContext<State | any>(initialState);

UIContext.displayName = 'UIContext';

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case 'OPEN_MODAL': {
      return {
        ...state,
        displayModal: true,
        displaySidebar: false,
        modalData: action?.modalData,
      };
    }
    case 'CLOSE_MODAL': {
      return {
        ...state,
        displayModal: false,
        modalData: null,
      };
    }
    case 'SET_MODAL_VIEW': {
      return {
        ...state,
        modalView: action.view,
      };
    }
    case 'SET_MODAL_ACTION_TYPE': {
      return {
        ...state,
        modalActionType: action.actionType,
      };
    }
    default:
      return { ...state };
  }
}

export const UIProvider: FC<{ children?: ReactNode }> = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);
  const openModal = useCallback(
    (data: any) => dispatch({ type: 'OPEN_MODAL', modalData: data }),
    [dispatch]
  );
  const closeModal = useCallback(
    () => dispatch({ type: 'CLOSE_MODAL' }),
    [dispatch]
  );

  const setModalView = useCallback(
    (view: MODAL_VIEWS) => dispatch({ type: 'SET_MODAL_VIEW', view }),
    [dispatch]
  );
  const setModalActionType = useCallback(
    (actionType: MODAL_ACTION_TYPES) =>
      dispatch({ type: 'SET_MODAL_ACTION_TYPE', actionType }),
    [dispatch]
  );

  const value = useMemo(
    () => ({
      ...state,
      openModal,
      closeModal,
      setModalView,
      setModalActionType,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  );

  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context = React.useContext(UIContext);
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};

export const ManagedUIContext: FC<{ children?: ReactNode }> = ({
  children,
}) => (
  <UIProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </UIProvider>
);
