import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./slices/tokenSlice";
import CartReducer from "./slices/cartSlice";
import WishlistReducer from "./slices/whislistSlice";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    cart: CartReducer,
    wishlist: WishlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
