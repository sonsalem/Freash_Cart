"use client";

import { getWishlistData } from "@/store/slices/whislistSlice";
import { AppDispatch, RootState } from "@/store/store";
import { WishListData, WishListProduct } from "@/types/wishList";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RenderProduct from "./RenderProduct";
import Loader from "./Loader";
import NoProducts from "./NoProducts";

const Wishlist = () => {
  const t = useTranslations("wishlist");
  const { locale } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { token } = useSelector((state: RootState) => state.token);
  const { data, isLoading } = useSelector((state: RootState) => state.wishlist);

  useEffect(() => {
    if (!token) {
      router.push(`/${locale}/signin`);
      return;
    }
    dispatch(getWishlistData(token));
  }, [dispatch, token]);

  const wishlistData = data as WishListData | null;

  return (
    <div>
      <div
        className="h-[400px] w-full bg-cover rounded-b-lg shadow-md flex justify-center items-end mb-16 dark:shadow-[#ffffff17]"
        style={{ backgroundImage: `url("/wishlist.jpg")` }}
      >
        <div
          className="rounded-lg w-[400px] max-w-full h-[100px] p-4 flex items-center justify-center text-lg sm:text-4xl font-bold bg-white dark:bg-dark-200 -mb-10 shadow-md
        dark:shadow-[#ffffff17]"
        >
          {t("Your Wishlist")}
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        wishlistData?.data && (
          <>
            {wishlistData?.data.length !== 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-center">
                {wishlistData.data.map((product: WishListProduct) => (
                  <RenderProduct key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <NoProducts />
            )}
          </>
        )
      )}
    </div>
  );
};

export default Wishlist;
