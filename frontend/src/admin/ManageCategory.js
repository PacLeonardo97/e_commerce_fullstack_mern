import React, { useState, useEffect } from "react";
import Layout from "../Core/layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getCategories, destroyCategory } from "./apiAdmin";

const ManageProducts = () => {
  const [categorias, setCategorias] = useState([]);
  const { user, token } = isAuthenticated();

  const carregarCategorias = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategorias(data);
      }
    });
  };

 

  const destroy = (categoryId) => {
    destroyCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        carregarCategorias()
        
      }
    });
  };

  useEffect(() => {
    carregarCategorias();
  }, []);
  return (
    <Layout
      title="Manage products"
      description="produtos"
      className="container-fluid"
    >

        <h4> Delete somente categorias sem nenhum produto cadastro, se não pode haver problemas em sua aplicação</h4>
      <div className="container">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Category Name</th>
              <th>Category delete</th>
              <th>View Product</th>
            </tr>
          </thead>
          {categorias.map((categ, i) => {
            return (
              <tbody key={i}>
                <tr>
                  <td>{categ.name.toUpperCase()}</td>
                  <td>
                    <button onClick={()=>destroy(categ._id)} className="btn btn-danger">Delete Category</button>
                  </td>
                  <td>
                    <button className="btn btn-danger"><Link to={"/admin/category/update/"+categ._id}>View Category</Link></button>
                  </td>
                </tr>
                {/* onClick={()=>destroy(p._id)} */}
              </tbody>
            );
          })}
        </table>
      </div>
    </Layout>
  );
};

export default ManageProducts;
