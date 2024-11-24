import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./categories/categoriesSlice.js";
import productsSlice from "./products/productsSlice.js";
import productItemSlice from "./productItem/productItemSlice.js";
import { apiSlice } from "./api/apiSlice.js";
import userSlice from "./user/userSlice.js";

export const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    products: productsSlice,
    productItem: productItemSlice,
    user: userSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
