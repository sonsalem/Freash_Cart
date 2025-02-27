"use client";

import { ProductDataProps, ProductPros } from "@/types/products";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "./Loader";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Minus, Plus, Star } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { addToCart } from "@/store/slices/cartSlice";
import { useTranslations } from "next-intl";
import { addToWishlist } from "@/store/slices/whislistSlice";

const getProductData = async (id: string): Promise<ProductDataProps> => {
  const { data } = await axios.get<ProductDataProps>(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`
  );

  return data;
};

const ProductSinglePage = ({ id }: { id: string }) => {
  const t = useTranslations("singalProduct");
  const tCat = useTranslations("categories");
  const tCart = useTranslations("cart");
  const tWish = useTranslations("wishlist");
  const { locale } = useParams();
  const { token } = useSelector((state: RootState) => state.token);
  const { isLoading: cartLoading } = useSelector(
    (state: RootState) => state.cart
  );
  const { isLoading: wishLoading } = useSelector(
    (state: RootState) => state.wishlist
  );
  const dispatch = useDispatch<AppDispatch>();

  const { data, isLoading } = useQuery({
    queryKey: ["singleProduct", id],
    queryFn: () => getProductData(id),
    staleTime: 1000 * 60 * 8,
    gcTime: 1000 * 60 * 5,
    select: (data): ProductPros => data.data,
  });

  const [mainImage, setMainImage] = useState("");
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (data?.imageCover) {
      setMainImage(data.imageCover);
    }
  }, [data]);

  if (isLoading) return <Loader screen={true} />;

  return (
    <>
      {data && (
        <div className="flex flex-col md:flex-row gap-8 relative">
          <div className="md:w-1/2 md:sticky top-4 self-start">
            <div className="mainImage w-full rounded-lg ring-1 ring-gray-300 dark:ring-gray-800">
              <Image
                src={mainImage}
                alt="image"
                width={300}
                height={400}
                className="rounded-lg mx-auto"
              />
            </div>
            <div className="flex overflow-x-auto gap-4 p-4">
              {data?.images.map((img, i) => (
                <div
                  key={i}
                  className="rounded-lg ring-1 ring-gray-300 dark:ring-gray-800 cursor-pointer flex-shrink-0"
                  onClick={() => setMainImage(img)}
                >
                  <Image
                    src={img}
                    alt="img"
                    width={120}
                    height={80}
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 texts">
            <Link
              className="text-light-gray hover:text-main transition-all"
              href={`/${locale}/products?category=${data.category.name}-${data.category._id}`}
            >
              {tCat(data.category.name)}
            </Link>
            <div className="text-3xl font-bold mb-4">{data.title}</div>
            <div className="flex items-center mb-4">
              <div className="flex gap-1 items-center">
                {Array(Math.floor(data.ratingsAverage))
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  ))}
                {Array(5 - Math.floor(data.ratingsAverage))
                  .fill(0)
                  .map((_, i) => (
                    <Star key={i} size={20} className="text-yellow-400" />
                  ))}
              </div>
              <div className="mx-2 text-sm text-gray-500">
                {data.ratingsAverage}
              </div>
              <div className="text-sm text-gray-500">
                ({data.ratingsQuantity})
              </div>
            </div>
            <div className="flex justify-between gap-4 mb-10">
              <div className="price">
                <div className="text-light-gray mb-2 uppercase">
                  {t("price")}
                </div>
                <div className="text-lg font-semibold mb-2">${data.price}</div>
                <div className="text-sm">
                  Only have <span className="text-main">{data.quantity}</span>{" "}
                  on stock
                </div>
              </div>
              <div className="quantity">
                <div className="text-light-gray mb-2 uppercase">
                  {t("quantinty")}
                </div>
                <div className="flex items-center justify-between w-[150px] rounded-3xl py-1 px-2 bg-light-100 dark:bg-dark-100">
                  <button
                    className="w-[28px] h-[28px] rounded-full bg-white dark:bg-dark-200 flex items-center justify-center"
                    disabled={count == 1}
                    onClick={() => setCount((prev) => prev - 1)}
                  >
                    <Minus size={16} />
                  </button>
                  {count}
                  <button
                    className="w-[28px] h-[28px] rounded-full bg-white dark:bg-dark-200 flex items-center justify-center"
                    disabled={count == data.quantity}
                    onClick={() => setCount((prev) => prev + 1)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
            <div className="dec mb-8">
              <div className="border-b-2 border-gray-300 dark:border-gray-800 pb-2 mb-4">
                {t("descrpition")}
              </div>
              <div className="text-light-gray">{data.description}</div>
            </div>
            {token ? (
              <div className="flex justify-between items-center gap-6">
                <Button
                  onClick={() =>
                    dispatch(
                      addToCart({
                        productId: data._id,
                        token,
                        text: `${tCart("productAdded")}`,
                        count: `${count}`,
                      })
                    )
                  }
                  size="lg"
                  className="!bg-main hover:!bg-transparent !text-white hover:!text-black dark:hover:!text-white ring-1 ring-main w-full"
                  disabled={cartLoading}
                >
                  {!cartLoading ? t("Add") : `${t("Loading")}...`}
                </Button>
                <Button
                  onClick={() =>
                    dispatch(
                      addToWishlist({
                        productId: data._id,
                        token,
                        text: `${tWish("productAdded")}`,
                      })
                    )
                  }
                  size="lg"
                  className="!bg-pink-600 hover:!bg-transparent !text-white hover:!text-black dark:hover:!text-white ring-1 ring-pink-600 w-full"
                  disabled={wishLoading}
                >
                  {!cartLoading ? tWish("Add") : `${t("Loading")}...`}
                </Button>
              </div>
            ) : (
              <Link href={`/${locale}/signin`}>
                <Button
                  size="lg"
                  className="!bg-main hover:!bg-green-500 w-full"
                >
                  {t("Log In First")}
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductSinglePage;
