# React JS R&D

React JS research & development team's demo and tutorial files.


## Lesson 4 - Passing Props to Components

### Overview
In this lesson we will continue with our **To Do List** app. We will now learn about ***components*** and passing props to our components.

## Let's Begin

### Step 1:
In your **`src`** directory, create a new directory and we will call it ***components***.
Within the components directory, create a new file and name it `List.js`.

### Step 2:

Come back to your ***App.js*** and remove the `<Row>` block where we displayed the user's To Do List. We won't need that anymore as we are going to make a component that will display the list of user's To Do List.

### Step 3:
Now, in your ***List.js***, import React, like how we did previously in our App.js.
Then create a function. Let's call it `List`. So your function definition will look as below:

`function List(){}`

Now, before we forget, let's export it so that we can actually use it. So, after the declaration, export it as default:

`export default List;`

**OR**

You can combine the two steps into one and declare the function as:

`export default function List(){}`

### Step 4:
Import the bootstrap components you will require. As you can see, in the previous tutorial, we used a *Card* component to list out the to do items, and a *ListGroup* component that actually holds each list item. So import those from react-bootstrap.

`import {Row, Col, ListGroup, Card} from 'react-bootstrap';`

Now, in the **return** of the function, define a row,  and a card.
Give the card header a title by:

    <Card>
    <Card.Header>Title of The Card Goes Here</Card.Header>
    </Card>

> As you can see, this is kind of similar to:
> `<div class="card">`
> `<div class="card-header">Card Title Here</div>`
> `</div>`

 Now, within the List Group, we will display the list of user's to do items.
 You can use the same code as in last tutorial:

    <Row className="mt-4 mb-auto">
    <Col sm={12}>
    <Card>
    <Card.Header className="bg-secondary text-white">Your To Do List</Card.Header>
    <ListGroup variant="flush">
    {
    list.length > 0 ? (
    list.map(item => {
    return (
    <ListGroup.Item key={item.id} className="d-flex flex-row justify-content-between">
    {item.value}
    <Button className="btn btn-danger" onClick={() => removeItem(item.id)}>
    Delete
    </Button>
    </ListGroup.Item>
    )
    })
    ) :
    <ListGroup.Item>Your To Do List is Empty!</ListGroup.Item>
    }
    </ListGroup>
    </Card>
    </Col>
    </Row>

Since we are using components and passing props to our `List` component, we have not defined `list`.

So let us receive the props that are actually passed from the parent component. In our case, the parent component will be App.js.

So in App.js, we will first import the newly created component - List.js:

`import List from './components/List';`

Then in the block where we previously listed the user's To Do items, we will now user the `List` component instead.

`<List />`

As soon as you hit the save button, you will get an error message saying that 'list' is not defined. 'Button' is not defined. 'removeItem' is not defined.

We will take care of the errors in the next steps.

### Step 5:
We have used the state to store the user's to do list in our app. And since we want to display the list in another component, we will have to pass the state variable as prop to the component.
So in the `List` component, pass a parameter like so:

`<List items={list} />`

What this means is:
`List` is the component that we created (*List.js*), and we are passing a property `items` and the value/content of the property is the state variable `list`.

You can think of *props* / *property* in React as *parameters/arguments* in other programming languages.

### Step 6:
Now come back to the *List.js*

Here we will have to remove some functionality for this tutorial, but we will add it back again in the next one as it is not within the span of this lesson.

So remove the:

    <Button className="btn btn-danger" onClick={() => removeItem(item.id)}>
    Delete
    </Button>

Within the ListGroup.Item block.

You should still see ***'Failed to compile'*** error. That is because we do not have `list` in our component.

If you remember in our App.js we passed the prop `items` to the List component. So now we will have to receive it.

Replace the function declaration:

`export  default  function  List({ items }) {`

Now, in the code within <ListGroup> block, replace all 'list' with 'items'

There you have it. Our List is now a component on its own, and you have successfully passed the list prop to the List component and displayed the list items.

***As  you may have noticed, the functionality for the 'Remove Item' has been removed. This is because in React, it is very easy to pass props from the parent to the child, however the child cannot  pass props back to the parent just as easily. There are various ways to overcome this using contexts or redux, etc and we will discuss this in the next Lesson.***

## After completion, your App.js should look like this

    import  React, { useState } from  'react';
    import { Col, Container, Row, Button, Navbar, Nav } from  'react-bootstrap';
    import  List  from  './components/List';
    
    function  App() {
    const [usrIn, setUsrIn] = useState('');
    const [list, setList] = useState([]);
    
    function  addItem() {
    if (usrIn !== '') {
    const  newItem = {
    id:  Math.random(),
    value:  usrIn
    }
    const  newlist = [...list];
    newlist.push(newItem);
    setList(newlist);
    setUsrIn('');
    }
    }
    
    function  updateInput(event) {
    setUsrIn(event.target.value);
    }
    
    function  removeItem(key) {
    const  currentList = [...list];
    const  updatedList = currentList.filter(item  =>  item.id !== key);
    setList(updatedList);
    }
    
    return (
    <div  style={{height:"100vh", overflow:  'hidden'}}>
    <Navbar  bg="dark"  expand="lg"  className="navbar-dark fixed-top">
    <Container>
    <Navbar.Brand  href=""  className="text-light">To Do List</Navbar.Brand>
    <Navbar.Toggle  aria-controls="basic-navbar-nav"  />
    <Navbar.Collapse  id="basic-navbar-nav"  className="ml-auto">
    <Nav  className="ml-auto">
    <Nav.Link  target="_blank"  href="https://github.com/JoeSwanTonsing/todolist-react-js/tree/Lesson3-WithBootstrap4"  className="text-light">Visit The GitHub Repo</Nav.Link>
    <Nav.Link  href=""  className="text-secondary">Demo By React JS R&amp;D Team</Nav.Link>
    </Nav>
    </Navbar.Collapse>
    </Container>
    </Navbar>
    <Container  style={{paddingTop:  50}}>
    <Row  className="mt-4 text-center">
    <Col  className="text-center"  sm={9}>
    <input
    type="text"
    id="inputTODO"
    name="inputTODO"
    placeholder="What do you like to do?"
    onChange={updateInput}
    value={usrIn}
    className="form-control"
    style={{ padding:  '5px' }}  />
    </Col>
    <Col  sm={3}>
    <Button  className="btn btn-info d-none d-sm-block form-control"  onClick={addItem}>Add Item</Button>
    <Button  className="btn btn-info d-block d-sm-none mt-4 form-control"  onClick={addItem}>Add Item</Button>
    </Col>
    </Row>
    <List  items={list}  />
    </Container>
    </div>
    );
    };
    export  default  App;

## Your List.js should look like this:

    import  React  from  'react';
    import { Row, Col, ListGroup, Card } from  'react-bootstrap';
    export  default  function  List({ items }) {
    return (
    <Row  className="mt-4 mb-auto">
    <Col  sm={12}>
    <Card>
    <Card.Header  className="bg-secondary text-white">Your To Do List {items.length > 0 ? (
    '- ' + items.length + ' Items'
    ): null}</Card.Header>
    <ListGroup  variant="flush">
    {
    items.length > 0 ? (
    items.map(item  => {
    return (
    <ListGroup.Item  key={item.id}  className="d-flex flex-row justify-content-between">
    {item.value}
    </ListGroup.Item>
    )
    })
    ) :
    <ListGroup.Item>Your To Do List is Empty!</ListGroup.Item>
    }
    </ListGroup>
    </Card>
    </Col>
    </Row>
    );
    }


### That is it for Lesson 4. See you in the next Lesson. 🙂