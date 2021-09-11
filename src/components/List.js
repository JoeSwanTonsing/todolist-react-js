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
