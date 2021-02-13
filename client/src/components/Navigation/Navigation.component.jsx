import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Button,
  Accordion,
  Col,
  Row,
  Collapse,
  Container,
} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Cart from "../Cart/Cart.component";

function Navigation(props) {
  const [open, setOpen] = useState(false);
  const { location } = props;
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
              eventKey="0"
              onClick={() => setOpen(!open)}
              aria-controls="cart"
              aria-expanded={open}
            >
              <i className="fas fa-shopping-cart text-light" />
            </Button>
          </Col>
        </Navbar.Collapse>
      </Navbar>

      <Row className="justify-content-end" align="end">
        <Collapse in={open}>
          <Col id="cart" className="" align="end" md={5}>
            <Cart />
          </Col>
        </Collapse>
      </Row>
    </header>
  );
}

export default withRouter(Navigation);
