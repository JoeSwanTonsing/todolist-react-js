# React JS R&D

React JS research & development team's demo and tutorial files.

## Lesson 6 - Complimenting useContext By Using useReducer Hook

### Overview

In this lesson we will continue with our **To Do List** app. We will now learn about **_useReducer_** and how it compliments _useContext_ in state management.

## Let's Begin

### Step 1:

Navigate to `Context.js` inside **`components`** directory.

Our **goal** is to replace `useState` with `useReducer` hook.

For that, we will replace the _useState_ hook with _useReducer_ at the import section of the `Context.js` file.

`import React, { createContext, useReducer } from "react";`

### Step 2:

Now, we will remove the `useState` declaration line :-

`const [list, setList] = useState([]);`

And replace it with a `useReducer` declaration as follows :-

`const [list, dispatch] = useReducer(manipulateList, []);`

_Note: In the left side of the above line, we are specifying the required fields (i.e, list and the setter-function, aka 'dispatch'). In the right side, we can see that the useReducer hook takes two arguments (i.e, manipulateList and a pair of square brackets. These square brackets ([]) signify the initial state of our list and the 'manipulateList' will act as a function which will be called everytime we want to add/delete a todo to/from our state._

### Step 3:

Our next step is to define our **manipulateList** function. We will define it outside of the **Context** function as follows :-

`function manipulateList(state, action) {}`

_Note: The **manipulateList** function will take two parameters, state and action. The `state` refers to the **current state** of the useReducer(i.e, the **list** state) and the `action` will be an **object** that is passed by a `dispatch` function(we will see how it works in the next few steps)._

### Step 4:

We are now going to build our **manipulateList** function. Interestingly, this function will have nothing but a _swith statement_ which performs the add/remove operations. Following will be our code :-

    function manipulateList(state, action) {
        switch (action.type) {
            case "ADD_TODO": {
               return;
            }
            case "DELETE_TODO": {
               return;
            }
            default:
               return;
        }
    }

_Note: The `swith()` statement will make use of a field called **type** which is included in the `action` object(we will see how this works in the next few steps) for comparing with the different test-cases.From the code itself, we can understand that the **type** field is nothing but a string. Also, we are simply putting **return** statements in each test-cases for now. We will come back to this function in the later steps._

### Step 5:

Now, in our <TodoListContext>'s provider, we will change the setter-function **setList** with **dispatch**.

    const Context = ({ children }) => {
        const [list, dispatch] = useReducer(manipulateList, []);
            return (
                <TodoListContext.Provider value={{ list, dispatch }}>
                    {children}
                </TodoListContext.Provider>
            );
    };

_Note: the state "**list**" that is passed to the children is a different one(i.e, it belongs to the `useReducer` hook and not the `useState` hook anymore._)

### Step 6:

Now, let the **FUN PART** begin!!!

Navigate to the `App.js` file. Here we will see that we are still using the **list** and **setList** that belongs to `useState` hook and provided by the context via `useContext` hook.

`const { list, setList } = useContext(TodoListContext);`

We are now going to change this line by identifying(i.e, de-structuring) the new changes(i.e, the **list** and **dispatch** props) that are provided by the TodoListContext's provider.

`const { dispatch } = useContext(TodoListContext);`

_Note: Our goal is to work on todo add-operation. So, we are only going to destructure the **dispatch** function for now._

### Step 7:

Now, we will be making use of the `dispatch()` function for adding a todo. For this, we will refactor the code inside **addItem()** function.

Currently, our addItem() function looks like this:-

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

By using the `dispatch()` function, we are going to replace the push() function. Following is the code :-

    function addItem() {
        if (usrIn !== "") {
            const newItem = {
                id: Math.random(),
                value: usrIn,
            };
            dispatch({ type: "ADD_TODO", payload: newItem });
            setUsrIn("");
        }
    }

*Note: We are passing an object which contains two fields inside the dispatch's argument-list. So maybe now you can guess the what that **action** object inside the **manipulateList** function of the `Context.js` file actually is*🙂. The **type** as said earlier is just a string for conditional operation of the switch() **manipulateList** function while the **payload** means the data that we want to make changes(i.e, it acts as extra piece of information).

### Step 8:

Now, let us open side-by-side the `Context.js` file and the `App.js` file.

Our **manipulateList** function of `Context.js` file currently looks like this:-

    function manipulateList(state, action) {
        switch (action.type) {
            case "ADD_TODO": {
               return;
            }
            case "DELETE_TODO": {
               return;
            }
            default:
               return;
        }
    }

Our goal is to add some lines of code to the "ADD_TODO" test-case. We will now add the line as follows:-

    function manipulateList(state, action) {
        switch (action.type) {
            case "ADD_TODO": {
                return [...state, action.payload];
            }
            case "DELETE_TODO": {
               return;
            }
            default:
               return;
        }
    }

_Note: What we are doing in the above line is we are basically taking the current state and adding a new todo(i.e, the **action.payload**) to it and then returning it back to the `dispatch()` function and to the `useReducer()` hook which updates the new **list** state._

**\_Note: **action** contains **type** and **payload** as it's fields\_**

We are now done with the todo-add-operation. Let's now work on todo-delete-operation in the next step.

### Step 9:

Let us open the `App.js` and `List.js` files side-by-side.

In the `List.js` file, we can see that we are de-structuring the **list** and **setList** provided by `useState` hook.

`const { list, setList } = useContext(TodoListContext);`

We will now change this line by de-structuring the the newly **list** and **dispatch()** props as follows:- (ofcourse the **list** remains the same as it has the same name :D)

`const { list, dispatch } = useContext(TodoListContext);`

Also we won't be using the **items** prop anymore, so we will delete it from the parameter-list of the `List` functional component :-

    export default function List() {
        .
        .
        .
    }

Now, instead of the **items** prop, we will use the **list** that we de-structured earlier. So we will replace all the lines in the `return()` function that contain **items** with **list** as follows :-

    return (
        <Row className="mt-4 mb-auto">
            <Col sm={12}>
                <Card>
                    <Card.Header className="bg-secondary text-white">
                        Your To Do List{" "}
                        {list.length > 0 ? "- " + list.length + " Lists" : null}
                    </Card.Header>
                    <ListGroup variant="flush">
                        {list.length > 0 ? (
                            list.map((item) => {
                                return (
                                    <ListGroup.Item
                                        key={item.id}
                                        className="d-flex flex-row justify-content-between"
                                    >
                                        {item.value}
                                        <Button
                                            className="btn btn-danger"
                                            onClick={() => removeItem(item.id)}
                                        >
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

Also, since we won't be using the **items** prop anymore, let us go ahead and delete it from the line of code where `List` component is rendered . Since `List` component is rendered by `App` component, then let us go to `App.js` file.

We can see the `List` component being rendered as follows in the `App.js` file :-

`<List items={list} />`

We will remove the **items** props :-

`<List />`

### Step 10:

Now, for the last piece of the puzzle: the **removeItem()** function.

Our `removeItem()` function currently looks like this:-

    function removeItem(key) {
        const currentList = [...list];
        const updatedList = currentList.filter((item) => item.id !== key);

        setList(updatedList);
    }

Using `dispatch()` function, we now can replace it like this :-

    function removeItem(key) {
        dispatch({ type: "DELETE_TODO", payload: key });
    }

_Note: Our **action** object has a **type**:"DELETE_TODO" and a **payload**:"key"_

Thats it for the `App.js` file.

We now have refactor our `Context.js` file.

In the **DELETE_TODO** test-case of the **manipulateList** in the `Context.js` file, we will now perform the array-filter operation and return the modified state. Following is the code:-

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

_Note: The **action.payload** in the "DELETE_TODO" test-case is nothing but a todo-id. Whereas in the "ADD_TODO" test-case, it is a todo-object._

## After completion, your App.js should look like this

    import React, { useState, useContext } from "react";
    import { Col, Container, Row, Button, Navbar, Nav } from "react-bootstrap";
    import { TodoListContext } from "./components/Context";
    import List from "./components/List";

    function App() {
        const [usrIn, setUsrIn] = useState("");
        const { dispatch } = useContext(TodoListContext);

        function addItem() {
            if (usrIn !== "") {
                const newItem = {
                    id: Math.random(),
                    value: usrIn,
                };
                dispatch({ type: "ADD_TODO", payload: newItem });
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

                    <List />
                </Container>
            </div>

        );
    }

    export default App;

## Your Context.js file should look like this

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

## Your List.js file should look like this

    import React, { useContext } from "react";
    import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
    import { TodoListContext } from "./Context";

    export default function List() {
        const { list, dispatch } = useContext(TodoListContext);

        function removeItem(key) {
           dispatch({ type: "DELETE_TODO", payload: key });
        }

        return (
            <Row className="mt-4 mb-auto">

                <Col sm={12}>
                    <Card>
                        <Card.Header className="bg-secondary text-white">
                            Your To Do List{" "}
                            {list.length > 0 ? "- " + list.length + " Items" : null}
                        </Card.Header>
                        <ListGroup variant="flush">
                            {list.length > 0 ? (
                                list.map((item) => {
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

### That is it for Lesson 6. See you in the next Lesson. 🙂
