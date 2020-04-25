import React, { useState, useEffect } from "react";
import Layout from "../Core/layout";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import { read, update, updateUser } from "./apiUser";

//para pegar o userId que está no rota, usamos o match.params.userId, q foi o que clickamos antes para acessar esta pagina
const Profile = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    success: false,
  });

  const { name, email, password, error, redirect, success } = values;
  const { token } = isAuthenticated();

  const init = (userId) => {
    // console.log(userId)
    setValues({...values, success:false})
    read(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          email: data.email,
          password: data.password,
          success: false,
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    update(match.params.userId, token, { name, email, password }).then(
      (data) => {
        if (data.error) {
          // console.log(data.error);
          setValues({ ...values, error: data.error });
        } else {
          updateUser(data, () => {
            setValues({
              ...values,
              name: data.name,
              email: data.email,
              success: true,
            });
          });
        }
      }
    );
  };

  const voltarMenu = () => (
    <button className="btn">
      <Link to="/user/dashboard">Voltar ao menu</Link>
    </button>
  );

  const profileUpdate = (name, email, password) => (
    <form onBlur={() => setValues({ ...values, error: "", success: false })}>
      <div className="form-group">
        <label className="text-muted">Novo nome de usuário</label>
        <input
          autoFocus
          type="text"
          onChange={handleChange("name")}
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Digite um novo email</label>
        <input
          type="email"
          onChange={handleChange("email")}
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Novo password</label>
        <input
          type="password"
          onChange={handleChange("password")}
          className="form-control"
          value={password}
        />
      </div>
      <button className="btn btn-primary" onClick={clickSubmit}>
        Submit
      </button>
    </form>
  );
  useEffect(() => {
    init(match.params.userId);
  }, []);

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

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Mudado com sucesso
    </div>
  );

  return (
    <Layout
      title="Profile"
      description="Update your profile"
      className="container-fluid"
    >
      {showError()}
      <h2 className="mb-4">Profile update</h2>
      {showSuccess()}
      {profileUpdate(name, email, password)}
      {voltarMenu()}
    </Layout>
  );
};

export default Profile;
