import React from "react";
import { Row, Col, Container, ListGroup } from "react-bootstrap";
import Cart from "../../components/Cart/Cart.component";
import { useSelector, useDispatch } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";

const PaymentPage = ({ history }) => {
  const dispatch = useDispatch();
  const shipping = useSelector((globalState) => globalState.shippingAddress);
  const { address, address2, city, state, zip } = shipping;
  const cart = useSelector((globalState) => globalState.cart);
  const { subtotal } = cart;

  const postOrder = async (order) => {
    console.log(order);

    const details = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    };
    await fetch("/api/orders", details);
  };

  const handleSuccess = (details, data) => {
    const order = {
      items: cart.items,
      shipping,
      payer: {
        firstName: details.payer.name.given_name,
        lastName: details.payer.name.surname,
        email: details.payer.email_address,
        phone: details.payer.phone_number,
      },
      time: new Intl.DateTimeFormat("en-US", {
        dataStyle: "full",
        timeStyle: "long",
      }).format(new Date(details.update_time)),
      status: details.status,
      orderId: data.orderID,
    };
    postOrder(order);
    history.push(`/orders/${data.orderID}`);
  };

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
              onSuccess={(details, data) => handleSuccess(details, data)}
              debug
            />
          </Container>
        </Container>
      </Col>
    </Row>
  );
};

export default PaymentPage;
