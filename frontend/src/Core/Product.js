import React, { useState, useEffect } from "react";
import Layout from "./layout";
import { read, listRelated } from "./apiCore";
import Card from "./Card";

const Produt = (props) => {
  const [product, setProduct] = useState([]);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState("");

  const getProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        listRelated(data._id).then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    getProduct(productId);
  }, [props]);

  return (
    <Layout
      className="container-fluid"
      title="Product Page"
      description="Product details"
    >
      <h1 className="header"> Single Product </h1>
      <div className="row">
        <div className="col-8">
          {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )}
        </div>
        <div className="col-4">
          <h4>Related products</h4>
          {relatedProduct.map((p, i) => (
            <div  key={i} className="mb-3">
              <Card  product={p} />{" "}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Produt;
