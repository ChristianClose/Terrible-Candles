import React, { useState, useEffect } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Checkout = ({ history }) => {
    const { loading, users } = useSelector(state => state.users);
    const user = users[0];
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        if (!user && !loading) {
            history.push("/");
        }
        if (!loading) {
            setState({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: "",
                confirmPassword: "",
            });
        }
    }, [history, user]);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleChange = () => {

    };
    return (
        <Row md={2}>
            <Col>
                <Container className="m-3 border">
                    <h1 align="center">Edit Profile</h1>
                    <Container>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="profileFormFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        placeholder="Enter First Name"
                                        onChange={(e) => setState(handleChange(e, state))}
                                        name="firstName"
                                        value={state.firstName}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} controlId="profileFormLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        placeholder="Enter Last Name"
                                        onChange={(e) => setState(handleChange(e, state))}
                                        name="lastName"
                                        value={state.lastName}
                                    />
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="profileFormEmail">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    placeholder="name@example.com"
                                    onChange={(e) => setState(handleChange(e, state))}
                                    name="email"
                                    value={state.email}
                                />
                            </Form.Group>

                            <Form.Group controlId="profileFormPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    placeholder="Enter Password"
                                    onChange={(e) => setState(handleChange(e, state))}
                                    name="address2"
                                    value={state.password}
                                />
                            </Form.Group>
                            <Form.Group controlId="profileFormConfirmPassword" required>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    onChange={(e) => setState(handleChange(e, state))}
                                    name="city"
                                    placeholder="Confirm Password"
                                    value={state.confirmPassword}
                                />
                            </Form.Group>

                            <Button
                                as={Link}
                                to="/payment"
                                type="submit"
                                className="mb-3"
                                onClick={handleSubmit}
                            >
                                Submit
                        </Button>
                        </Form>
                    </Container>
                </Container>
            </Col>
        </Row>
    );
};

export default Checkout;
