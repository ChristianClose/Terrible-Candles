import React, { useState, useEffect } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleBlur, handleChange, isInputEmpty } from "../../utils/form.utils";
import { useSelector } from 'react-redux';
import { createUser } from "../../redux/userSlice/userSlice";
import "./Signup.styles.css";

const SignupPage = ({ history }) => {
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });
    const { users, error } = useSelector(state => state.users);
    const user = users[0];
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isInputEmpty(state)) {
            alert("Please complete the required fields!");
        } else {
            dispatch(createUser(state));
        }
    };

    useEffect(() => {
        if (user) {
            history.push("/");
        }
    }, [user, history]);

    return (
        <Row align="center">
            <Col>
                <Container className="m-3 border w-75">
                    <h2 align="center">Sign up</h2>

                    <Form className="w-75" align="start">

                        <Form.Row>
                            <Form.Group as={Col} controlId="signupFormFirstName" required>
                                <Form.Label>*First Name</Form.Label>
                                <Form.Control
                                    placeholder="Enter First Name"
                                    onChange={(e) => handleChange(e, setState, state)}
                                    onBlur={handleBlur}
                                    name="firstName"
                                    required
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="signupFormLastName" required>
                                <Form.Label>*Last Name</Form.Label>
                                <Form.Control
                                    placeholder="Enter Last Name"
                                    onChange={(e) => handleChange(e, setState, state)}
                                    onBlur={handleBlur}
                                    name="lastName"
                                    required
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="signupEmail">
                            <Form.Label>*Email Address</Form.Label>
                            <Form.Control
                                placeholder="person@example.com"
                                onChange={(e) => handleChange(e, setState, state)}
                                onBlur={handleBlur}
                                name="email"
                                type="email"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="signupUsername">
                            <Form.Label>*Username</Form.Label>
                            <Form.Control
                                placeholder="Enter a username"
                                onChange={(e) => handleChange(e, setState, state)}
                                onBlur={handleBlur}
                                name="username"
                                required
                            />
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} controlId="signupFormPassword" required>
                                <Form.Label>*Password</Form.Label>
                                <Form.Control
                                    placeholder="Enter a password"
                                    onChange={(e) => handleChange(e, setState, state)}
                                    onBlur={handleBlur}
                                    name="password"
                                    type="password"
                                    required
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="signupFormConfirmPassword">
                                <Form.Label>*Confirm Password</Form.Label>
                                <Form.Control
                                    placeholder="Retype password"
                                    onChange={(e) => handleChange(e, setState, state)}
                                    onBlur={handleBlur}
                                    name="confirmPassword"
                                    type="password"
                                    required
                                />
                            </Form.Group>
                        </Form.Row>
                        <p>
                            <strong>*</strong>
                            <small> Designates a required field</small>
                        </p>

                        {error && <p><strong className="text-danger">{error}</strong></p>}
                        <Button
                            as={Link}
                            to="/payment"
                            type="submit"
                            className="mb-3"
                            onClick={handleSubmit}
                            onBlur={handleBlur}
                        >
                            Submit
                        </Button>
                    </Form>
                </Container>
            </Col>
        </Row>
    );
};

export default SignupPage;
