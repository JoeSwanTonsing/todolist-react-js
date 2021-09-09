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
                target="_blank"
                href="https://github.com/JoeSwanTonsing/todolist-react-js/tree/Lesson3-WithBootstrap4"
                className="text-light"
              >
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
