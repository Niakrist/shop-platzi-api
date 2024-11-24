import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    isLoading: false,
    categories: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.categories = [];
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.categories = [];
        state.error = action.payload;
      });
  },
});

export default categoriesSlice.reducer;
