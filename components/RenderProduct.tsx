"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { addToCart } from "@/store/slices/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Heart, Plus, Star } from "lucide-react";
import { Button } from "./ui/button";
import { ProductPros } from "@/types/products";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/store/slices/whislistSlice";

const RenderProduct = ({ product }: { product: ProductPros }) => {
  const tCart = useTranslations("cart");
  const tWish = useTranslations("wishlist");
  const t = useTranslations("products");
  const { locale } = useParams();
  const { token } = useSelector((state: RootState) => state.token);
  const { wishlistIds } = useSelector((state: RootState) => state.wishlist);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="block" key={product.id}>
      <div className="box p-5 rounded-lg ring-1 ring-gray-300 dark:ring-gray-800 hover:ring-main dark:hover:ring-main transition-all duration-500 relative">
        <div
          onClick={() => {
            if (wishlistIds.includes(product._id)) {
              dispatch(
                removeFromWishlist({
                  productId: product._id,
                  token: `${token}`,
                  text: tWish("productRemoved"),
                })
              );
            } else {
              dispatch(
                addToWishlist({
                  productId: product._id,
                  token: `${token}`,
                  text: tWish("productAdded"),
                })
              );
            }
          }}
          className="absolute ring-1 ring-gray-300 dark:ring-gray-800 p-1 rounded-full top-2 right-2 cursor-pointer bg-white dark:bg-dark-200 shadow-md"
        >
          <Heart
            size={14}
            className={
              wishlistIds.includes(product._id)
                ? "stroke-pink-600 fill-pink-600"
                : ""
            }
          />
        </div>

        <Link href={`/${locale}/products/${product.id}`}>
          <div className="image mb-4 mx-auto w-fit">
            <Image
              src={product.imageCover}
              alt={product.title}
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>
        </Link>

        {/* Product Details */}
        <div className="dec mb-3">
          <div className="text-gray-400 text-[12.25px]">
            {product.subcategory.map((sub) => sub.name)}
          </div>
          <Link
            href={`/${locale}/products/${product.id}`}
            className="font-semibold line-clamp-1 hover:!text-main transition-all duration-500"
          >
            {product.title}
          </Link>
        </div>

        {/* Ratings */}
        <div className="flex items-center mb-3">
          <div className="flex gap-1 items-center">
            {Array(Math.floor(product.ratingsAverage))
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className="text-yellow-400 fill-yellow-400"
                />
              ))}
            {Array(5 - Math.floor(product.ratingsAverage))
              .fill(0)
              .map((_, i) => (
                <Star key={i} size={12} className="text-yellow-400" />
              ))}
          </div>
          <div className="mx-2 text-[12px] text-gray-500">
            {product.ratingsAverage}
          </div>
          <div className="text-[12px] text-gray-500">
            ({product.ratingsQuantity})
          </div>
        </div>

        {/* Price & Add to Cart */}
        <div className="flex gap-4 justify-between items-center">
          <div className="text-sm font-semibold">${product.price}</div>
          {token && (
            <Button
              onClick={() =>
                dispatch(
                  addToCart({
                    productId: product._id,
                    token,
                    text: `${tCart("productAdded")}`,
                    count: "1",
                  })
                )
              }
              size="sm"
              className="text-white dark:bg-main dark:text-white dark:hover:bg-green-700 bg-main hover:bg-green-700 !transition-all !duration-500 px-2 py-1 rounded flex items-center gap-1"
            >
              <Plus /> {t("add")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RenderProduct;
