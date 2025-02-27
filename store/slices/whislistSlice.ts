import { WishListData } from "@/types/wishList";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

interface WishListState {
  isLoading: boolean;
  data: any | null;
  nums: number | string;
  wishlistIds: string[];
}

const initialState: WishListState = {
  isLoading: false,
  data: null,
  nums: 0,
  wishlistIds: [],
};

const getWishlistData = createAsyncThunk(
  "wishlist/getWishlistData",
  async (token: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<WishListData>(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers: { token } }
      );

      const firstItemId = data?.data?.[0]?._id;

      if (!firstItemId) return { data, wishlistIds: [] };

      const { data: wishlistIds } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId: firstItemId },
        { headers: { token } }
      );

      return { data, wishlistIds: wishlistIds?.data || [] };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch wishlist data"
      );
    }
  }
);

const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (
    {
      token,
      productId,
      text,
    }: { token: string; productId: string; text: string },
    { rejectWithValue }
  ) => {
    try {
      const { data: wishlistIds } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers: { token } }
      );

      toast.success(text);
      return { productId, wishlistIds: wishlistIds?.data || [] };
    } catch (error: any) {
      toast.error("Failed to update wishlist");
      return rejectWithValue(
        error.response?.data || "Failed to update wishlist"
      );
    }
  }
);

const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (
    {
      token,
      productId,
      text,
    }: { token: string; productId: string; text: string },
    { rejectWithValue }
  ) => {
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers: { token } }
      );

      toast.success(text);
      return productId;
    } catch (error: any) {
      toast.error("Failed to update wishlist");
      return rejectWithValue(
        error.response?.data || "Failed to update wishlist"
      );
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWishlistData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getWishlistData.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.nums = action.payload.data?.count || 0;
        state.wishlistIds = action.payload.wishlistIds || [];
      }
    );
    builder.addCase(getWishlistData.rejected, (state) => {
      state.isLoading = false;
      state.data = null;
      state.nums = 0;
      state.wishlistIds = [];
    });

    builder.addCase(
      addToWishlist.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.nums = +state.nums + 1;
        if (!state.wishlistIds.includes(action.payload.productId)) {
          state.wishlistIds.push(action.payload.productId);
        }
      }
    );

    builder.addCase(
      removeFromWishlist.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.nums = +state.nums - 1;
        state.wishlistIds = state.wishlistIds.filter(
          (id) => id !== action.payload
        );
      }
    );
  },
});

const WishlistReducer = wishlistSlice.reducer;

export { getWishlistData, addToWishlist, removeFromWishlist };
export default WishlistReducer;
