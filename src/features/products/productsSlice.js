import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { suffle } from "../../utils/common";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    isLoading: false,
    products: [],
    filtered: [],
    related: [],
    error: null,
  },
  reducers: {
    filterByPrice: (state, action) => {
      state.filtered = state.products.filter(
        ({ price }) => price < action.payload
      );
    },
    getRelatedProducts: (state, action) => {
      console.log(action);
      const list = state.products.filter((item) => {
        return item.category.id === action.payload;
      });
      state.related = suffle(list);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.products = [];
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.products = [];
        state.error = action.payload;
      });
  },
});

export const { filterByPrice, getRelatedProducts } = productsSlice.actions;

export default productsSlice.reducer;
