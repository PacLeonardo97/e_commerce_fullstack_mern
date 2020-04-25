import React, { useState, useEffect } from "react";
import Layout from "./layout";
import { getCategories, list } from "./apiCore";
import Card from "./Card";
import Logo from "../images/logo-removebg-preview.png";
import "./Search.css";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    error: "",
    search: "",
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched, error } = data;

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
        console.log(categories);
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    if (search || category) {
      list({ search: search || undefined, category: category }).then(
        (response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
    // console.log(search, category);
  };

  const searchedProducts = (results = []) => {
    return (
      <div>
        <h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2>

        <div className="row">
          <div className="col-4">
            {results.map((product, i) => (
              <Card key={i} product={product} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return `No products found`;
    }
  };

  
  const searchForm = () => (
    <form onSubmit={searchSubmit} className="form-search">
      <span className="input-group-text search1">
        <div className="input-group input-group-lg search2">
          <div className="input-group-apprend search3">
            <select
              className="form-control form-control-lg categoriaaa"
              onChange={handleChange("category")}
            >
              <option className="opcoes" value="All" className="opcao1">
                Choose category

              </option> 
              {categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name} 
                </option>
              ))}
            </select>
          </div>

          <input
            type="search"
            className="form-control searchin"
            onChange={handleChange("search")}
            placeholder="Search by name"
            
          />
        </div>
        <div className="buttondiv lupa">
          <button className="buttonsearch">
          <i class="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </span>
    </form>
  );

  return (
    <div className="row home-logo">
      <div className="logo-lado">
        <img className="img-logo" src={Logo} />
      </div>
      <div>
      </div>
      <div className="container mb-3 ml-3 mr-3 lago">{searchForm()}</div>
      <div className="container-fluid mb-3">{searchedProducts(results)}</div>
    </div>
  );
};
export default Search;
