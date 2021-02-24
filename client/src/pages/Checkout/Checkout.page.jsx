import React, { useState } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cart from "../../components/Cart/Cart.component";
import { setAddress } from "../../redux/shippingSlice/shippingSlice";
import { useDispatch } from "react-redux";
import { handleBlur, handleChange, isInputEmpty } from "./utils/checkout.utils";
import "./Checkout.styles.css";

const Checkout = ({ history }) => {
  const [state, setState] = useState({
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isInputEmpty(state, ["address2"])) {
      alert("Please complete the required fields!");
    } else {
      dispatch(setAddress(state));
      history.push("/payment");
    }
  };

  return (
    <Row md={2}>
      <Col>
        <Container className="m-3 border">
          <h2 align="center">Shipping</h2>

          <Form>
            <Form.Group controlId="checkoutAddress">
              <Form.Label>*Address</Form.Label>
              <Form.Control
                placeholder="1234 Main St"
                onChange={(e) => setState(handleChange(e, state))}
                onBlur={handleBlur}
                name="address"
                required
              />
            </Form.Group>

            <Form.Group controlId="checkoutAddress2">
              <Form.Label>Address 2</Form.Label>
              <Form.Control
                placeholder="Apartment, studio, or floor"
                onChange={(e) => setState(handleChange(e, state))}
                name="address2"
              />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="checkoutFormCity" required>
                <Form.Label>*City</Form.Label>
                <Form.Control
                  placeholder="Enter City"
                  onChange={(e) => setState(handleChange(e, state))}
                  onBlur={handleBlur}
                  name="city"
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="checkoutFormState">
                <Form.Label>*State</Form.Label>
                <Form.Control
                  placeholder="Enter State"
                  onChange={(e) => setState(handleChange(e, state))}
                  onBlur={handleBlur}
                  name="state"
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="checkoutFormZip">
                <Form.Label>*Postal Code</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Postal Code"
                  onChange={(e) => setState(handleChange(e, state))}
                  onBlur={handleBlur}
                  name="zip"
                  required
                />
              </Form.Group>
            </Form.Row>
            <p>
              <strong>*</strong>
              <small> Designates a required field</small>
            </p>
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
