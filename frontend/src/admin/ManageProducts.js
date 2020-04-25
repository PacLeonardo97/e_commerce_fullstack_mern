import React, { useState, useEffect } from "react";
import Layout from "../Core/layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import {
  getProducts,
  deleteProduct,
  getProduct,
  updateProduct,
} from "./apiAdmin";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };
  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout
      title="Manage products"
      description="produtos"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
  <h2 className="text-center mb-2">Total Products: {products.length}</h2>
  <hr/>
          <div className="container">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Product view</th>
                <th>Product delete</th>

              </tr>
            </thead>
            {products.map((p, i) => {
              return (
                <tbody key={i}>
                  <tr >
                    <td >{(p.name).toUpperCase()}</td>
                    <td >{p.price}</td>
                    <td ><button className="btn btn-info"> <Link to={`/admin/product/update/${p._id}`}> View Product</Link></button></td>
                    <td ><button onClick={()=>destroy(p._id)} className="btn btn-danger">Delete Product</button></td>
                  </tr>
                </tbody>
              );
            })}
          </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
