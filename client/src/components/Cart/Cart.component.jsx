import React from "react";
import { Col, ListGroup, Row, Image, Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const Cart = () => {
  const { items } = useSelector((state) => state.cart);

  return items.length === 0 ? (
    <Row md={1} className="bg-light ml-auto" style={{ width: "50vw" }}>
      <Col align="center">
        <h2 className="m-2 bg-light">Your cart is empty</h2>
      </Col>
    </Row>
  ) : (
    <Row md={1} className="bg-light">
      {items.map((item) => (
        <ListGroup
          horizontal
          key={"cartItem" + item._id}
          className="justify-content-center"
          align="center"
        >
          <ListGroup.Item className="w-100">
            <Col>
              <strong>{item.name}</strong>
              <Image src={item.image} thumbnail fluid />
            </Col>
          </ListGroup.Item>
          <ListGroup.Item
            className="w-100 justify-content-center"
            style={{ alignItems: "center", display: "flex" }}
          >
            <p>
              {`$${item.price} x ${item.qty} =
                ${(item.price * item.qty).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}`}
            </p>
          </ListGroup.Item>
        </ListGroup>
      ))}
      <Col className="m-0 p-0">
        <ListGroup horizontal align="center">
          <ListGroup.Item className="w-100">
            <h3>Total:</h3>
          </ListGroup.Item>
          <ListGroup.Item className="w-100">
            <h4>
              {items
                .reduce((acc, item) => (acc += item.price * item.qty), 0)
                .toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
            </h4>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  );
};

export default Cart;
