import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Popup.css";

const Popup = () => {
  return (
    <div className="Added">
      <div>
        <i class="fa fa-check-circle-o" aria-hidden="true"></i>
      </div>

      <p>Product added to your cart.</p>
      <Link to="/cart">Cart</Link>
    </div>
  );
};

export default Popup;
