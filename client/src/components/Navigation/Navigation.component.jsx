import React from "react";
import {
  Navbar,
  Nav,
  Button,
  Col,
  Row,
  Collapse,
  Container,
  ListGroup,
} from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Cart from "../Cart/Cart.component";
import { useSelector, useDispatch } from "react-redux";
import { isOpen } from "../../redux/cartSlice/cartSlice";

function Navigation(props) {
  const { location } = props;
  const { items, open } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const checkout = (
    <ListGroup align="center" className="w-100">
      <ListGroup.Item className="w-100">
        <Button
          as={Link}
          to="/checkout"
          className="w-75"
          onClick={() => dispatch(isOpen(false))}
        >
          Checkout
        </Button>
      </ListGroup.Item>
    </ListGroup>
  );

  return (
    <header>
      <Navbar bg="dark" expand="lg" variant="dark">
        <LinkContainer to="/">
          <Navbar.Brand>Terrible Candles</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
          <Nav activeKey={location.pathname} className="mr-auto">
            <LinkContainer exact to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/products">
              <Nav.Link>Products</Nav.Link>
            </LinkContainer>
          </Nav>

          <Col align="end" md={6}>
            <Button
              variant="dark"
              onClick={() => dispatch(isOpen(!open))}
              aria-controls="cart"
              aria-expanded={open}
            >
              <Container>
                <i className="fas fa-shopping-cart text-light" />
                <strong className="ml-1">
                  {items.reduce(
                    (acc, item) => parseInt(acc) + parseInt(item.qty),
                    0
                  )}
                </strong>{" "}
              </Container>
            </Button>
          </Col>
        </Navbar.Collapse>
      </Navbar>

      <Row className="justify-content-end mr-5">
        <Collapse in={open}>
          <Col
            id="cart"
            className="position-absolute"
            align="end"
            lg={2}
            style={{
              zIndex: 9999,
            }}
          >
            <Cart />
            {items.length !== 0 && checkout}
          </Col>
        </Collapse>
      </Row>
    </header>
  );
}

export default withRouter(Navigation);
