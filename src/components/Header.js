import React from "react";

export default function Header({ noOfTodos }) {
  return (
    <div className="title-container">
      <h3>To Do List({noOfTodos})</h3>
    </div>
  );
}
