import React, { createContext, useCallback, useReducer } from 'react';
import AuthFormLayout from '../layout/AuthFormLayout';
import AuthLayout from '../layout/AuthLayout';
import CleanLayout from '../layout/CleanLayout';
import MainLayout from '../layout/MainLayout';

export const layoutNames = {
  CLEAN: 'clean',
  AUTH_FORM: 'authForm',
  AUTH: 'auth',
  MAIN: 'main'
};

const actions = {
  SET_CLEAN_LAYOUT: 'setCleanLayout',
  SET_AUTH_FORM_LAYOUT: 'setAuthFormLayout',
  SET_AUTH_LAYOUT: 'setAuthLayout',
  SET_MAIN_LAYOUT: 'setMainLayout',
  SET_IMG_BG: 'setImgBg',
  SET_COLOR_BG: 'setColorBg',
  RESET_BG: 'resetBg',
  SET_TITLE: 'setTitle',
  RESET: 'reset'
};

const initialState = {
  ActiveLayout: CleanLayout,
  bg: { type: 'color', src: '', hex: '#121212' },
  title: ''
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.SET_AUTH_FORM_LAYOUT:
      return { ...state, ActiveLayout: AuthFormLayout };
    case actions.SET_CLEAN_LAYOUT:
      return { ...state, ActiveLayout: CleanLayout };
    case actions.SET_AUTH_LAYOUT:
      return { ...state, ActiveLayout: AuthLayout };
    case actions.SET_MAIN_LAYOUT:
      return { ...state, ActiveLayout: MainLayout };
    case actions.SET_IMG_BG:
      return { ...state, bg: { type: 'img', src: action.payload } };
    case actions.SET_COLOR_BG:
      return { ...state, bg: { type: 'color', hex: action.payload } };
    case actions.RESET_BG:
      return { ...state, bg: { ...initialState.bg } };
    case actions.SET_TITLE:
      return { ...state, title: action.payload };
    case actions.RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export const LayoutContext = createContext({
  ...initialState,
  setClean() {},
  // eslint-disable-next-line no-unused-vars
  setAuthForm({ bg, src = '', hex = '', title }) {},
  // eslint-disable-next-line no-unused-vars
  setAuth({ bg, src = '', hex = '' }) {},
  // eslint-disable-next-line no-unused-vars
  setMain({ title }) {},
  // eslint-disable-next-line no-unused-vars
  setImgBg(src = '') {},
  // eslint-disable-next-line no-unused-vars
  setColorBg(hex = '') {},
  resetBg() {},
  reset() {}
});

const LayoutProvider = ({ children }) => {
  const [layout, dispatch] = useReducer(reducer, initialState);

  const setClean = useCallback((src) => {
    dispatch({ type: actions.SET_CLEAN_LAYOUT });
    dispatch({ type: actions.SET_IMG_BG, payload: src });
  }, []);

  const setAuthForm = useCallback(({ bg, src = '', hex = '', title }) => {
    dispatch({ type: actions.SET_AUTH_FORM_LAYOUT });
    dispatch({ type: actions.SET_TITLE, payload: title });
    dispatch({
      type:
        bg === 'img'
          ? actions.SET_IMG_BG
          : bg === 'color' && actions.SET_COLOR_BG,
      payload: src || hex
    });
  }, []);

  const setAuth = useCallback(({ bg, src = '', hex = '' }) => {
    dispatch({ type: actions.SET_AUTH_LAYOUT });
    dispatch({
      type:
        bg === 'img'
          ? actions.SET_IMG_BG
          : bg === 'color' && actions.SET_COLOR_BG,
      payload: src || hex
    });
  }, []);

  const setMain = useCallback(({ title }) => {
    dispatch({ type: actions.SET_MAIN_LAYOUT });
    dispatch({ type: actions.SET_TITLE, payload: title });
    dispatch({ type: actions.RESET_BG });
  }, []);

  const setImgBg = useCallback(
    (src) => dispatch({ type: actions.SET_IMG_BG, payload: src }),
    []
  );

  const setColorBg = useCallback(
    (hex) => dispatch({ type: actions.SET_COLOR_BG, payload: hex }),
    []
  );

  const resetBg = useCallback(() => dispatch({ type: actions.RESET_BG }), []);

  const reset = useCallback(() => dispatch({ tupe: actions.RESET }), []);

  return (
    <LayoutContext.Provider
      value={{
        ...layout,
        setClean,
        setAuthForm,
        setAuth,
        setMain,
        setImgBg,
        setColorBg,
        resetBg,
        reset
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
