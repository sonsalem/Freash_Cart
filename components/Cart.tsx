"use client";

import {
  clearCart,
  getCartData,
  removeFromCart,
} from "@/store/slices/cartSlice";
import { AppDispatch, RootState } from "@/store/store";
import { CartData } from "@/types/cart";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import NoProducts from "./NoProducts";
import Link from "next/link";
import { CarrotIcon, ShoppingBagIcon, Trash2, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";

const Cart = ({ sm }: { sm?: boolean }) => {
  const { locale } = useParams();
  const t = useTranslations("cart");
  const tCat = useTranslations("categories");
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.token);
  const { products, nums, isLoading } =
    useSelector((state: RootState) => state.cart) || {};
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (token) dispatch(getCartData(token));
  }, [dispatch, token]);

  const cartData: CartData | null = products?.data || null;

  if (!token) router.push(`/${locale}/signin`);

  return (
    <div>
      <div className="flex justify-between gap-6 items-center mb-8">
        <div className="text-2xl font-bold">{t("shopcart")}</div>
        <AlertDialog>
          <AlertDialogTrigger
            asChild
            className="shadow-none !border-0 hover:bg-transparent"
          >
            <Button
              disabled={isLoading || nums == 0}
              size="lg"
              className="!bg-red-600 tex-white datk:!text-white hover:!bg-transparent hover:!text-black dark:hover:!text-white ring-1 ring-red-600"
            >
              {sm ? (
                <Trash2 />
              ) : (
                <>
                  <span className="hidden md:inline">{t("Clear All")}</span>
                  <Trash2 />
                </>
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader
              className={locale === "ar" ? "!text-right" : "text-left"}
            >
              <AlertDialogTitle>{t("confirmation")}</AlertDialogTitle>
              <AlertDialogDescription>{t("warning")}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter
              className={locale === "ar" ? "!justify-start" : "justify-end"}
            >
              <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
              <AlertDialogAction className="border-0 !bg-transparent hover:!bg-transparent shadow-none">
                <Button
                  onClick={() =>
                    dispatch(
                      clearCart({
                        token: `${token}`,
                        text: `${t("clearCart")}`,
                      })
                    )
                  }
                  disabled={isLoading}
                  size="lg"
                  className="!bg-red-600 tex-white w-full md:w-fit datk:!text-white hover:!bg-transparent hover:!text-black dark:hover:!text-white ring-1 ring-red-600"
                >
                  {isLoading ? (
                    `${t("Loading")}...`
                  ) : (
                    <>
                      {t("Clear All")}
                      <Trash2 />
                    </>
                  )}
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      {isLoading ? (
        <Loader screen={!sm} />
      ) : (
        <>
          {cartData?.products && token ? (
            <>
              {cartData.products.length === 0 ? (
                <NoProducts />
              ) : (
                <>
                  <div className="flex flex-col gap-6">
                    <div
                      className={`${
                        sm
                          ? "grid grid-cols-1 gap-8 max-h-[300px] overflow-y-auto px-3"
                          : "grid grid-cols-1 md:grid-cols-2 gap-8"
                      }`}
                    >
                      {cartData.products.map((prod) => (
                        <div
                          className="flex justify-between gap-4 border-b-2 border-gray-300 dark:border-gray-800 py-4"
                          key={prod._id}
                        >
                          {/* IMAGE And DES */}
                          <div className="box flex gap-4">
                            <Link
                              href={`/${locale}/products/${prod.product._id}`}
                            >
                              <Image
                                src={prod.product?.imageCover}
                                alt={prod.product?.title || "Product Image"}
                                width={100}
                                height={100}
                                className="rounded-lg ring-1 ring-gray-300 dark:ring-gray-800"
                              />
                            </Link>
                            <div className="texts">
                              <Link
                                href={`/${locale}/products/${prod.product._id}`}
                              >
                                <div className="text-semibold text-sm hover:text-main transition-all duration-500">
                                  {prod.product.title}
                                </div>
                              </Link>
                              <Link
                                className="text-light-gray hover:text-main transition-all duration-500 text-xs"
                                href={`/${locale}/products?category=${prod.product.category.name}-${prod.product.category._id}`}
                              >
                                {tCat(prod.product.category.name)}
                              </Link>
                            </div>
                          </div>
                          <div className="actions flex flex-col gap-4 items-center">
                            <div className="text-[10px] flex items-center rounded-sm px-2 py-1 bg-light-100 dark:bg-dark-100">
                              <span className="text-main flex items-center ms-1">
                                {prod.count}
                                <X size={10} />
                              </span>
                              ${prod.price}
                            </div>
                            <div
                              onClick={() =>
                                dispatch(
                                  removeFromCart({
                                    id: prod.product._id,
                                    token,
                                    text: `${t("productRemoved")}`,
                                  })
                                )
                              }
                              className="delet text-red-600 rounded-md p-2 hover:bg-light-100 dark:bg-dark-100 transition-all cursor-pointer"
                            >
                              <Trash2 size={15} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col gap-2 mb-4 w-fit">
                        <div className="text-2xl font-semibold">
                          {t("total")}
                        </div>
                        <div className="text-xl text-main">
                          ${cartData.totalCartPrice}
                        </div>
                      </div>
                      {!sm && (
                        <Button
                          size="lg"
                          className="!bg-main hover:!bg-transparent ring-1 ring-main
                        hover:!text-black dark:hover:!text-white
                        "
                        >
                          {t("check")}
                          <CarrotIcon />
                        </Button>
                      )}
                    </div>
                    {sm && (
                      <div className="flex justify-between items-center">
                        <Link href={`/${locale}/cart`}>
                          <Button
                            className="!bg-transparent hover:!bg-main ring-1 ring-main hover:!text-white
                          !text-black dark:!text-white
                        "
                          >
                            {t("view")}
                            <ShoppingBagIcon />
                          </Button>
                        </Link>
                        <Button
                          className="!bg-main hover:!bg-transparent ring-1 ring-main
                        hover:!text-black dark:hover:!text-white
                        "
                        >
                          {t("check")}
                          <CarrotIcon />
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </>
          ) : (
            <NoProducts />
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
