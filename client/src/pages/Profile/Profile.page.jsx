import React, { useState, useEffect } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from '../../redux/userSlice/userSlice';

const Checkout = ({ history }) => {
    const { loading, users, message } = useSelector(state => state.users);
    const user = users[0];
    const [state, setState] = useState({
        _id: "",
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
        if (!loading && user) {
            setState({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: "",
                confirmPassword: "",
            });
        }
    }, [history, user, loading]);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(state));
    };

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Row align="center">
            <Col>
                <Container className="m-3 border">
                    <h1 align="center">Edit Profile</h1>
                    <Container align="start">
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="profileFormFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        placeholder="Enter First Name"
                                        onChange={handleChange}
                                        name="firstName"
                                        value={state.firstName}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} controlId="profileFormLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        placeholder="Enter Last Name"
                                        onChange={handleChange}
                                        name="lastName"
                                        value={state.lastName}
                                    />
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="profileFormEmail">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    placeholder="name@example.com"
                                    onChange={handleChange}
                                    name="email"
                                    value={state.email}
                                />
                            </Form.Group>

                            <Form.Group controlId="profileFormPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    placeholder="Enter Password"
                                    onChange={handleChange}
                                    name="password"
                                    type="password"
                                    value={state.password}
                                />
                            </Form.Group>
                            <Form.Group controlId="profileFormConfirmPassword" required>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    onChange={handleChange}
                                    name="confirmPassword"
                                    type="password"
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
                        {message && (<p>{message}</p>)}
                    </Container>
                </Container>
            </Col>
        </Row>
    );
};

export default Checkout;
