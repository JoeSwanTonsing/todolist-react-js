# React JS R&D

React JS research & development team's demo and tutorial files.


# Lesson 3

In this lesson, we  will learn how to integrate **Bootstrap 4** to our already created **To Do List App** back in lessons 1 & 2.

### Required Dependencies, Libraries, etc
- React-Bootstrap (Bootstrap 4):
> `npm install react-bootstrap bootstrap@4.6.0`



## Import BS4:

In your index.js file import the bootstrap css file.
For example:

> import  React  from  'react';
> import  ReactDOM  from  'react-dom';
> import  App  from  './app';
> **`import  'bootstrap/dist/css/bootstrap.min.css';`**
> ReactDOM.render(<App  />, document.getElementById('root'));

## That's it?

Well, almost, but not quite. Now you can start using bootstrap 4 classes and elements into your application. Read on for how to convert your elements to bootstrap classes.

## Out With the Old

In your app.js file, you can remove everything within the `<div className='container'>`. Basically what I'm saying to remove is the html part, as we are going to replace them all with bootstrap.

> **Note:** Although it is not important, it will be advantageous to know and be already familiar with bootstrap classes and class naming conventions.

## In with the New
### Step 1:

In your app.js return parameter, (which if you followed the above steps should now be empty), declare a new component. A bootstrap component. We'll use the 'container' class of bootstrap:

`<Container></Container>`

If you have installed code hinters and linters, you will already see warning/error lines on the component. That is because we have not yet imported the components from the bootstrap library.

You can do that by importing the required components from the bootstrap library:

- `import Container from 'react-bootstrap/Container';`

If you have to import more than one, then you can group and import all components like:

- `import {Container, Row, Col, Button, Card, ListGroup, Navbar, Nav} from 'react-bootstrap';`

Now that we have imported all the components we will require, lets go back to the code.

> **Note:** As you may have already recognised, you can see the similarities between the normal bootstrap class and the react-boostrap classes, in that, they have the same class names, it only defers in how you use them. For example, in html you couold use a container, a row or a col class within a div tag:
> `<div class="container">`
> In React however, each class name becomes a component on its own. So a container becomes a separate component, similarly a row and a col:
> `<Container>`
> `<Row>`
> `<Col>`

### Step 2:

Let's re-create the title bar of out app.
Previously we had an `<h3></h3>` tag with the text 'To Do List'. Let us now replace it with a navbar. Below is the code:

    <Navbar bg="dark" expand="lg" className="navbar-dark">
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

Here we are using a dark theme navbar. The nav bar is collapsible, that means that on bigger screens the menu items will be expanded and shown, and on smaller screens, the menu items will be shown only on the press of the toggle button.

### Step 3:
As in the last lesson, we will wrap all of our contents in a container. This time we will use bootstrap's container component.

`<Container></Container>`

Within the container, we will separate each element by the row and col components.
In the first row, we will have:
- A text input field where the user will be able to input a todo item,
- Button that will add the todo item to the list.

Code is as follows:

    <Row  className="mt-4 text-center">
    
    <Col  className="text-center"  sm={9}>
    <input
    type="text"
    id="inputTODO"
    name="inputTODO"
    placeholder="What do you like to do?"
    onChange={updateInput}
    value={usrIn}
    style={{ width:  "100%", padding:  '5px' }}  />
    </Col>
    
    <Col  sm={3}>
    <Button  className="btn btn-info d-none d-sm-block form-control"  onClick={addItem}>Add Item</Button>
    <Button  className="btn btn-info d-block d-sm-none mt-4 form-control"  onClick={addItem}>Add Item</Button>
    </Col>
    
    </Row>


As you can see from code above, we declared a row, and within that row we have 2 cols declared. One for text input and the other for the button. Looking closer at the `<Col>` component you will see that we have passed a `sm={9}` and `sm={3}` props to it. This basically translates to `<div class="col-sm-9">` and `<div class="col-sm-3">` respectively.


### Step 4:

Now it is time to display the To Do list. For this, we will declare the list in a new row component.
Code:

    <Row className="mt-4">
    <Col sm>
    <Card>
    <Card.Header  className="bg-secondary text-white">Your To Do List</Card.Header>
    <ListGroup  variant="flush">
    {
    list.length > 0 ? (
    list.map(item  => {
    return (
    <ListGroup.Item  key={item.id}  className="d-flex flex-row justify-content-between">
    {item.value}
    <Button  className="btn btn-danger"  onClick={() =>  removeItem(item.id)}>
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

Here first thing you will notice is that in the `<Col>` we have a sm, but without the size. This means that the col will occupy the whole width of the view port. We use a card to contain all of our **To Do List** items and present the list items using the **ListGroup** component.

Rest of the coding and the functionality remains the same as that from lessons 1 & 2.

## Almost Done

Our React app is almost ready to run. If you have the server already running you should see some errors. This is because in reactjs, your component should return a single wrapper/element. For example a div tag.

Go ahead and wrap the whole contents of your `return()` function with an empty tag:
`<> </>`.


# Final

Your `app.js` file should now look like this:

    import  React, { useState } from  'react';
    import { Col, Container, Row, Button, Card, ListGroup, Navbar, Nav } from  'react-bootstrap';
    
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
    
    <>
    
    <Navbar  bg="dark"  expand="lg"  className="navbar-dark">
    
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
    
    <Container>
    
    <Row  className="mt-4 text-center">
    <Col className="text-center" sm={9}>
    <input
    type="text"
    id="inputTODO"
    name="inputTODO"
    placeholder="What do you like to do?"
    onChange={updateInput}
    value={usrIn}
    style={{ width:  "100%", padding:  '5px' }}  />
    </Col>
    <Col sm={3}>
    <Button  className="btn btn-info d-none d-sm-block form-control"  onClick={addItem}>Add Item</Button>
    <Button  className="btn btn-info d-block d-sm-none mt-4 form-control"  onClick={addItem}>Add Item</Button>
    </Col>
    </Row>
    
    <Row className="mt-4">
    <Col sm>
    <Card>
    <Card.Header  className="bg-secondary text-white">Your To Do List</Card.Header>
    <ListGroup  variant="flush">
    {
    list.length > 0 ? (
    list.map(item  => {
    return (
    <ListGroup.Item  key={item.id}  className="d-flex flex-row justify-content-between">
    {item.value}
    <Button  className="btn btn-danger"  onClick={() =>  removeItem(item.id)}>
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
    
    </Container>
    </>
    );
    };
    
    export  default  App;

### That's it. You can now refresh you browser and see the changes and differences. 

You will also notice that our app is now responsive to screen sizes.



## That is it for Lesson 3. See you in the next Lesson. 🙂