import React from "react";
import Layout from "../Core/layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";


const AdminDashboard = () => {
  //destruturar o que está em user:
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <div className="card linkings">
        <h4 className="card-header">User links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/create/category">
              Create Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/product">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/orders">
                View Orders
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/products">
                Manage Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/categories">
                Manage Categorys
            </Link>
          </li>
          
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className="card mb-5">
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

  // const purchaseHistory = () => (
  //   <div className="card mb-5">
  //     <h3 className="card-header">Purschase History</h3>
  //     <ul className="list-group">
  //       <li className="list-group-item">name</li>
  //     </ul>
  //   </div>
  // );
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
      <div className="row  user_dashboard">
        <div className="col-3 dashboard_admin">{adminLinks()}</div>
        <div className="col-9">{adminInfo()}</div>
      </div>
     
     
    </Layout>
  );
};

export default AdminDashboard;
