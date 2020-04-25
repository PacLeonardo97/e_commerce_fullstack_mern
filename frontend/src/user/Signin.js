import React, { useState } from "react";
import Layout from "../Core/layout";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth";

const Signin = () => {
  const [values, setValues] = useState({
    email: "testeadmin@hotmail.com",
    password: "teste123",
    error: "",
    loading: false,
    redirectToReference: false,
  });

  const { email, password, loading, error, redirectToReference } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });

    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReference: true,
          });
        });
      }
    });
  };

  const signupForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">E-mail</label>
        <input
          onChange={handleChange("email")}
          value={email}
          type="email"
          className="form-control"
          placeholder="Seu e-mail completo"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          value={password}
          type="password"
          className="form-control"
        />
      </div>
      <button className="btn btn-primary" type="submit" onClick={clickSubmit}>
        Submit
      </button>
    </form>
  );

  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>{" "}
      </div>
    );

  const redirectUser = () => {
    if (redirectToReference) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if(isAuthenticated()){
      return <Redirect to="/"/>
    }
  };

  return (
    <Layout
      title="Signin Page"
      description="Signin to Node React E-commerce"
      className="container col-md-8 offset-md-2"
    >
      {showError()}
      {showLoading()}
      {signupForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
