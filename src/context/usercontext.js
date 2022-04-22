import React, { createContext, useReducer } from "react";

const Context = createContext();

const initialData = {
  firstName: "astha",
  lastName: "paudel",
  location: "Dhapakhel",
  age: 20,
};

const userReducer = (state, action) => {
  switch(action.type) {
    case 'UPDATE':
      return { ...state, ...action.payload }
    default:
      return state;
  }
}

const Provider = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, initialData);


  const updateUser = (data) => {
    dispatch({ type: 'UPDATE', payload: data })
  };

  return (
    <Context.Provider value={{ key: "test", name: "Amit", data: userState, updateUser }}>
      {children}
    </Context.Provider>
  );
};

export { Context, Provider };
