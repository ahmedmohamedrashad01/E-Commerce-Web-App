import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { cartProduct } from "../../redux/cartSlice";
import axios from "axios";

// import GooglePayButton from './GooglePayButton';
import GooglePayButton from "@google-pay/button-react";

const Cart = () => {
  const mail = localStorage.getItem("email");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cartProduct.data);

  useEffect(() => {
    console.log("hello");
    dispatch(cartProduct(mail));
  }, [dispatch]);

  // ---------------------------Comment ------------------------------

  // useEffect(() => {
  //   // console.log("data: ");
  //   // console.log(data);

  // }, [data]);

  // ---------------------------Comment ------------------------------

  const deleteProduct = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/cart/${id}/`)
      .then((res) => {
        toast.success("Product Has Been Deleted");
        dispatch(cartProduct(mail));
      })
      .catch((err) => toast.error(err));
  };

  // __________________Send Email ___________________

  const sendMail = (pro, mail) => {
    axios
      .get(`http://127.0.0.1:8000/send/${pro}/${mail}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response));
  };
  // __________________Send Email ___________________

  return (
    <div>
      <Container className="">
        <Row className="justify-content-center align-items-center">
          <h3 className="text-center mt-2 text-muted">Cart Products</h3>
          {/* <h2 className="text-center p-1">Quantity: {data.length}</h2> */}
          {data.map((item, index) => {
            return (
              <Col className="mt-3" xs="auto" key={index}>
                <Card
                  style={{ width: "17rem", borderRadius: 15 }}
                  className="shadow-lg rounded hoverElement"
                >
                  <Card.Img
                    style={{
                      height: "300px",
                    }}
                    variant="top"
                    src={"http://127.0.0.1:8000" + item.product.image}
                  />

                  <Card.Body>
                    <Card.Title
                      style={{
                        fontSize: "17px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      className="fw-bold"
                    >
                      {item.product.name}
                    </Card.Title>
                    <Card.Text className="fw-bold">
                      Price: {item.product.price}
                    </Card.Text>
                    <Card.Text className="fw-bold">Qty: {item.qty}</Card.Text>

                    <div className="text-center">
                      <Button
                        onClick={() => deleteProduct(item.id)}
                        style={{
                          background: "#113A58",
                          width: "100%",
                          marginBottom: "5px",
                        }}
                        variant="primary"
                      >
                        Delete
                      </Button>

                      <Button
                        onClick={() => sendMail(item.product.name, mail)}
                        style={{
                          background: "#113A58",
                          width: "100%",
                          marginBottom: "5px",
                        }}
                        variant="primary"
                      >
                        Send Email
                      </Button>

                      {/* ----------------------- */}

                      {/* <Button
                        onClick={() =>
                          toast.success("Payment Completed Successfully")
                        }
                        style={{ background: "#113A58" }}
                        variant="primary"
                      >
                        Payment
                      </Button> */}

                      <GooglePayButton
                        environment="TEST"
                        paymentRequest={{
                          apiVersion: 2,
                          apiVersionMinor: 0,
                          allowedPaymentMethods: [
                            {
                              type: "CARD",
                              parameters: {
                                allowedAuthMethods: [
                                  "PAN_ONLY",
                                  "CRYPTOGRAM_3DS",
                                ],
                                allowedCardNetworks: ["MASTERCARD", "VISA"],
                              },
                              tokenizationSpecification: {
                                type: "PAYMENT_GATEWAY",
                                parameters: {
                                  gateway: "example",
                                  gatewayMerchantId: "exampleGatewayMerchantId",
                                },
                              },
                            },
                          ],
                          merchantInfo: {
                            merchantId: "12345678901234567890",
                            merchantName: "Demo Merchant",
                          },
                          transactionInfo: {
                            totalPriceStatus: "FINAL",
                            totalPriceLabel: "Total",
                            totalPrice: parseFloat(item.product.price).toFixed(
                              2
                            ),
                            currencyCode: "USD",
                            countryCode: "US",
                          },
                        }}
                        onLoadPaymentData={(paymentRequest) => {
                          console.log("load payment data", paymentRequest);
                        }}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>

      <ToastContainer />
    </div>
  );
};

export default Cart;
