import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (args, { rejectWithValue }) => {
    const res = await axios
      .post("http://127.0.0.1:8000/auth/users/", args)
      .then((response) => response.data)
      .catch((err) => rejectWithValue(err.response.data));

    return res;
  }
);

const initState = {
  done: false,
  pending: false,
  rejected: null,
};

const authReducer = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {},
  extraReducers: {
    [registerUser.pending]: (state, action) => {
      state.pending = true;
      console.log("pending");
      console.log(state.pending);
    },
    [registerUser.fulfilled]: (state, action) => {
      state.done = true;
      Swal.fire({
        customClass: {
          container: "swal-overlay",
          title: "title-color",
        },
        title: "user seccessfully registered please check the confirm mail!",
        confirmButtonColor: "#113A58",
        width: 250,
        icon: "success",

        color: "#716add",
        background: "#fff ",
      });

     

    },
    [registerUser.rejected]: (state, action) => {
      // state.rejected = action.payload.email[0];
      console.log("rejected");
      // toast.error(action.payload.email[0]);
      // console.log(action.payload.password);
      // Swal.fire({
      //   text: action.payload.email[0],

      //   width: 250,
      //   // customClass: 'swal-height',
      //   icon:'error',
      //   // heightAuto: false,
      //   // padding: '3em',
      //   color: '#716add',
      //   background: '#fff ',
      // })
      // mp3spider@icloud.com
      if (action.payload.email) {
        Swal.fire({
          customClass: {
            container: "swal-overlay",
            title: "title-color",
          },
          title: JSON.stringify(action.payload.email[0]),
          confirmButtonColor: "#113A58",
          width: 250,
          icon: "error",
          color: "#716add",
          background: "#fff ",
        });
      }else if(action.payload.password[0] || action.payload.password[1]
        || action.payload.password[2]){
        Swal.fire({
          customClass: {
            container: "swal-overlay",
            title: "title-color",
          },
          // title: JSON.stringify(action.payload.password[0]),
          title: action.payload.password[0] || action.payload.password[1]
          || action.payload.password[2],
          confirmButtonColor: "#113A58",
          width: 250,
          icon: "error",
          color: "#716add",
          background: "#fff ",
        });
      }
      // else {
      //   Swal.fire({
      //     customClass: {
      //       container: "swal-overlay",
      //       title: "title-color",
      //     },
      //     // title: JSON.stringify(action.payload.password[0]),
      //     title: JSON.stringify(action.payload.password[0]),
      //     confirmButtonColor: "#113A58",
      //     width: 250,
      //     icon: "error",
      //     color: "#716add",
      //     background: "#fff ",
      //   });
      // }
      // Swal.fire({
      //   customClass: {
      //     container: "swal-overlay",
      //     title: "title-color",
      //   },
      //   title: JSON.stringify(action.payload),
      //   confirmButtonColor: "#113A58",
      //   width: 250,
      //   icon: "error",
      //   color: "#716add",
      //   background: "#fff ",
      // });
    },
  },
});
export default authReducer.reducer;
