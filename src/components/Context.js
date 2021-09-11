import React, { createContext, useReducer } from "react";

export const TodoListContext = createContext();

function manipulateList(state, action) {
  switch (action.type) {
    case "ADD_TODO": {
      return [...state, action.payload];
    }
    case "DELETE_TODO": {
      return state.filter((todo) => todo.id !== action.payload);
    }
    default:
      return state;
  }
}

const Context = ({ children }) => {
  const [list, dispatch] = useReducer(manipulateList, []);
  return (
    <TodoListContext.Provider value={{ list, dispatch }}>
      {children}
    </TodoListContext.Provider>
  );
};

export default Context;
