import React, { useState, useEffect } from "react";
import Layout from "./layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import './Home.css'
import Search from "./Search";
import Menu from "./Menu";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState([]);
  const [run, setRun] = useState(false);


  const loadProductsBysell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBysell();

  }, [run]);

  return (
    <div>
        <Menu/>
      <Search />
      <h2 className="mb-5 h2-maisvendidos">Best Sellers</h2>
      <div className="row vendidosMais">
        {productsBySell.map((product, i) => (
          <div  key={i} className="col-4 mb-3 produtos_loja">
            
            <Card  product={product} setRun={setRun}  run={run}/>
             </div>
        ))}
      </div>
      <hr className="mb-2"/>
      <h2 className="mb-5">Last arrivals</h2>
      <div className="row vendidosMais">
        {productsByArrival.map((product, i) => (
            <div  key={i} className="col-4 mb-3">
            
            <Card  product={product} />
             </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
