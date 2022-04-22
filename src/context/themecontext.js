import { Action } from "history";
import React, { createContext, useReducer } from "react";
import { Children } from "react/cjs/react.production.min";

const Context = createContext();

const initialThemeState = {
  appliedTheme: 0,
};

const themeReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_THEME":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const Provider = ({ children }) => {
  const [themeState, dispatch] = useReducer(themeReducer, initialThemeState);

  const updateTheme = (data) => {
    dispatch({ type: "UPDATE_THEME", payload: data });
  };

  return (
    <Context.Provider value={{ data: themeState, updateTheme }}>
      {children}
    </Context.Provider>
  );
};

export { Context, Provider };