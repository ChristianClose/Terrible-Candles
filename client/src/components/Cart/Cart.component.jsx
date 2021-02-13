import React, { useEffect } from "react";
import { Col, ListGroup, Row, Image, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <Row md={3} className="justify-content-end">
      <Col align="center" className="align-middle">
        {cart.map((item) => (
          <ListGroup horizontal>
            <ListGroup.Item className="w-100">
              <Col md={15}>
                <strong>{item.name}</strong>
                <Image src={item.image} thumbnail />
              </Col>
            </ListGroup.Item>
            <ListGroup.Item className="w-100">
              <p>${item.price}</p>
              <p>{item.qty}</p>
            </ListGroup.Item>
          </ListGroup>
        ))}
        {cart.length !== 0 && (
          <Row>
            <Col>
              <h3>
                Total:
                {cart
                  .reduce((acc, item) => (acc += item.price * item.qty), 0)
                  .toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
              </h3>
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default Cart;
