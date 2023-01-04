import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const cartProduct = createAsyncThunk(
  "cart/cartProduct",
  async (args, { rejectWithValue }) => {
    const result = await axios
      .get(`http://127.0.0.1:8000/api/cart/?search=${args}`)
      .then((res) => res.data);
    return result;
  }
);

const cartReducer = createSlice({
  name: "cart",
  initialState: {
    data: [],
  },
  reducers: {
  },
  extraReducers: {
    [cartProduct.pending]: (state, action) => {
     
      // console.log("pending");
    },
    [cartProduct.fulfilled]: (state, { payload }) => {
      // console.log("payload: "+action.payload);

      state.data = payload;

      // state.userCart.push(action.payload);
      // console.log("fulfilled: " + state.userCart);
    },
    [cartProduct.rejected]: (state, action) => {

      console.log("rejected");
    },
  },
});

export default cartReducer.reducer;
