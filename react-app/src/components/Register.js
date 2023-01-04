import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";

import Swal from 'sweetalert2'

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRepassword] = useState("");

  const { done, rejected } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const SubmitForm = (e) => {
    e.preventDefault();
    if (password !== re_password) {
      // Swal.fire({
      //   text: 'Passwords are not matches!',

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
        title: "Passwords are not matches!",
        confirmButtonColor: "#113A58",
        width: 250,
        icon: "error",

        color: "#716add",
        background: "#fff ",
      });

    } else {
      const obj = {
        name,
        email,
        password,
        re_password,
      };

      dispatch(registerUser(obj));
      setName("");
      setEmail("");
      setPassword("");
      setRepassword("");



    }
  };

  return (
    <div className="w-50 m-auto mt-4">


      <form className="form-group" onSubmit={SubmitForm}>
        <h5 className="mt-2 m-auto align-center">Register Form</h5>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control mt-2"
          required
          type={"text"}
          placeholder="username"
        />
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
        <input
          value={re_password}
          onChange={(e) => setRepassword(e.target.value)}
          className="form-control mt-2"
          required
          type={"password"}
          placeholder="confirm password"
        />
        <input style={{ backgroundColor: "#0F334E" }}
          className="form-control btn btn-primary mt-2 fw-bold"
          type={"submit"}
          value="Register"
        />
      </form>
      <Link className="mt-2 text-decoration-none btn btn-success" to={"/login"}>already have an account?</Link>

      <ToastContainer />
    </div>
  );
};

export default Register;
