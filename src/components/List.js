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
}
