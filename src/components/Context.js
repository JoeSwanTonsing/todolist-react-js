import React, { createContext, useState } from "react";

export const TodoListContext = createContext();

const Context = ({ children }) => {
  const [list, setList] = useState([]);
  return (
    <TodoListContext.Provider value={{ list, setList }}>
      {children}
    </TodoListContext.Provider>
  );
};

export default Context;
