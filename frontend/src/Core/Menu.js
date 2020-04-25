import React, { useEffect } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./CartHelper";

const isActive = (pathname, path) => {
  if (window.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ pathname, history }) => {
  return (
    <>
      <div className="telefone">
        <div className="telefone-div">
          <span className="telefone-contato">Telefone:(019) 9199-9199</span>
        </div>
        <div className="redes">
          <button className="btn small mobile-button-rede">
            {" "}
            <span>
              <i className="fa fa-whatsapp icone-redes" style={{color:'green'}} aria-hidden="true"></i>
            </span>
          </button>
          <button className="btn mobile-button-rede">
            {" "}
            <span>
              <i className="fa fa-facebook-square icone-redes" style={{color:'darkblue'}} aria-hidden="true"></i>
            </span>
          </button>
          <button className="btn mobile-button-rede ">
            {" "}
            <span>
              <i className="fa fa-instagram icone-redes"style={{color:'black'}} aria-hidden="true"></i>
            </span>
          </button>
        </div>
      </div>
      <nav className="navbar navbar-light bg-primary menu_mobile">
        <ul className="nav nav-tabs bg-primary fixo ">
          <li className="nav-item justify-content-end">
            <Link className="nav-link" style={isActive(pathname, "/")} to="/">
              <h4 className="titulo-home">Food Shop</h4>
            </Link>
          </li>
        </ul>
        <ul className="nav nav-tabs bg-primary justify-content-end menu-mobilex">
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(pathname, "/shop")}
              to="/shop"
            >
              Shop
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(pathname, "/cart")}
              to="/cart"
            >
              <i className="fa fa-shopping-cart mr-2" aria-hidden="true"></i>
              <sup>
                <small className="cart-badge">{itemTotal()}</small>
              </sup>
            </Link>
          </li>

          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(pathname, "/user/dashboard")}
                to="/user/dashboard"
              >
                Dashboard
              </Link>
            </li>
          )}

          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(pathname, "/admin/dashboard")}
                to="/admin/dashboard"
              >
                Dashboard
              </Link>
            </li>
          )}

          {!isAuthenticated() && (
            <>
              <li className="nav-item">
                <Link
                  to="/signin"
                  style={isActive(pathname, "/signin")}
                  className="nav-link"
                >
                  Signin
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(pathname, "/signup")}
                  to="/signup"
                >
                  Signup
                </Link>
              </li>
            </>
          )}

          {isAuthenticated() && (
            <li className="nav-item nav_signout">
              <span
                className="nav-link signout"
                style={{ cursor: "pointer", color: "#ffffff" }}
                onClick={() =>
                  signout(() => {
                    history.push("/");
                  })
                }
              >
                Signout
              </span>
            </li>
          )}
        </ul>

        {/* quero sign, signup, logout, cart e dashboard na direita */}
      </nav>
    </>
  );
};

export default withRouter(Menu);
