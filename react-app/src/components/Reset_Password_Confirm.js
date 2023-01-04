import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import Swal from "sweetalert2";

const Reset_Password_Confirm = () => {
  const { uid } = useParams();
  const { token } = useParams();

  const [new_password, setNew_password] = useState("");
  const [re_new_password, setRe_new_password] = useState("");

  const changePassword = (e) => {
    e.preventDefault();
    if (new_password !== re_new_password) {
      toast.error("passwords are not matching");
    } else {
      const obj = {
        uid: uid,
        token: token,
        new_password: new_password,
        re_new_password: re_new_password,
      };
      // console.log(uid);
      // console.log(token);
      axios
        .post("http://127.0.0.1:8000/auth/users/reset_password_confirm/", obj, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          // toast.success("the new password has been changed")
          Swal.fire({
            text: "Password successfully changed",
            width: 250,
            // customClass: 'swal-height',
            icon: "success",
            // heightAuto: false,
            // padding: '3em',
            color: "#716add",
            background: "#fff ",
          });
        })
        .catch((err) => {
          // console.log(`${err.response.data.new_password[0]}
          // ${err.response.data.new_password[1]}
          // ${err.response.data.new_password[2]}`);
          if (err.response.data.new_password[0]) {
            Swal.fire({
              text: `${err.response.data.new_password[0]}`,
              width: 250,
              // customClass: 'swal-height',
              icon: "error",
              // heightAuto: false,
              // padding: '3em',
              color: "#716add",
              background: "#fff ",
            });
          } else if (err.response.data.new_password[1]) {
            Swal.fire({
              text: `${err.response.data.new_password[1]}`,
              width: 250,
              // customClass: 'swal-height',
              icon: "error",
              // heightAuto: false,
              // padding: '3em',
              color: "#716add",
              background: "#fff ",
            });
          } else if (err.response.data.new_password[2]) {
            Swal.fire({
              text: `${err.response.data.new_password[2]}`,
              width: 250,
              // customClass: 'swal-height',
              icon: "error",
              // heightAuto: false,
              // padding: '3em',
              color: "#716add",
              background: "#fff ",
            });
          } else {
            Swal.fire({
            text: `${err.response.data.new_password[0]}
            ${err.response.data.new_password[1]}
            ${err.response.data.new_password[2]}`,

              width: 250,
              // customClass: 'swal-height',
              icon: "error",
              // heightAuto: false,
              // padding: '3em',
              color: "#716add",
              background: "#fff ",
            });
          }

          // Swal.fire({
          //   text: `${err.response.data.new_password[0]}
          //   ${err.response.data.new_password[1]}
          //   ${err.response.data.new_password[2]}`,

          //   width: 250,
          //   // customClass: 'swal-height',
          //   icon:'error',
          //   // heightAuto: false,
          //   // padding: '3em',
          //   color: '#716add',
          //   background: '#fff ',
          // })

          // toast.error(err)
        });
      setNew_password("");
      setRe_new_password("");
    }
  };
  return (
    <div className="w-50 m-auto mt-4">
      <form className="form-group" onSubmit={changePassword}>
        <h3 className="mt-2 m-auto align-center text-muted">
          Enter a new password
        </h3>
        <input
          value={new_password}
          onChange={(e) => setNew_password(e.target.value)}
          className="form-control mt-2"
          required
          type={"password"}
          placeholder="Password"
        />
        <input
          value={re_new_password}
          onChange={(e) => setRe_new_password(e.target.value)}
          className="form-control mt-2"
          required
          type={"password"}
          placeholder="Confirm password"
        />

        <input
          style={{ backgroundColor: "#113A58", letterSpacing: "1px" }}
          className="form-control mt-2 fw-bold text-white"
          type={"submit"}
          value="Change Password"
        />
      </form>
      <ToastContainer />
    </div>
  );
};

export default Reset_Password_Confirm;
