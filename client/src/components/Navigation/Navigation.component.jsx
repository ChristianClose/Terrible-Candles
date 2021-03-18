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
import Login from "../../pages/Login/Login.page";
import { setLoginOpen, logout } from "../../redux/userSlice/userSlice";

function Navigation({ location, history }) {
  const { items, open: openCart } = useSelector((state) => state.cart);
  const { open: openLogin, users } = useSelector((state) => state.users);
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
          <Row className="align-items-middle" md={3}>
            <Col align="center">
              {!users[0] ? (
                <Button
                  variant="dark"
                  onClick={() => dispatch(setLoginOpen())}
                  aria-controls="login"
                  aria-expanded={openLogin}
                >
                  Login
                </Button>
              ) : (
                  <Button
                    variant="dark"
                    onClick={() => dispatch(setLoginOpen())}
                    aria-controls="userOptions"
                    aria-expanded={openLogin}
                  >
                    {users[0].username}
                  </Button>
                )}
            </Col>

            <Col align="center">
              {!users[0] && <Button as={Link} to="/signup" variant="dark">Signup</Button>}
            </Col>

            <Col align="center">
              <Button
                variant="dark"
                onClick={() => dispatch(isOpen(!openCart))}
                aria-controls="cart"
                aria-expanded={openCart}
              >
                <i className="fas fa-shopping-cart text-light" >
                  <strong className="ml-1">
                    {items.reduce(
                      (acc, item) => parseInt(acc) + parseInt(item.qty),
                      0
                    )}
                  </strong>
                </i>
              </Button>
            </Col>
          </Row>
        </Navbar.Collapse>
      </Navbar>

      <Row className="justify-content-end">
        <Collapse in={openCart}>
          <Col
            id="cart"
            className="position-absolute"
            align="end"
            lg={2}
            style={{
              zIndex: 9998,
            }}
          >
            <Cart />
            {items.length !== 0 && checkout}
          </Col>
        </Collapse>

        <Collapse in={!users[0] ? openLogin : false}>
          <Col
            id="login"
            className="position-absolute"
            align="end"
            lg={2}
            style={{
              zIndex: 9999,
            }}
          >
            <Login />
          </Col>
        </Collapse>

        <Collapse in={users[0] ? openLogin : false} align="center">
          <Col
            id="userOptions"
            className="position-absolute p-3 bg-light p-3 rounded"
            md={2}
            style={{
              zIndex: 9999,
            }}
          >
            <Container style={{ display: "flex", justifyContent: "space-between" }} align="center">
              <Button
                as={Link}
                to="/profile"
                variant="secondary">
                Profile
              </Button>
              <Button onClick={() => {
                dispatch(logout());
                history.push("/");
              }}>Logout</Button>
            </Container>
          </Col>
        </Collapse>
      </Row>
    </header>
  );
}

export default withRouter(Navigation);
