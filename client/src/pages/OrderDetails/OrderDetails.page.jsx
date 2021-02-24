import React, { useEffect } from "react";
import { Row, Col, Container, ListGroup, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../../redux/ordersSlice/orderSlice";

const OrderDetailsPage = ({ match }) => {
  const { orders, loading } = useSelector((state) => state.orders);
  const shipping = useSelector((globalState) => globalState.shippingAddress);
  const { address, address2, city, state, zip } = shipping;
  const dispatch = useDispatch();
  const order = orders.find((ord) => ord._id === match.params.id);

  const formatToUSD = (value) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const customListGroup = (title, ...items) => (
    <ListGroup>
      <ListGroup.Item>
        <strong>{title}:</strong>
      </ListGroup.Item>
      {items.map((i) => (
        <ListGroup.Item>{i}</ListGroup.Item>
      ))}
    </ListGroup>
  );
  return (
    <Row md={2}>
      <Col>
        <Container className="m-3 p-3 border">
          <h2 align="center">Shipping To</h2>
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
        <Container className="m-3 p-3 border">
          <h2 align="center">Order Details</h2>
          {loading && !order ? (
            <i className="fas fa-spinner fa-pulse" />
          ) : (
            <>
              {customListGroup("Order Number", order.orderId)}
              <Container>
                {order.items
                  .slice()
                  .sort((a, b) => (a.name > b.name ? 1 : -1))
                  .map((item) => (
                    <Row
                      md={3}
                      key={`orderDetails${item._id}`}
                      as={ListGroup}
                      horizontal
                    >
                      <Col as={ListGroup.Item} align="center">
                        <strong>{item.name}</strong>
                        <Image src={item.image} thumbnail fluid />
                      </Col>

                      <Col
                        className="w-100 justify-content-center"
                        align="center"
                        as={ListGroup.Item}
                      >
                        <strong>Total:</strong>
                        <p style={{ marginTop: "25%" }}>
                          {`$${item.price} x  ${item.qty} = ${formatToUSD(
                            item.price * item.qty
                          )}`}
                        </p>
                      </Col>
                    </Row>
                  ))}
              </Container>
            </>
          )}
        </Container>
      </Col>
    </Row>
  );
};

export default OrderDetailsPage;
