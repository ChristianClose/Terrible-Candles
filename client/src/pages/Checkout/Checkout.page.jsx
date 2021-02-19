import React, { useState } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cart from "../../components/Cart/Cart.component";
import { setAddress } from "../../redux/shippingSlice/shippingSlice";
import { useDispatch } from "react-redux";
import "./Checkout.styles.css";

const Checkout = ({ history }) => {
  const [state, setState] = useState({});
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { address, city, zip } = state;

    if (address && city && state.state && zip) {
      dispatch(setAddress(state));
      history.push("/payment");
    } else {
      alert("Address, city, state, and zip code are required!");
    }
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    if (e.target.value === "") {
      e.target.classList.add("bg-danger", "formPlaceHolder");
      e.target.placeholder = e.target.placeholder.split("*Required* ")[1]
        ? "*Required* " + e.target.placeholder.split("*Required* ")[1]
        : "*Required* " + e.target.placeholder;
      //e.target.classList.add("text-light");
    } else {
      e.target.classList.remove("bg-danger", "formPlaceHolder");
    }
  };

  return (
    <Row md={2}>
      <Col>
        <Container className="m-3 border">
          <h2 align="center">Shipping</h2>

          <Form>
            <Form.Group controlId="checkoutAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                placeholder="1234 Main St"
                onChange={handleChange}
                onBlur={handleBlur}
                name="address"
                required
              />
            </Form.Group>

            <Form.Group controlId="checkoutAddress2">
              <Form.Label>Address 2</Form.Label>
              <Form.Control
                placeholder="Apartment, studio, or floor"
                onChange={handleChange}
                name="address2"
              />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="checkoutFormCity" required>
                <Form.Label>City</Form.Label>
                <Form.Control
                  placeholder="Enter City"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="city"
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="checkoutFormState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  placeholder="Enter State"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="state"
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="checkoutFormZip">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Postal Code"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="zip"
                  required
                />
              </Form.Group>
            </Form.Row>
            <Button
              as={Link}
              to="/payment"
              type="submit"
              className="mb-3"
              onClick={handleSubmit}
              onBlur={handleBlur}
            >
              Continue to Payment
            </Button>
          </Form>
        </Container>
      </Col>
      <Col>
        <Container style={{ maxWidth: "40rem" }} className="mt-3">
          <Cart />
        </Container>
      </Col>
    </Row>
  );
};

export default Checkout;
