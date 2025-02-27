"use client";

import { NAV_LINKS, SocilMedias } from "@/constants";
import { ThemeContext } from "@/context/ThemeContext";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useContext } from "react";

const Footer = () => {
  const { locale } = useParams();
  const { theme } = useContext(ThemeContext);
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <>
      <div className="py-12 bg-light-100 dark:bg-dark-100 container mx-auto px-4 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center gap-6 lg:gap-10">
          <div className="box">
            <div className="logo mb-3">
              <Link href={"/"}>
                <Image
                  src={
                    theme === "dark"
                      ? "/freshcart-logo.png"
                      : "/freshcart-logo.svg"
                  }
                  alt="logo"
                  width={160}
                  height={31}
                />
              </Link>
            </div>
            <p className="mb-5">{t("happy")}</p>
            <div className="text-xl font-semibold mb-3">{t("keepInTouch")}</div>
            <div className="flex gap-2 flex-wrap">
              {SocilMedias.map((el, i) => (
                <Link href={el.href} key={i}>
                  <Image src={el.src} alt={el.src} width={45} height={45} />
                </Link>
              ))}
            </div>
          </div>
          <div className="box">
            <div className="text-lg font-semibold mb-3">
              {t("masterPasges")}
            </div>
            {NAV_LINKS.map((el) => (
              <Link
                key={el.key}
                href={`/${locale}/${el.href}`}
                className="hover:text-main transition-all duration-500 block mb-3"
              >
                {t(el.label)}
              </Link>
            ))}
          </div>
          <div className="box">
            <div className="text-lg font-semibold mb-3">
              {t("masterPasges")}
            </div>
            {NAV_LINKS.map((el) => (
              <Link
                key={el.key}
                href={`/${locale}/${el.href}`}
                className="hover:text-main transition-all duration-500 block mb-3"
              >
                {t(el.label)}
              </Link>
            ))}
          </div>
          <div className="box">
            <div className="text-lg font-semibold mb-3">
              {t("masterPasges")}
            </div>
            {NAV_LINKS.map((el) => (
              <Link
                key={el.key}
                href={`/${locale}/${el.href}`}
                className="hover:text-main transition-all duration-500 block mb-3"
              >
                {t(el.label)}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <p className="bg-white dark:bg-dark-200 p-5 text-center px-4">
        © {year} {t("created")}
      </p>
    </>
  );
};

export default Footer;
