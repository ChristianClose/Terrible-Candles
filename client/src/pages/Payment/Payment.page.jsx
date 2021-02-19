import React, { useState } from "react";
import { Row, Col, Container, Form, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cart from "../../components/Cart/Cart.component";
import { useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";

const PaymentPage = () => {
  const { address, address2, city, state, zip } = useSelector(
    (state) => state.shippingAddress
  );
  const { items, subtotal } = useSelector((state) => state.cart);

  const customListGroup = (title, item) => (
    <ListGroup>
      <ListGroup.Item>
        <strong>{title}:</strong>
      </ListGroup.Item>
      <ListGroup.Item>{item}</ListGroup.Item>
    </ListGroup>
  );
  return (
    <Row md={2}>
      <Col>
        <Container className="m-3 p-3 border">
          <h2 align="center">Shipping</h2>
          {customListGroup("Address", address)}
          {address2 && customListGroup("Address 2", address2)}
          <Row>
            <Col>{customListGroup("City", city)}</Col>
            <Col>{customListGroup("State", state)}</Col>
            <Col>{customListGroup("Postal Code", zip)}</Col>
          </Row>
        </Container>
      </Col>
      <Col>
        <Container style={{ maxWidth: "40rem" }} className="mt-3">
          <Cart taxPercentage={0.1} />
          <Container className="mt-2">
            <PayPalButton
              amount={parseFloat((subtotal * 1.1).toFixed(2))}
              onSuccess={(details, data) => {
                alert(
                  "Transaction completed by " + details.payer.name.given_name
                );
              }}
              debug
            />
          </Container>
        </Container>
      </Col>
    </Row>
  );
};

export default PaymentPage;
