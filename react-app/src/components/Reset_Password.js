import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Swal from 'sweetalert2'
const Reset_Password = () => {
  const [email, setEmail] = useState("");

  const SubmitForm = (e) => {
    e.preventDefault();
    const obj = {
      email: email,
    };

    axios
      .post("http://127.0.0.1:8000/auth/users/reset_password/", obj, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) =>
        // toast.success(
        //   "Please Check your email inbox "
        // )
        Swal.fire({
          title:'Reset Password',
          text: 'Please Check your email inbox',
          width: 250,
          // customClass: 'swal-height',
          icon:'info',
          // heightAuto: false,
          // padding: '3em',
          color: '#716add',
          background: '#fff ',
        })
      )
      .catch((err) => {
        // toast.error(err)
        // console.log(err.response.data.email[0]);
        Swal.fire({
          title:'Opps!',
          text: err.response.data.email[0],
          width: 250,
          // customClass: 'swal-height',
          icon:'error',
          // heightAuto: false,
          // padding: '3em',
          color: '#716add',
          background: '#fff ',
        })
      });
    setEmail("");
  };
  return (
    <div className="w-50 m-auto mt-4">

      <form className="form-group" onSubmit={SubmitForm}>
        <h3 className="mt-2 m-auto align-center text-muted">Reset Password</h3>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mt-2"
          required
          type={"email"}
          placeholder="email"
        />

        <input
        style={{backgroundColor: "#113A58",  letterSpacing:'1px'}}
          className="form-control text-white mt-2 fw-bold"
          type={"submit"}
          value="Reset Password"
        />
      </form>
      <ToastContainer />
    </div>
  );
};

export default Reset_Password;
