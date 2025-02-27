"use client";

import { useTranslations } from "use-intl";
import { Button } from "./ui/button";
import { useParams } from "next/navigation";

const groceryData = [
  {
    id: 0,
    img: "/grocery-banner.png",
    title: "frout&Vega",
    subTitle: "off30",
  },
  {
    id: 1,
    img: "/grocery-banner-2.jpg",
    title: "freshBaked",
    subTitle: "off25",
  },
];

const Grocery = () => {
  const t = useTranslations("grocery");
  const { locale } = useParams();

  return (
    <div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {groceryData.map((item) => (
          <div
            key={item.id}
            className="rounded-lg px-7 py-12 relative overflow-hidden "
          >
            <div
              className={`-z-1 absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat ${
                locale === "ar" ? "scale-x-[-1]" : ""
              }`}
              style={{ backgroundImage: `url(${item.img})` }}
            />
            <div className="z-10 relative">
              <div className="text-xl text-black md:text-2xl font-bold">
                {t(item.title)}
              </div>
              <div className="text-gray-400 mb-3 text-sm md:text-base">
                {t(item.subTitle)}
              </div>
              <Button className="text-xs !py-4 md:text-lg flex items-center dark:bg-black dark:text-white dark:hover:bg-slate-900">
                {t("shop")}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grocery;
