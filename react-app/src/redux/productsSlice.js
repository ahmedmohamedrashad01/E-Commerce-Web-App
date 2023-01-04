import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (_, { rejectWithValue }) => {
    const res = await axios
      .get("http://127.0.0.1:8000/api/products/")
      .then((response) => response.data)
      .catch((err) => rejectWithValue(err));
    return res;
  }
);

// _________________________________________________________________

export const searchProduct = createAsyncThunk(
  "products/getProduct",
  async (args, { rejectWithValue }) => {
    const res = await axios
      .get(`http://127.0.0.1:8000/api/products/?search=${args}`)
      .then((response) => response.data)
      .catch((err) => rejectWithValue(err));
    return res;
  }
);

// _________________________________________________________________

export const getItem = createAsyncThunk(
  "products/getItem",
  async (args, { rejectWithValue }) => {
    const res = await axios
      .get(`http://127.0.0.1:8000/api/products/${args}/`)
      .then((response) => response.data)
      .catch((err) => rejectWithValue(err));
    return res;
  }
);


// id: localStorage.getItem('id') || '',
const productReducer = createSlice({
  name: "products",
  initialState: {
    products: [],

    item: {
      // id: localStorage.getItem('id') || '',
      // name: localStorage.getItem('name') || '',
      // description: localStorage.getItem('description') || '',
      // category: localStorage.getItem('category') || '',
      // price: localStorage.getItem('price') || '',
      // image: localStorage.getItem('image') || '',
    },

  },
  reducers: {},
  extraReducers: {
    [getProduct.pending]: (state, action) => {},
    [getProduct.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
    [getProduct.rejected]: (state, action) => {
      console.log("rejected");
    },

    [searchProduct.pending]: (state, action) => {
      // console.log("");
    },
    [searchProduct.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
    [searchProduct.rejected]: (state, action) => {
      toast.error("rejected");
    },
    // ______________________Get Item _________________________________
    [getItem.fulfilled]: (state, action) => {
      state.item = action.payload;
      // localStorage.setItem('item', JSON.stringify(action.payload));
      // console.log( state.item);
      localStorage.setItem("id", action.payload.id);
      localStorage.setItem("name", action.payload.name);
      localStorage.setItem("description", action.payload.description);
      localStorage.setItem("category", action.payload.category);
      localStorage.setItem("price", action.payload.price);
      localStorage.setItem("image", action.payload.image);
    },


  },
});

export default productReducer.reducer;
