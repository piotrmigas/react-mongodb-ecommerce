import React from "react";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../redux/actions/userActions";
import { listMyOrders } from "../redux/actions/orderActions";
import Meta from "../components/Meta";
import { useForm } from "react-hook-form";

const Profile = ({ history }) => {
  const [message, setMessage] = React.useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);

  const { loading, error, user } = userDetails;

  const userInfo = useSelector((state) => state.userLogin.userInfo);

  const success = useSelector((state) => state.userUpdateProfile.success);

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  React.useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = ({ password, confirmPassword, name, email }) => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <>
      <Meta title="Profile" />
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>
          {message && <Message variant="danger">{message}</Message>}
          {}
          {success && <Message variant="success">Profile Updated</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  defaultValue={user.name}
                  type="name"
                  placeholder="Enter name"
                  name="name"
                  ref={register({ required: true })}
                ></Form.Control>
                {errors.name && <span className="error">This field is required</span>}
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  defaultValue={user.email}
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  ref={register({ required: true })}
                ></Form.Control>
                {errors.email && <span className="error">This field is required</span>}
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  ref={register({ required: true })}
                ></Form.Control>
                {errors.password && <span className="error">This field is required</span>}
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  name="confirmPassword"
                  ref={register({ required: true })}
                ></Form.Control>
                {errors.confirmPassword && <span className="error">This field is required</span>}
              </Form.Group>
              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
          )}
        </Col>
        <Col md={9}>
          <h2>My Orders</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant="danger">{errorOrders}</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i className="fas fa-times" style={{ color: "red" }}></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i className="fas fa-times" style={{ color: "red" }}></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className="btn-sm" variant="light">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Profile;
