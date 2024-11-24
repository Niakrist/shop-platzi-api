import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export const createUser = createAsyncThunk("user/createUser", async (body) => {
  const response = await axios.post(`${BASE_URL}/users/`, body);
  return response.data;
});

export const loginUser = createAsyncThunk("user/loginUser", async (body) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, body);
  const login = await axios.get(`${BASE_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${response.data.access_token}`,
    },
  });
  return login.data;
});

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (values) => {
    const response = await axios.put(`${BASE_URL}/users/${values.id}`, values);
    return response.data;
  }
);

const addCurrentUser = (state, action) => {
  state.isLoading = false;
  state.currentUser = action.payload;
  state.cart;
  state.error = null;
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    currentUser: null,
    cart: [],
    formType: "signup",
    showForm: false,
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      let newCart = [...state.cart];
      const found = state.cart.find((item) => item.id === action.payload.id);
      if (found) {
        newCart = newCart.map((item) => {
          return item.id === action.payload.id
            ? {
                ...item,
                quantity: action.payload.quantity || item.quantity + 1,
              }
            : item;
        });
      } else {
        newCart.push({ ...action.payload, quantity: 1 });
      }
      state.cart = newCart;
    },
    toggleShowForm: (state, action) => {
      state.showForm = action.payload;
    },
    toggleFormType: (state, action) => {
      state.formType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, addCurrentUser)
      .addCase(loginUser.fulfilled, addCurrentUser)
      .addCase(updateUser.fulfilled, addCurrentUser);
  },
});

export const { addToCart, toggleShowForm, toggleFormType } = userSlice.actions;

export default userSlice.reducer;
