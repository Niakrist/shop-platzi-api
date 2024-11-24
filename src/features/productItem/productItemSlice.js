import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export const fetchProductItem = createAsyncThunk(
  "productItem/fetchProductItem",
  async (id) => {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    return response.data;
  }
);

const productItemSlice = createSlice({
  name: "productItem",
  initialState: {
    isLoading: false,
    productItem: {},
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductItem.pending, (state) => {
        state.isLoading = true;
        state.productItem = {};
        state.error = null;
      })
      .addCase(fetchProductItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productItem = action.payload;
        state.error = null;
      })
      .addCase(fetchProductItem.rejected, (state, action) => {
        state.isLoading = false;
        state.productItem = {};
        state.error = action.payload;
      });
  },
});

export default productItemSlice.reducer;
