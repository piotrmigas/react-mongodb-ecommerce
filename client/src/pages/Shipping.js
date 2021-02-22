import React from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../redux/actions/cartActions";
import { useForm } from "react-hook-form";

const Shipping = ({ history }) => {
  const shippingAddress = useSelector((state) => state.cart.shippingAddress);

  const { register, handleSubmit, errors } = useForm();

  const dispatch = useDispatch();

  const onSubmit = ({ address, city, postalCode, country }) => {
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            defaultValue={shippingAddress.address}
            type="text"
            placeholder="Enter address"
            name="address"
            ref={register({ required: true })}
          ></Form.Control>
          {errors.address && <span className="error">This field is required</span>}
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            defaultValue={shippingAddress.city}
            type="text"
            placeholder="Enter city"
            name="city"
            ref={register({ required: true })}
          ></Form.Control>
          {errors.city && <span className="error">This field is required</span>}
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            defaultValue={shippingAddress.postalCode}
            type="text"
            placeholder="Enter postal code"
            name="postalCode"
            ref={register({ required: true })}
          ></Form.Control>
          {errors.postalCode && <span className="error">This field is required</span>}
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            defaultValue={shippingAddress.country}
            type="text"
            placeholder="Enter country"
            name="country"
            ref={register({ required: true })}
          ></Form.Control>
          {errors.country && <span className="error">This field is required</span>}
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Shipping;
