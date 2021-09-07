import React, { useState } from "react";

import "./App.css"; //Import the css we created
import Header from "./components/Header";

function App() {
  const [usrIn, setUsrIn] = useState(""); //Create state for capturing user input and initialize to empty string
  const [list, setList] = useState([]); //State to maintain the user's todo list

  //in state, the first value is used to access the value, and the second value is used to set the value.

  //function to add todo item
  function addItem() {
    if (usrIn !== "") {
      //check if input is empty
      const newItem = {
        id: Math.random(), //generate random id
        value: usrIn, //actual input by user
      };

      const newlist = [...list]; //spread operator to get the current list of todos
      newlist.push(newItem); //add the new added todo to the list
      setList(newlist); //save the list
      setUsrIn(""); //empty the input element
    }
  }

  //when user types into the input, the entered value is captured here and stored to the state variable
  function updateInput(event) {
    setUsrIn(event.target.value); //set the input value to the state
  }

  //when user click on the todo item, remove that item
  function removeItem(key) {
    //get the current list
    const currentList = [...list];

    //from current list, filter and extract all items except the item that was clicked. We can do that by getting the id.

    const updatedList = currentList.filter((item) => item.id !== key);
    //if the key that was passed is not same as the item's id, then store it in the updatedList. If key===item.id, then it will omit.

    setList(updatedList); //update the list
  }

  return (
    <div className="container">
      <Header noOfTodos={list.length} />
      <div className="comp1-container">
        <p>What do you want to do?</p>
        <input
          type="text"
          id="inputTODO"
          name="inputTODO"
          placeholder="Enter To Do......"
          onChange={updateInput}
          value={usrIn}
        />
        <button type="buttton" name="sub" onClick={addItem}>
          ADD
        </button>
      </div>
      {list.length > 0 ? (
        <div className="comp2-container">
          <ul>
            {list.map((items) => {
              return (
                <li key={items.id} onClick={() => removeItem(items.id)}>
                  {items.value}
                  <hr />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="comp2-container">
          <p className="text-center">
            You have nothing to do? Such a lazy person!
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
