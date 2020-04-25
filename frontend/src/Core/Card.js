import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./CartHelper";
import { isAuthenticated } from "../auth";
import Popup from "./Popup/Popup";
import { testeCree, addItemCart } from "../admin/apiAdmin";

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCart = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f,
  run = undefined,
}) => {
  const [testeProduto, setTesteProduto] = useState([])
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  const [isOnline, setIsOnline] = useState(isAuthenticated());
  const [open, setOpen] = useState(false);

  // const {email} = user
  // const addToCart = () => {
  //   if (isAuthenticated()) {
  //     addItem(product, () => {
  //       setRun(!run);
  //       setOpen(true);
  //       setTimeout(() => {
  //         setOpen(false);
  //       }, 3000);
  //     });
  //   } else {
  //     setRedirect(true);
  //   }
  // };

  const adicionarCarrinho = () => {
    if(isAuthenticated()){
      addItemCart(product._id, user._id, token, product).then(data => {
        if(data.error){
          console.log(data.error)
        } else {
          console.log(data)
        }
      })

    }
  }

  const { user, token } = isAuthenticated();

  const showModal = () => {
    if (open === true) {
      return (
        <div>
          <Popup />
        </div>
      );
    }
  };

  const shouldRedirect = (redirect) => {
    if (redirect) return <Redirect to="/signin" />;
  };

  const showViewButton = (showViewProductButton) => {
    // const productLançado = {
    //   product_name: product.name,
    //   product_id: product._id,
    //   product_quantit:product.quantity
    // };
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`}>
        <button
          className="btn btn-outline-primary mt-2 mb-2 mr-3"
        >
          View Product
        </button>
          </Link>
        // </Link>
        )
        );
  };

  const showAddToCartButton = (showAddToCart) => {
    return (
      showAddToCart && (
        <button
          onClick={adicionarCarrinho}
          className="btn btn-outline-info mt-2 mb-2 mr-3"
        >
          Add Product
        </button>
      )
    );
  };
  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            if (window.confirm("Remover Produto?")) removeItem(product._id); // run useEffect in parent Cart
            // removeItem(product._id);
            setRun(!run);
          }}
          className="btn btn-outline-danger mt-2 mb-2 mr-3"
        >
          Remove Item
        </button>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">
        In stock {quantity}
        {JSON.stringify(product._id)}
      </span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of stock</span>
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run);
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) =>
    cartUpdate && (
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Adjust quantity:</span>
        </div>
        <input
          type="number"
          className="form-control"
          value={count}
          onChange={handleChange(product._id)}
        />
      </div>
    );

  return (
    <div className="card produto_card">
      <h3 className="card-header name">{product.name}</h3>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <ShowImage item={product} url="product" />
        <p>{product.description.substring(0, 100)}</p>
        <p className="black-10">$ {product.price}</p>
        <p className="black-9">Category: {product.category.name}</p>
        <p className="black-8">
          Added on {moment(product.createdAt).fromNow()}
        </p>

        {showViewButton(showViewProductButton)}
        {open && showModal()}
        {showRemoveButton(showRemoveProductButton)}
        {showStock(product.quantity)}

        <br />
        {product.quantity > 0 ? (
          showAddToCartButton(showAddToCart)
        ) : (
          <button
            className="btn btn-danger"
            onClick={() => alert("Produto fora de estoque")}
          >
            Produto sem estoque
          </button>
        )}
        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
};

export default Card;
