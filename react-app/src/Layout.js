import React, { useState, Fragment, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Navbar, Nav } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import { searchProduct } from "./redux/productsSlice";
import { useDispatch, useSelector } from "react-redux";

import { cartProduct } from "./redux/cartSlice";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const counter = 1;
  const email = localStorage.getItem("email");

  const [access, setAccess] = useState(false);
  //  QTY
  const qty = 0;

  useEffect(() => {
    const ref = {
      refresh: localStorage.getItem("refresh"),
    };
    axios
      .post("http://127.0.0.1:8000/auth/jwt/refresh/", ref, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setAccess(true);
      })
      .catch((err) => {
        // console.log(err)
        setAccess(false);
      });
  });

  // ------------------------Best Code--------------------------------

  const mail = localStorage.getItem("email");
  // const dispatch = useDispatch();
  const data = useSelector((state) => state.cartProduct.data);

  useEffect(() => {
    dispatch(cartProduct(mail));
  }, [dispatch]);

  // useEffect(() => {
  //   // console.log("data: ");
  //   // console.log(data);

  // }, [data]);

  // ------------------------Best Code--------------------------------

  const logOut = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("email");
    localStorage.removeItem("refresh");
    setAccess(false);
    navigate("/");
  };

  const cartCustomer = () => {
    navigate("/Cart");
  };

  return (
    <div>
      {access ? (
        <Fragment>
          <Navbar
            style={{ backgroundColor: "#0F334E" }}
            collapseOnSelect
            expand="lg"
            variant="dark"
          >
            <Container>
              <Navbar.Brand href="/"><h2>Ahmed Rashad</h2></Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link style={{ color: "white" }} href="/">
                    Home
                  </Nav.Link>
                  <Nav.Link style={{ color: "white" }} href="">
                    {email}
                  </Nav.Link>
                </Nav>

                <Nav>
                  <Nav.Link eventKey={2}>
                    <FontAwesomeIcon
                      onClick={cartCustomer}
                      style={{ color: "white", paddingRight: "4px" }}
                      icon={faCartShopping}
                      size={"1x"}
                    />
                    <span
                      style={{
                        color: "white",
                        paddingRight: "2px",
                        fontWeight: "bold",
                      }}
                    >
                      {data.length}
                    </span>
                  </Nav.Link>

                  {/* <div className="mt-1 text-center"> */}
                  <input
                    // onKeyUp={(e) => search(e.key)}
                    onChange={(e) => dispatch(searchProduct(e.target.value))}
                    type={"text"}
                    placeholder="search"
                  />
                  {/* </div> */}

                  <Nav.Link
                    style={{ color: "white" }}
                    onClick={logOut}
                    eventKey={2}
                    href="/"
                  >
                    Logout
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Fragment>
      ) : (
        <Fragment>
          <Navbar style={{ backgroundColor: "#0F334E" }} collapseOnSelect expand="lg" variant="dark">
            <Container>
              <Navbar.Brand href="/">Ahmed Rashad</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link style={{ color: "white" }} href="/">
                    Home
                  </Nav.Link>
                  <Nav.Link style={{ color: "white" }} href="/register">
                    Register
                  </Nav.Link>
                  <Nav.Link style={{ color: "white" }} href="/login">
                    Login
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Fragment>
      )}

      <Outlet />
    </div>
  );
};

export default Layout;
