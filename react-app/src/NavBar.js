import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Activation from "./components/Activation";
import Login from "./components/Login";
import Register from "./components/Register";
import Reset_Password from "./components/Reset_Password";
import Layout from "./Layout";
import Home from "./components/Home";
import Logout from "./components/Logout";
import Reset_Password_Confirm from "./components/Reset_Password_Confirm";

import ViewProduct from "./components/product/ViewProduct";
import Cart from "./components/product/Cart";
import Category from "./components/product/Category";



const NavBar = ({qty}) => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home  />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<Reset_Password />} />
            <Route
              path="/password/reset/confirm/:uid/:token"
              element={<Reset_Password_Confirm />}
            />
            <Route path="/activate/:uid/:token" element={<Activation />} />
            <Route path="/logout" element={<Logout />} />

            <Route path="/viewProduct" element={<ViewProduct />} />
            <Route path="/Cart" element={<Cart />} />

            <Route path="/Category/:name" element={<Category />} />

            <Route path="*" element={<p>Not Found</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default NavBar;
