import React from 'react';
import { Row, Col, ListGroup, Card } from 'react-bootstrap';

export default function List({ items }) {
    return (
        <Row className="mt-4 mb-auto">
            <Col sm={12}>
                <Card>
                    <Card.Header className="bg-secondary text-white">Your To Do List  {items.length > 0 ? (
                        '- ' + items.length + ' Items'
                    ): null}</Card.Header>
                    <ListGroup variant="flush">
                        {
                            items.length > 0 ? (
                                items.map(item => {
                                    return (
                                        <ListGroup.Item key={item.id} className="d-flex flex-row justify-content-between">
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
