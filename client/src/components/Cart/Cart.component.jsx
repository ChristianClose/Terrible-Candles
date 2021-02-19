import React from "react";
import {
  Col,
  ListGroup,
  Row,
  Image,
  Container,
  Button,
  Form,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, addItem } from "../../redux/cartSlice/cartSlice";

const Cart = ({ taxPercentage }) => {
  const dispatch = useDispatch();

  const { items, subtotal } = useSelector((state) => state.cart);

  const formatToUSD = (value) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const handleClick = (id) => dispatch(removeItem(id));

  const emptyCart = (
    <Row md={1} className="bg-light ml-auto">
      <Col align="center">
        <h2 className="m-2 bg-light">Your cart is empty</h2>
      </Col>
    </Row>
  );

  const cartBody = [...items]
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .map((item) => (
      <Row md={3} key={`cartItem${item._id}`} as={ListGroup} horizontal>
        <Col as={ListGroup.Item}>
          <strong>{item.name}</strong>
          <Image src={item.image} thumbnail fluid />
        </Col>

        <Col
          className="w-100 justify-content-center"
          style={{ alignItems: "center", display: "flex" }}
          as={ListGroup.Item}
        >
          <p>
            {`$${item.price} x `}
            <Form.Control
              size="sm"
              as="select"
              defaultValue={item.qty}
              value={item.qty}
              onChange={(e) => {
                console.log(e.target.value);
                dispatch(addItem({ ...item, qty: parseInt(e.target.value) }));
              }}
            >
              <option>5</option>
              <option>4</option>
              <option>3</option>
              <option>2</option>
              <option>1</option>
            </Form.Control>

            {`= ${formatToUSD(item.price * item.qty)}`}
          </p>
        </Col>
        <Col
          className="w-100 justify-content-center"
          as={ListGroup.Item}
          style={{ alignItems: "center", display: "flex" }}
        >
          <Button onClick={() => handleClick(item._id)}>Remove</Button>
        </Col>
      </Row>
    ));

  const cartSubtotal = (
    <Row md={2} as={ListGroup} horizontal>
      <Col as={ListGroup.Item}>
        <h3>Subtotal:</h3>
      </Col>

      <Col as={ListGroup.Item}>
        <h4>{formatToUSD(subtotal)}</h4>
      </Col>
    </Row>
  );

  const cartTotal = (
    <Row md={2} as={ListGroup} horizontal>
      <Col as={ListGroup.Item}>
        <h2>Total:</h2>
      </Col>

      <Col as={ListGroup.Item}>
        <h3>{formatToUSD(subtotal * (taxPercentage + 1))}</h3>
      </Col>
    </Row>
  );

  const cartTax = (
    <Row md={2} as={ListGroup} horizontal>
      <Col as={ListGroup.Item} align="center">
        <strong>Tax:</strong>
      </Col>
      <Col as={ListGroup.Item} align="center">
        <strong>{`+${formatToUSD(subtotal * taxPercentage)}`} </strong>
      </Col>
    </Row>
  );

  return items.length === 0 ? (
    emptyCart
  ) : (
    <Row md={1} className="bg-light">
      <ListGroup className="justify-content-center" align="center">
        {cartBody}
        {cartSubtotal}
        {taxPercentage && cartTax}
        {taxPercentage && cartTotal}
      </ListGroup>
    </Row>
  );
};

export default Cart;
