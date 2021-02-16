import React from "react";
import {
  Navbar,
  Nav,
  Button,
  Col,
  Row,
  Collapse,
  Container,
} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Cart from "../Cart/Cart.component";
import { useSelector, useDispatch } from "react-redux";
import { isOpen } from "../../redux/cartSlice/cartSlice";

function Navigation(props) {
  const { location } = props;
  const { items, open } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
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

      <Row
        className="justify-content-end ml-auto"
        align="end"
        style={{
          width: "50%",
        }}
      >
        <Collapse in={open}>
          <Col
            id="cart"
            className="position-absolute"
            align="end"
            md={3}
            style={{
              zIndex: 9999,
            }}
          >
            <Cart />
          </Col>
        </Collapse>
      </Row>
    </header>
  );
}

export default withRouter(Navigation);
