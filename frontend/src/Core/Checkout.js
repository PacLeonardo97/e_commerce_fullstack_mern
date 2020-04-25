import React, { useState, useEffect } from "react";
import {
  getBraintreeClientToken,
  processPayment,
  createOrder,
} from "./apiCore";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { emptyCart } from "./CartHelper";
import DropIn from "braintree-web-drop-in-react";

const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: "",
    address: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  //função clickar comprar após colocar as formasd e pagamento
  const buy = () => {
    setData({ loading: true });
    //send the nonce to your server
    // nonce = data.instance.requestPaymentMethod()
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        console.log(data);
        nonce = data.nonce;
        // once you have nonce, you basically have (card type, card number etc..) send nonce as 'paymentmethodnonce to the backend'
        //and also total to be charged
        // console.log(
        //   "send nonce and total to process: ",
        //   nonce,
        //   getTotal(products)
        // );

        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products)
      };

      processPayment(userId, token, paymentData)
          .then(response => {
              console.log(response);
              // empty cart
              // create order

              const createOrderData = {
                  products: products,
                  transaction_id: response.transaction.id,
                  amount: response.transaction.amount,
                  address: deliveryAdress
              };

              createOrder(userId, token, createOrderData)
                  .then(response => {
                      emptyCart(() => {
                          setRun(!run); // run useEffect in parent Cart
                          console.log('payment success and empty cart');
                          setData({
                              loading: false,
                              success: true
                          });
                      });
                    })
          .catch((error) => {
            console.log(error);
            setData({ loading: false });
          });
      })
      .catch((error) => {
        console.log("dropping error:", error);
        setData({ ...data, error: error.message });
      })
    })
  }
  

  const deliveryAdress = data.address

  const handleAdress = (event) => {
    setData({ ...data, address: event.target.value });
  };

  //mostrar as formas de pagamento e tudo mais
  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: "" })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <div className="form-group mb-3">
            <label className="text-muted">Delivery Adress:</label>
            <textarea
              onChange={handleAdress}
              className="form-control"
              value={data.address}
              placeholder="type delivery adress here"
            />
          </div>
          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: {
                flow: "vault",
              },
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button className="btn btn-success btn-block comprar" onClick={buy}>
            Checkout
          </button>
        </div>
      ) : null}
    </div>
  );

  //mostrar erro caso ocorra
  const showError = (error) => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = (loading) => loading && <h2>Loading...</h2>;

  const showSuccess = (success) => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Parabens, sua compra foi realizada com sucesso. Você receberá e-mail e
      whatsapp com as informações
    </div>
  );

  //   testando para pegar cep
  // //   const pegarEndereco = () => {
  //     return fetch(`http://ws.correios.com.br/calculador/CalcPrecoPrazo.json`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setCep(data);
  //       })
  //       .catch((error) => console.log(error));
  //   };

  //pegar o total de valor no carrinho
  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  //mostrar o botão de checkout caso a pessoa esteja logado
  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sign in to checkout</button>
      </Link>
    );
  };

  return (
    <div>
      <h2>Total:${getTotal()}</h2>
      {showLoading(data.loading)}
      {showError(data.error)}
      {showSuccess(data.success)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
