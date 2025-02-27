"use client";
import { useParams } from "next/navigation";
import { X } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { NAV_LINKS } from "@/constants";
import Link from "next/link";
import { useTranslations } from "next-intl";

const MenuSmall = ({
  open,
  setOpen,
  isLoggedIn,
  nums,
  wishlistNums,
}: {
  open: boolean;
  setOpen: any;
  isLoggedIn: null | string;
  nums: number | string;
  wishlistNums: number | string;
}) => {
  // Translation
  const t = useTranslations("navbar");

  const { locale } = useParams();

  const menuRef = useRef<HTMLDivElement>(null);

  const WIDTH_MENU = 280;
  const degree = open ? "0" : `-${WIDTH_MENU}px`;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <>
      <div
        className={`bg-[#000000A1] w-full h-full fixed top-0 left-0 transition-all duration-200 ${
          open ? "z-50" : "-z-[10] opacity-0"
        }`}
      ></div>
      <div
        ref={menuRef}
        className={`fixed top-0 bg-light-100 pt-16 px-3 dark:bg-dark-200 h-[100vh] z-50 transition-all duration-300`}
        style={{
          [locale === "en" ? "right" : "left"]: degree,
          width: `${WIDTH_MENU}px`,
        }}
      >
        <X
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 cursor-pointer"
        />
        <ul className="flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <li key={link.key}>
              <Link
                onClick={() => setOpen(false)}
                href={`/${locale}/${link.href}`}
                className="bg-white dark:bg-dark-100 block px-4 py-3 rounded-md"
              >
                {t(link.label)}
              </Link>
            </li>
          ))}
          {isLoggedIn && (
            <>
              <li>
                <Link
                  onClick={() => setOpen(false)}
                  href={`/${locale}/wishlist`}
                  className="bg-white dark:bg-dark-100 block px-4 py-3 rounded-md"
                >
                  {t("wishlist")}({wishlistNums})
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setOpen(false)}
                  href={`/${locale}/cart`}
                  className="bg-white dark:bg-dark-100 block px-4 py-3 rounded-md"
                >
                  {t("cart")}({nums})
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default MenuSmall;
