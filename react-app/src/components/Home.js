import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Button, Card, Container, Row, Col, Nav } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/productsSlice";
import { getItem } from "../redux/productsSlice";

import { cartProduct } from "../redux/cartSlice";

import Swal from "sweetalert2";

const Home = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.products);
  const item = useSelector((state) => state.products.item);

  const navigate = useNavigate();
  const [access, setAccess] = useState(false);

  const [emailAddress, setEmailAddress] = useState(0);

  const [customer, setCustomer] = useState([]);

  // const  [category, setCategory] = useState([]);

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
        if (res.data.access) {
          setAccess(true);
          dispatch(getProduct());
        }
      });

    axios
      .get(
        `http://127.0.0.1:8000/api/us/?search=${localStorage.getItem("email")}`
      )
      .then((res) => {
        setEmailAddress(res.data[0].id);
        setCustomer(res.data);
      });
    console.log("email address: " + emailAddress);

    // .catch((err) => setAccess(false));
    // console.log(category);
  }, [dispatch, item, setEmailAddress, emailAddress, setCustomer]);

  // -------------------------QTY---------------------------------------

  const mail = localStorage.getItem("email");
  // const dispatch = useDispatch();
  const data = useSelector((state) => state.cartProduct.data);

  useEffect(() => {
    dispatch(cartProduct(mail));
  }, [dispatch]);

  // -------------------------QTY---------------------------------------

  // --------------------------
  const getItemId = (id) => {
    dispatch(getItem(id));
    navigate("/viewProduct");
  };

  //  Error Here
  const addToCart = (productId) => {
    const obj = {
      customer: emailAddress,
      product: productId,
      complete: false,
      // qty: 1,
    };

    axios
      .post("http://127.0.0.1:8000/api/cart/", obj)
      .then((res) => {
        // Swal.fire('Cart Product','Product added successfully','success')
        // toast.success("Product added successfully");

        Swal.fire({
          customClass: {
            container: "swal-overlay",
            title: "title-color",
          },
          title: "Product added successfully",
          confirmButtonColor: "#113A58",
          width: 250,
          icon: "success",

          color: "#716add",
          background: "#fff ",
        });

        dispatch(cartProduct(mail));
      })
      .catch((err) => toast.error(err.message));
  };

  // ----------------------------------------------------------------

  const getCategory = (value) => {
    navigate("/category/" + value);
  };

  // -------------------------Pagination------------------------

  // -------------------------Pagination------------------------

  return (
    <div className="mt-2 p-1">
      {access ? (
        <Fragment>
          <nav>
            <Nav className="justify-content-center" activeKey="/home">
              <Nav.Item>
                <Nav.Link
                  className="link-shadow"
                  onClick={(e) => getCategory("Electronics")}
                  style={{
                    fontSize: "16px",
                    color: "#0F334E",
                    fontWeight: "bold",
                  }}
                >
                  Electronics
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  className="link-shadow"
                  onClick={(e) => getCategory("Fashion")}
                  style={{
                    fontSize: "16px",
                    color: "#0F334E",
                    fontWeight: "bold",
                  }}
                  eventKey="link-1"
                >
                  Fashion
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  className="link-shadow"
                  onClick={(e) => getCategory("Accessories")}
                  style={{
                    fontSize: "16px",
                    color: "#0F334E",
                    fontWeight: "bold",
                  }}
                  eventKey="link-2"
                >
                  Accessories
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  className="link-shadow"
                  onClick={(e) => getCategory("Furniture")}
                  style={{
                    fontSize: "16px",
                    color: "#0F334E",
                    fontWeight: "bold",
                  }}
                  eventKey="link-2"
                >
                  Furniture
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  className="link-shadow"
                  onClick={(e) => getCategory("Home Appliances")}
                  style={{
                    fontSize: "16px",
                    color: "#0F334E",
                    fontWeight: "bold",
                  }}
                  eventKey="link-2"
                >
                  Home Appliances
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  className="link-shadow"
                  onClick={(e) => getCategory("Toys")}
                  style={{
                    fontSize: "16px",
                    color: "#0F334E",
                    fontWeight: "bold",
                  }}
                  eventKey="link-2"
                >
                  Toys
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  className="link-shadow"
                  onClick={(e) => getCategory("Others")}
                  style={{
                    fontSize: "16px",
                    color: "#0F334E",
                    fontWeight: "bold",
                  }}
                  eventKey="link-2"
                >
                  Others
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </nav>

          <Container>
            <Row className="justify-content-center align-items-center">
              {product.map((value, index) => {
                return (
                  <Col className="mt-3" xs="auto" key={index}>
                    <Card
                      className="shadow-lg rounded hoverElement"
                      style={{ width: "15rem", borderRadius: 15 }}
                    >
                      <div className="text-center">
                        <Card.Img
                          style={{
                            height: "250px",
                            width: "230px",
                            padding: "5px",

                            // objectFit: "none",
                          }}
                          variant="top"
                          src={value.image}
                        />
                      </div>
                      <Card.Body>
                        <Card.Title
                          style={{
                            fontSize: "17px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {value.name}
                        </Card.Title>
                        <Card.Text
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {value.description}
                        </Card.Text>
                        <Card.Text>{value.price}$</Card.Text>

                        <div className="d-flex aligh-items-center justify-content-between">
                          <Button
                            onClick={() => getItemId(value.id)}
                            style={{ background: "#113A58" }}
                            variant="primary"
                          >
                            View
                          </Button>

                          <Button
                            onClick={() => addToCart(value.id)}
                            style={{ background: "#113A58" }}
                            variant="primary"
                          >
                            Add Cart
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </Fragment>
      ) : (
        <h4 style={{ textAlign: "center", marginTop: "10px", color: "#777" }}>
          You do not have permission, please login
        </h4>
      )}

      <ToastContainer />
    </div>
  );
};

export default Home;
