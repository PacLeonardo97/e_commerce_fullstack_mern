import React, { useState } from "react";
import Layout from "../Core/layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import './AddCategory.css'
import { createCategory } from "./apiAdmin";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  //destructure token and user from localstorage
  const { token, user } = isAuthenticated();

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  //enviar form
  const clickSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    //make request to API to create category
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
      }
    });
   
  };

  const newCategory = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted" style={{fontSize:20, fontWeight:"bolder"}}>Category name</label>
        <input
          className="form-control"
          onChange={handleChange}
          value={name}
          autoFocus
          required
          placeholder="Name of the new category"
        />
      </div>
      <button className="btn btn-outline-primary">Create Category</button>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return <h3 className="alert alert-info">New category created sucessfuly</h3>;
    }
  };

  const showError = () => {
    if (error) {
      return <h3 className="alert text-danger">Category should be unique</h3>;
    }
  };

  const goBack = () => 
    <div className="mt-5">
   <Link to="/admin/dashboard" className="text-warning"> <button type="button" className="btn btn-outline-danger"> Voltar ao menu</button></Link>
     
    </div>
  

  return (
    <Layout
      title="Add a new category"
      description={`Bem vindo ${user.name}`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showSuccess()}
          {showError()}
          {newCategory()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
