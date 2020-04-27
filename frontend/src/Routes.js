import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Home from "./Core/Home";
import Shop from "./Core/Shop";
import Cart from "./Core/Cart";
import Product from "./Core/Product";
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import Dashboard from "./user/UserDashboard";
import Profile from "./user/Profile";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import Orders from "./admin/Order";
import ManageProducts from "./admin/ManageProducts";
import ManageCategory from "./admin/ManageCategory";
import TodoList from './todolist'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/signin" exact component={Signin} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/shop" exact component={Shop} />
      <Route path="/cart" exact component={Cart} />
      <Route path="/todolist" exact component={TodoList} />
      <Route path="/product/:productId" exact component={Product} />
      <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
      <PrivateRoute path="/profile/:userId" exact component={Profile} />
      <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
      <AdminRoute path="/create/category" exact component={AddCategory} />
      <AdminRoute path="/create/product" exact component={AddProduct} />
      <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
      <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory} />
      <AdminRoute path="/admin/products" exact component={ManageProducts} />
      <AdminRoute path="/admin/categories" exact component={ManageCategory} />
      <AdminRoute path="/admin/orders" exact component={Orders} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
