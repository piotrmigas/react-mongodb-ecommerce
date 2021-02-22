import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../redux/actions/productActions";
import { useForm } from "react-hook-form";

const ProductEdit = ({ match, history }) => {
  const productId = match.params.id;

  const { register, handleSubmit, errors } = useForm();

  const [image, setImage] = React.useState("");
  const [uploading, setUploading] = React.useState(false);
  const [countInStock, setCountInStock] = React.useState(0);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

  React.useEffect(() => {
    if (successUpdate) {
      dispatch({ type: "PRODUCT_UPDATE_RESET" });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setImage(product.image);
        setCountInStock(product.countInStock);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const onSubmit = ({ name, price, brand, category, description }) => {
    if (countInStock >= 0) {
      dispatch(
        updateProduct({
          _id: productId,
          name,
          price,
          image,
          brand,
          category,
          description,
          countInStock,
        })
      );
    }
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
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
                defaultValue={product.name}
                type="name"
                placeholder="Enter name"
                name="name"
                ref={register({ required: true })}
              ></Form.Control>
              {errors.name && <span className="error">This field is required</span>}
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                defaultValue={product.price}
                type="number"
                placeholder="Enter price"
                name="price"
                ref={register({ required: true })}
                step="0.01"
              ></Form.Control>
              {errors.price && <span className="error">This field is required</span>}
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                name="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                ref={register({ required: true })}
              ></Form.Control>
              {errors.image && <span className="error">This field is required</span>}
              <Form.File id="image-file" label="Choose File" custom onChange={uploadFileHandler}></Form.File>
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                defaultValue={product.brand}
                type="text"
                placeholder="Enter brand"
                name="brand"
                ref={register({ required: true })}
              ></Form.Control>
              {errors.brand && <span className="error">This field is required</span>}
            </Form.Group>
            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                type="number"
                placeholder="Enter countInStock"
                name="countInStock"
                ref={register({ required: true })}
              ></Form.Control>
              {errors.countInStock && <span className="error">This field is required</span>}
              {countInStock < 0 && <i style={{ float: "right", color: "red" }}>Please enter a valid Stock Count</i>}
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                defaultValue={product.category}
                type="text"
                placeholder="Enter category"
                name="category"
                ref={register({ required: true })}
              ></Form.Control>
              {errors.category && <span className="error">This field is required</span>}
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                defaultValue={product.description}
                type="text"
                placeholder="Enter description"
                name="description"
                ref={register({ required: true })}
              ></Form.Control>
              {errors.description && <span className="error">This field is required</span>}
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

export default ProductEdit;
