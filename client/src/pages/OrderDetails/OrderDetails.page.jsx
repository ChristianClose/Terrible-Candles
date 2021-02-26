import React, { useEffect } from "react";
import { Row, Col, Container, ListGroup, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getOrder } from "../../redux/ordersSlice/orderSlice";

const OrderDetailsPage = ({ match, history }) => {
  const { orders: order, loading } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const formatToUSD = (value) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  useEffect(() => {
    console.log(order);
    if (order.length === 0) {
      dispatch(getOrder(match.params.id));
    }
  }, [dispatch, order, match.params.id]);

  if (!loading && (order.length === 0 || !order.shipping)) {
    history.push("/");
    return <div>Loading....</div>;
  } else if (!loading) {
    const { shipping } = order;
    const {
      firstName,
      lastName,
      address,
      address2,
      city,
      state,
      zip,
    } = shipping;

    const customListGroup = (title, ...items) => (
      <ListGroup>
        <ListGroup.Item>
          <strong>{title}:</strong>
        </ListGroup.Item>
        {items.map((i) => (
          <ListGroup.Item key={`clg${title}`}>{i}</ListGroup.Item>
        ))}
      </ListGroup>
    );
    return (
      <div className="d-flex justify-content-between m-3" align="center">
        <Row md={3}>
          <Col>
            <Container className="m-3 p-3 border">
              <h2 align="center">Shipping To</h2>
              {customListGroup("Name", `${firstName} ${lastName}`)}
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
            <Container className=" ml-4 mr-3 my-3 p-3 border">
              <h2 align="center">Order Details</h2>
              {customListGroup("Order Number", order.orderId)}
              {customListGroup(
                "Paid",
                order.status === "COMPLETED" ? "Yes" : "No"
              )}
              {customListGroup(
                "Shipped",
                order.shipping.hasShipped ? "Yes" : "No"
              )}
              {customListGroup(
                "Delivered",
                order.shipping.isDelivered ? "Yes" : "No"
              )}
            </Container>
          </Col>
          <Col>
            <Container
              className="my-3 mr-3 p-3 border"
              align="center"
              style={{ width: "90%" }}
            >
              <h2 align="center">Ordered Items</h2>
              {order.items
                .slice()
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((item) => (
                  <Row
                    md={2}
                    key={`orderDetails${item._id}`}
                    as={ListGroup}
                    horizontal
                    align="center"
                    className="w-100 my-1"
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
                      <p style={{ marginTop: "25%" }}>
                        {`$${item.price} x  ${item.qty} = ${formatToUSD(
                          item.price * item.qty
                        )}`}
                      </p>
                    </Col>
                  </Row>
                ))}
              <Row className="w-100 mx-1">
                <Col
                  as={ListGroup.Item}
                  align="center"
                  className="border border-secondary"
                >
                  <strong className="h4">Total:</strong>
                </Col>
                <Col
                  as={ListGroup.Item}
                  align="center"
                  className="border border-secondary"
                >
                  <strong>{formatToUSD(order.total)}</strong>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </div>
    );
  } else {
    return <div>Loading...........</div>;
  }
};

export default OrderDetailsPage;
