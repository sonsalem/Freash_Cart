import { Cart } from "@/types/cart";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Async thunk to get cart data
const getCartData = createAsyncThunk(
  "cart/getCartData",
  async (token: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token,
          },
        }
      );

      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch cart data"
      );
    }
  }
);

const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    {
      productId,
      token,
      text,
      count,
    }: { productId: string; token: string; text: string; count: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        {
          headers: {
            token,
          },
        }
      );

      const responseCount = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        {
          headers: {
            token,
          },
        }
      );

      toast.success(`${text}`);
      return response.data, responseCount.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to add product to cart"
      );
    }
  }
);

const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (
    { id, token, text }: { id: string; token: string; text: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          headers: {
            token,
          },
        }
      );
      toast.success(`${text}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to add product to cart"
      );
    }
  }
);
const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (
    { token, text }: { token: string; text: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers: {
            token,
          },
        }
      );
      toast.success(`${text}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to add product to cart"
      );
    }
  }
);

interface CartState {
  isLoading: boolean;
  products: any | null;
  nums: number | string;
}

const initialState: CartState = {
  isLoading: false,
  products: null,
  nums: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartData.pending, (state) => {
        state.isLoading = true;
        state.products = null;
      })
      .addCase(getCartData.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.products = action.payload;
        state.isLoading = false;
        state.nums = action.payload.numOfCartItems || 0;
      })
      .addCase(getCartData.rejected, (state) => {
        state.isLoading = false;
        state.products = null;
      })

      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.isLoading = false;
        state.products = action.payload;
        state.nums = action.payload.numOfCartItems || 0;
      })

      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        removeFromCart.fulfilled,
        (state, action: PayloadAction<Cart>) => {
          state.isLoading = false;
          state.products = action.payload;
          state.nums = action.payload.numOfCartItems || 0;
        }
      )

      // Clear Cart
      .addCase(clearCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clearCart.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.isLoading = false;
        state.products = action.payload;
        state.nums = action.payload.numOfCartItems || 0;
      });
  },
});

const CartReducer = cartSlice.reducer;

export { getCartData, addToCart, removeFromCart, clearCart };
export default CartReducer;
