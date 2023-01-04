import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { getItem } from "../../redux/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

import { cartProduct } from "../../redux/cartSlice";

import Swal from "sweetalert2";

const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const item = useSelector((state) => state.products.item);

  const { name } = useParams();
  const [allData, setAllData] = useState([]);
  const [emailAddress, setEmailAddress] = useState(0);

  useEffect(() => {
    // console.log(name);
    axios
      .get(`http://127.0.0.1:8000/api/products/?category=${name}`)
      .then((response) => {
        setAllData(response.data);
      })
      .catch((err) => toast.error(err.message));

    axios
      .get(
        `http://127.0.0.1:8000/api/us/?search=${localStorage.getItem("email")}`
      )
      .then((res) => {
        setEmailAddress(res.data[0].id);
      });
    console.log("email address: " + emailAddress);
  }, [emailAddress]);

  // -------------------------QTY-----------------------------

  const mail = localStorage.getItem("email");
  // const dispatch = useDispatch();
  const data = useSelector((state) => state.cartProduct.data);

  useEffect(() => {
    dispatch(cartProduct(mail));
  }, [dispatch]);

  // -------------------------QTY-----------------------------
  const getItemId = (id) => {
    dispatch(getItem(id));
    navigate("/viewProduct");
  };

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
        // toast.success("Product added successfully");

        Swal.fire({
          customClass: {
            container: "swal-overlay",
            title:'title-color'
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

  return (
    <div>
      <Fragment>
        <h3 style={{ textAlign: "center", marginTop: "5px", color: "#777" }}>
          {name}
        </h3>
      </Fragment>

      <Fragment>
        <Container>
          <Row className="justify-content-center align-items-center">
            {allData.map((value, index) => {
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
      <ToastContainer />
    </div>
  );
};

export default Category;
