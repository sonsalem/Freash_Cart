"use client";

import { NAV_LINKS } from "@/constants";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Heart, Menu, ShoppingCart } from "lucide-react";
import MenuSmall from "./MenuSmall";
import ChangeLanguage from "./ChangeLanguage";
import ChangeTheme from "./ChangeTheme";
import ProficelPic from "./ProficelPic";
import { ThemeContext } from "@/context/ThemeContext";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { getCartData } from "@/store/slices/cartSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Cart from "./Cart";
import { getWishlistData } from "@/store/slices/whislistSlice";

const Navbar = () => {
  const pathName = usePathname();
  const { locale } = useParams();
  const { theme } = useContext(ThemeContext);
  const t = useTranslations("navbar");
  const { token: isLoggedIn } = useSelector((state: RootState) => state.token);
  const { nums } = useSelector((state: RootState) => state.cart);
  const { nums: wishlistNums } = useSelector(
    (state: RootState) => state.wishlist
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getCartData(isLoggedIn));
    }
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getWishlistData(isLoggedIn));
    }
  }, [dispatch, wishlistNums]);

  // Small Menu
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="border-b-[1px] border-b-gray-300 dark:border-b-gray-800">
      <div className="container mx-auto px-4 lg:px-10 gap-8 flex items-center">
        {/* LOGO */}
        <div className="logo py-4">
          <Link href={"/"}>
            <Image
              src={
                theme === "dark" ? "/freshcart-logo.png" : "/freshcart-logo.svg"
              }
              alt="logo"
              width={160}
              height={31}
            />
          </Link>
        </div>
        {/* LINKS */}
        <div className="gap-3 hidden lg:flex h-full min-h-[63px]">
          {NAV_LINKS.map((link) => (
            <Link
              href={`/${locale}/${link.href}`}
              key={link.key}
              className={` relative py-5 px-3 block h-full transition-all  ${
                link.href === `` && pathName == `/${locale}`
                  ? "navActive"
                  : link.href !== "" && pathName.includes(link.href)
                  ? "navActive"
                  : ""
              }`}
            >
              {t(link.label)}
            </Link>
          ))}
        </div>
        <div className="ms-auto flex gap-4 items-center">
          <ChangeLanguage />
          <ChangeTheme />
        </div>
        <div className="ms-auto flex gap-4 items-center">
          {isLoggedIn === null ? (
            <Link href={`/${locale}/signin`} className="block">
              <Button className="bg-main hover:bg-green-500 dark:bg-main dark:hover:bg-green-500 dark:text-white">
                Log In
              </Button>
            </Link>
          ) : (
            <>
              <DropdownMenu dir={locale == "en" ? "ltr" : "rtl"}>
                <DropdownMenuTrigger asChild>
                  <div className="relative cursor-pointer">
                    {nums !== 0 && (
                      <div className="absolute -top-2 -right-2 rounded-full w-[18px] h-[18px] bg-main !text-white text-[10px] grid place-content-center">
                        {nums}
                      </div>
                    )}
                    <ShoppingCart />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[400px] mx-4 p-6">
                  <Cart sm={true} />
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href={`/${locale}/wishlist`} className="hidden lg:block">
                <div className="relative">
                  {wishlistNums !== 0 && (
                    <div className="absolute -top-2 -right-2 rounded-full w-[18px] h-[18px] bg-pink-600 !text-white text-[10px] grid place-content-center">
                      {wishlistNums}
                    </div>
                  )}
                </div>
                <Heart />
              </Link>
              <ProficelPic />
            </>
          )}
          <div
            onClick={() => setOpen((prev) => !prev)}
            className="lg:hidden cursor-pointer"
          >
            <Menu />
          </div>
          <MenuSmall
            open={open}
            setOpen={setOpen}
            isLoggedIn={isLoggedIn}
            nums={nums}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
