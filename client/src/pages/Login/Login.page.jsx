import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authUser } from "../../redux/userSlice/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.users);
  const [state, setState] = useState({ username: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authUser(state));
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form
      className="bg-light p-3 rounded"
      align="start"
      onSubmit={handleSubmit}
    >
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          placeholder="Enter username"
          name="username"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          placeholder="Enter password"
          name="password"
          type="password"
          onChange={handleChange}
        />
      </Form.Group>
      <Row>
        <Col>
          <Button type="submit" className="mx-auto">
            Login
          </Button>
        </Col>
        <Col>
          <Link to="/signup">Don't have an account?</Link>
        </Col>
      </Row>


      {error && <p className="mt-1 mb-0">Error: {error}</p>}
    </Form>
  );
};

export default Login;
