import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "next/headers";

const verifyToken = createAsyncThunk(
  "token/verifyToken",
  async (_, { getState }) => {
    const state: any = getState();
    const token = state.token.token || localStorage.getItem("token");

    if (!token) throw new Error("No token found");

    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
      {
        headers: { token },
      }
    );

    return data;
  }
);

interface TokenState {
  token: string | null;
  id: string | null;
}

const initialState: TokenState = {
  token: localStorage.getItem("token") || null,
  id: null,
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      state.id = null;
      localStorage.removeItem("token");
    },
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyToken.pending, (state) => {
        state.id = null;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.id = action.payload.decoded.id;
      })
      .addCase(verifyToken.rejected, (state) => {
        state.id = null;
      });
  },
});

const tokenReducer = tokenSlice.reducer;

export const { setToken, clearToken, setId } = tokenSlice.actions;
export { verifyToken };
export default tokenReducer;
