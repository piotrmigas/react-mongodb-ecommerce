import React from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { getUserDetails, updateUser } from "../redux/actions/userActions";
import { useForm } from "react-hook-form";

const UserEdit = ({ match, history }) => {
  const userId = match.params.id;
  const [isAdmin, setIsAdmin] = React.useState(false);

  const { register, handleSubmit, errors } = useForm();

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

  React.useEffect(() => {
    if (successUpdate) {
      dispatch({ type: "USER_UPDATE_RESET" });
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, history, userId, user, successUpdate]);

  const onSubmit = ({ name, email }) => {
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
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
            <Form.Group controlId="isadmin">
              <Form.Check
                defaultValue={user.isAdmin}
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEdit;
