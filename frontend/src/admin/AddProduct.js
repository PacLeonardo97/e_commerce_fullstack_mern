import React, { useState, useEffect } from "react";
import Layout from "../Core/layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getCategories, createProduct } from "./apiAdmin";
import "./AddProduct.css";

const AddProduct = () => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: "",
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    category,
    categories,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  // load categories and set form data
  // load categories and set form data
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values ,error: "", loading: true });

    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values,error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          quantity: "",
          loading: false,
          createdProduct: data.name,
          error: false,
        });
      }
    });
  };


  

  

  
  //formulario para criação de produto
  const newPostForm = () => (
    <form onBlur={()=>setValues({...values, error:''})} className="mb-5" onSubmit={clickSubmit}>
      <h4 className="text-muted" id="photo">
        Post Photo
      </h4>
      <div className="form-group">
        <label htmlFor="photo" className="form-control">
          <input
            type="file"
            onChange={handleChange("photo")}
            name="photo"
            id="photo"
            accept="image"
            required
            className="form-control"
          />
        </label>
      </div>

      <div className="form-group">
        <label className="text-muted" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          onChange={handleChange("name")}
          value={name}
          className="form-control"
          placeholder="Product name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description" className="text-muted">
          Description
        </label>
        <textarea
          onChange={handleChange("description")}
          value={description}
          id="description"
          className="form-control"
          placeholder="Product description"
        />
      </div>

      <div className="form-group">
        <label htmlFor="price" className="text-muted">
          {" "}
          Price
        </label>
        <input
          type="number"
          onChange={handleChange("price")}
          value={price}
          className="form-control"
          placeholder="Price produt"
          id="price"
        />
      </div>

      <div className="form-group">
        <label htmlFor="category" className="text-muted">
          Category
        </label>
        <select
          type="text"
          onChange={handleChange("category")}
          value={category}
          className="form-control"
          id="category"
          required
        >
          <option>Choose one</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="shipping" className="text-muted">
          Shipping
        </label>
        <select
          type="text"
          id="shipping"
          onChange={handleChange("shipping")}
          value={shipping}
          className="form-control"
          required
        >
          <option>Choose one</option>
          <option defaultValue value="0">
            No
          </option>
          <option value="1">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="quantity" className="text-muted">
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          onChange={handleChange("quantity")}
          value={quantity}
          className="form-control"
          placeholder="Quantity of product"
        />
      </div>

      {showLoading()}
      {showError()}
      {showSuccess()}

      <button className="btn btn-outline-primary"> Create Product</button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {" "}
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: createdProduct ? "" : "none" }}
    >
      {" "}
      {`${createdProduct} is created`}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

  return (
    <Layout
      title="Add a new product"
      description={`${user.name}, criar um novo Produto?`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">{newPostForm()}</div>
      </div>
    </Layout>
  );
};

export default AddProduct;
