import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { registerUser } from "../redux/actions/userActions";
import { useForm } from "react-hook-form";

const Register = ({ location, history }) => {
  const { register, handleSubmit, errors } = useForm();

  const dispatch = useDispatch();

  const onSubmit = ({ name, email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(registerUser(name, email, password));
    }
  };

  const [message, setMessage] = React.useState(null);

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  React.useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {loading && <Loader />}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="name"
            placeholder="Enter name"
            ref={register({ required: true })}
          ></Form.Control>
          {errors.name && <span className="error">This field is required</span>}
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            ref={register({ required: true })}
          ></Form.Control>
          {errors.email && <span className="error">This field is required</span>}
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Enter password"
            ref={register({ required: true })}
          ></Form.Control>
          {errors.password && <span className="error">This field is required</span>}
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            ref={register({ required: true })}
          ></Form.Control>
          {errors.confirmPassword && <span className="error">This field is required</span>}
        </Form.Group>
        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Register;
