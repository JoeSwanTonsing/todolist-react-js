# React JS R&D

React JS research & development team's demo and tutorial files.

## Lesson 5 - Managing State Using Context

### Overview

In this lesson we will continue with our **To Do List** app. We will now learn about **_context_** and for state easier state management.

## Let's Begin

### Step 1:

In your **`components`** directory, create a new javascript file and we will call it `Context.js`.

### Step 2:

Inside the `Context.js` file,we are going to import React, like how we did in all react components.
We are also going to import `createContext` and `useState` which are the main hooks for building our context(which is similar to a store in Redux).

Below is the corresponding code :-

`import React, { createContext, useState } from "react";`

### Step 3:

Our next step is to make use of our `createContext`. To do so, we will create a context which will be exported and used throughout our Todo application. Let's call this context by the name **TodoListContext**

`export const TodoListContext = createContext();`

Brace yourselves! The code is about to be interesting from the next step onwards. :D

### Step 4:

Inside our `Context.js` file, we are now going to create a functional component by the name **Context** and export it as default as follows:-

    const Context = () => {
        return ();
    };

    export default Context;

### Step 5:

Now, inside our **Context** functional component, we are going to declare a useState array-state variable called `list` as follows :-

`const [list,setList] = useState([]);`

And inside our **return** function, we are going to mount a provider component.
_Note: A provider component is a component which is part of a context. We need to use this component in order to pass data down into our children (which we will see in a bit)_

Let us mount a provider which belongs to the **TodoListContext** created in _step 3_ as follows :-

    return(
        <TodoListContext.Provider value={{list,setList}}>
        </TodoListContext.Provider>
    )

_Note: What we are doing here is we are passing **list** and **setList** as props to our children(But who are the children,right??? We'll see that in the next step)_

### Step 6:

Let us leave the `Context.js` file for now, and enter our `index.js` file.
What we are going to do here is, we are going to wrap our `<App/>` component in side our `<Context/>` component which we have just created. To do that we have to import our `Context` component.

`import Context from "./components/Context";`

Now, let use go ahead and wrap it:-

ReactDOM.render(
<Context>
<App />
</Context>,document.getElementById("root")
);

_Quick-Qtn:Con you guess who the **children** are???_

### Step 7:

Let us go back to our `Context.js` file.
Our goal now is provide the children component to the context's provider. We will do that in two steps. Firstly, we will receive the children as parameter of the `Context` functional component and then we will provide it to the <TodoListContext.Provider> component as children with the keyword **children**. The following is our code :-

    const Context = ({ children }) => {
        const [list, setList] = useState([]);
        return (
            <TodoListContext.Provider value={{ list, setList }}>
                 {children}
            </TodoListContext.Provider>
        );
    };

_Note: The children here is the `<App/>` component and all its children. This basically means that all the components in our application can access our sweet `TodoListContext`. Let us see how we do that in the next step._

### Step 8:

Let us go to our `App.js` file. Here, we can see that we are still using a local **list** state which is declared using the useState hook as follows :-

`const [list, setList] = useState([])`

We are now going to replace the above line by using context state as follows :-

`const { list, setList } = useContext(TodoListContext);`

But hold on!!! We haven't imported the **useContext** hook and **TodoListContext** just yet. Let us do that right away :-

`import React,{useState,useContext} from "react";`
`import {TodoListContext} from "./components/Context";`

*We have just successfully created our context and everytime we add a new to-do, we are storing it in the context. Go ahead and give it a try*🙂

### Step 9:

We are now going to work on the deletion of todos.

Let us navigate to `List.js` file. Import a button from `react-bootstrap` into this file.

`import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";`

Now, inside the `<ListGroup.Item>` component, next to _{item.value}_ , we are going to put the delete button. Following is the code :-

<ListGroup.Item
key={item.id}
className="d-flex flex-row justify-content-between" >
{item.value}
<Button
className="btn btn-danger"
onClick={() => removeItem(item.id)} >
Delete
</Button>
</ListGroup.Item>

Now, let us cut the `removeItem()` function that we have inside the `App.js` file and paste it inside the `List` functional component as follows:-

export default function List({ items }) {
const { list, setList } = useContext(TodoListContext);

    function removeItem(key) {
        const currentList = [...list];
        const updatedList = currentList.filter((item) => item.id !== key);

        setList(updatedList);
    }

    return (
        .
        .
        .
    )

}

## After completion, your index.js should look like this

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import Context from "./components/Context";

ReactDOM.render(
<Context>
<App />
</Context>,
document.getElementById("root")
);

## Your Context.js file should look like this

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

## Your App.js file should look like this

import React, { useState, useContext } from "react";
import { Col, Container, Row, Button, Navbar, Nav } from "react-bootstrap";
import { TodoListContext } from "./components/Context";
import List from "./components/List";

function App() {
const [usrIn, setUsrIn] = useState("");
const { list, setList } = useContext(TodoListContext);

function addItem() {
if (usrIn !== "") {
const newItem = {
id: Math.random(),
value: usrIn,
};
const newlist = [...list];
newlist.push(newItem);
setList(newlist);
setUsrIn("");
}
}

function updateInput(event) {
setUsrIn(event.target.value);
}

return (

<div style={{ height: "100vh", overflow: "hidden" }}>
<Navbar bg="dark" expand="lg" className="navbar-dark fixed-top">
<Container>
<Navbar.Brand href="" className="text-light">
To Do List
</Navbar.Brand>
<Navbar.Toggle aria-controls="basic-navbar-nav" />
<Navbar.Collapse id="basic-navbar-nav" className="ml-auto">
<Nav className="ml-auto">
<Nav.Link
target="\_blank"
href="https://github.com/JoeSwanTonsing/todolist-react-js/tree/Lesson3-WithBootstrap4"
className="text-light" >
Visit The GitHub Repo
</Nav.Link>
<Nav.Link href="" className="text-secondary">
Demo By React JS R&amp;D Team
</Nav.Link>
</Nav>
</Navbar.Collapse>
</Container>
</Navbar>
<Container style={{ paddingTop: 50 }}>
<Row className="mt-4 text-center">
<Col className="text-center" sm={9}>
<input
type="text"
id="inputTODO"
name="inputTODO"
placeholder="What do you like to do?"
onChange={updateInput}
value={usrIn}
className="form-control"
style={{ padding: "5px" }}
/>
</Col>
<Col sm={3}>
<Button
              className="btn btn-info d-none d-sm-block form-control"
              onClick={addItem}
            >
Add Item
</Button>
<Button
              className="btn btn-info d-block d-sm-none mt-4 form-control"
              onClick={addItem}
            >
Add Item
</Button>
</Col>
</Row>

        <List items={list} />
      </Container>
    </div>

);
}

export default App;

## Your List.js file should look like this

import React, { useContext } from "react";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { TodoListContext } from "./Context";

export default function List({ items }) {
const { list, setList } = useContext(TodoListContext);

function removeItem(key) {
const currentList = [...list];
const updatedList = currentList.filter((item) => item.id !== key);

    setList(updatedList);

}

return (
<Row className="mt-4 mb-auto">
<Col sm={12}>
<Card>
<Card.Header className="bg-secondary text-white">
Your To Do List{" "}
{items.length > 0 ? "- " + items.length + " Items" : null}
</Card.Header>
<ListGroup variant="flush">
{items.length > 0 ? (
items.map((item) => {
return (
<ListGroup.Item
key={item.id}
className="d-flex flex-row justify-content-between" >
{item.value}
<Button
className="btn btn-danger"
onClick={() => removeItem(item.id)} >
Delete
</Button>
</ListGroup.Item>
);
})
) : (
<ListGroup.Item>Your To Do List is Empty!</ListGroup.Item>
)}
</ListGroup>
</Card>
</Col>
</Row>
);
}

### That is it for Lesson 5. See you in the next Lesson. 🙂
