import React, { useEffect, useState } from "react";
import Layout from "../Core/layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser";
import moment from "moment";

const UserDashboard = () => {
  const [history, setHistory] = useState([]);

  //destruturar o que está em user:
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();
  const token = isAuthenticated().token;

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, []);

  const userLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">User links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/cart">
              My cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to={`/profile/${_id}`}>
              Change profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className="card mb-5 linkings">
        <h3 className="card-header">User information</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">
            {" "}
            {role === 1 ? "Admin" : "Register User"}
          </li>
        </ul>
      </div>
    );
  };

  const purchaseHistory = (history) => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Purchase history</h3>
        <ul className="list-group">
          <li className="list-group-item">
            {history.map((h, i) => {
              return (
                <div className="container" key={i}>
                  <h3>Total Amount: R${h.amount}</h3>
                  <h4>Status do pedido: {h.status}</h4>
              <p>Id do pedido: {h._id}</p>
                  <hr />
                  {h.products.map((p, i) => {
                    return (
                      <div key={i}>
                        <h6><strong>Product name: {p.name}</strong></h6>
                        <h6>Product price: ${p.price}</h6>
                        <h6>Purchased date: {moment(p.createdAt).fromNow()}</h6>
                        <hr/>
                      </div>
            
                    );
                  })}
                </div>
              );
            })}
          </li>
        </ul>
      </div>
    );
  };

  const time = () => {
    const hour = new Date().toLocaleDateString();
    return hour;
  };

  return (
    <Layout
      title="Dashboard"
      description={`Bem vindo ${
        name[0].toUpperCase() + name.substring(1).toLowerCase()
      } ! ${time()}`}
      className="container-fluid"
    >
      <div className="row user_dashboard">
        <div className="col-3 linkings">{userLinks()}</div>
        <div className="col-9 linkings">
          {userInfo()}
          {purchaseHistory(history)}
          {console.log(history)}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
