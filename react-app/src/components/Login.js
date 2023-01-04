import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const SubmitForm = async (e) => {
    e.preventDefault();
    const obj = {
      email: email,
      password: password,
    };

    await axios
      .post("http://127.0.0.1:8000/auth/jwt/create/", obj, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(async (res) => {
        localStorage.setItem("refresh", res.data.refresh);
        const refreshCode = {
          refresh: res.data.refresh,
        };
        await axios
          .post("http://127.0.0.1:8000/auth/jwt/refresh/", refreshCode, {
            headers: {
              "Content-Type": "application/json",
            },
          })

          .then((res) => {
            // const access = res.data.access
            localStorage.setItem("access", res.data.access);
            localStorage.setItem("email", email);
            setTimeout(() => {
              navigate("/");
            }, 1000);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        // toast.error(err.response.data.detail);
        // console.log(err.response)

        // Swal.fire({
        //   title:'Opps!',
        //   text: err.response.data.detail,
        //   width: 250,
        //   // customClass: 'swal-height',
        //   icon:'error',
        //   // heightAuto: false,
        //   // padding: '3em',
        //   color: '#716add',
        //   background: '#fff ',
        // })

        Swal.fire({
          customClass: {
            container: "swal-overlay",
            title:'title-color'
          },
          title: err.response.data.detail,
          confirmButtonColor: "#113A58",
          width: 250,
          icon: "error",

          color: "#716add",
          background: "#fff ",
        });


      });
    // dispatch(loginUser(obj));
    //   axios.create({
    //     baseURL: 'http://127.0.0.1:8000/auth/jwt/create/',
    //     timeout: 2000,
    //     headers: {
    //         'Authorization': "JWT " + localStorage.getItem('access'),
    //         'Content-Type': 'application/json',
    //         // 'accept': 'application/json'
    //     }

    // })
  };

  return (
    <div className="w-50 m-auto mt-4">
      <form className="form-group" onSubmit={SubmitForm}>
        <h5 className="mt-2 m-auto align-center">Login Form</h5>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mt-2"
          required
          type={"email"}
          placeholder="email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control mt-2"
          required
          type={"password"}
          placeholder="password"
        />

        <input style={{ backgroundColor: "#0F334E" }}
          className="form-control btn btn-primary mt-2 fw-bold"
          type={"submit"}
          value="Login"
        />
      </form>

      <Link
        className="mt-2 text-decoration-none btn btn-danger"
        to={"/reset-password"}
      >
        Forgot Password
      </Link>
      <ToastContainer />
    </div>
  );
};

export default Login;
