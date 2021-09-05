import React, { useState } from 'react';
import { Col, Container, Row, Button, Card, ListGroup, Navbar, Nav } from 'react-bootstrap';


function App() {
    const [usrIn, setUsrIn] = useState('');
    const [list, setList] = useState([]);

    function addItem() {
        if (usrIn !== '') {
            const newItem = {
                id: Math.random(),
                value: usrIn
            }

            const newlist = [...list];
            newlist.push(newItem);
            setList(newlist);
            setUsrIn('');
        }
    }

    function updateInput(event) {
        setUsrIn(event.target.value);
    }

    function removeItem(key) {
        const currentList = [...list];
        const updatedList = currentList.filter(item => item.id !== key);

        setList(updatedList);
    }

    return (
        <>
            <Navbar bg="dark" expand="lg" className="navbar-dark">
                <Container>
                    <Navbar.Brand href="" className="text-light">To Do List</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="ml-auto">
                        <Nav className="ml-auto">
                            <Nav.Link target="_blank" href="https://github.com/JoeSwanTonsing/todolist-react-js/tree/Lesson3-WithBootstrap4" className="text-light">Visit The GitHub Repo</Nav.Link>
                            <Nav.Link href="" className="text-secondary">Demo By React JS R&amp;D Team</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                <Row className="mt-4 text-center">
                    <Col className="text-center" sm={9}>
                        <input
                            type="text"
                            id="inputTODO"
                            name="inputTODO"
                            placeholder="What do you like to do?"
                            onChange={updateInput}
                            value={usrIn}
                            style={{ width: "100%", padding: '5px' }} />
                    </Col>
                    <Col sm={3}>
                        <Button className="btn btn-info d-none d-sm-block form-control" onClick={addItem}>Add Item</Button>
                        <Button className="btn btn-info d-block d-sm-none mt-4 form-control" onClick={addItem}>Add Item</Button>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col sm>
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

            </Container>
        </>
    );
};

export default App;
