"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MoveLeft, MoveRight, Plus, Star } from "lucide-react";
import { Button } from "./ui/button";
import Products from "./Products";

const data = [
  {
    sold: 1607,
    images: [
      "https://ecommerce.routemisr.com/Route-Academy-products/1680396038346-1.jpeg",
    ],
    subcategory: [{ _id: "1", name: "Men's Clothing" }],
    ratingsQuantity: 20,
    id: "6428cf07dc1175abc65ca049",
    title: "NSW Everyday Essentials Socks",
    price: 1079,
    priceAfterDiscount: 634,
    imageCover:
      "https://ecommerce.routemisr.com/Route-Academy-products/1680396038304-cover.jpeg",
    ratingsAverage: 4.2,
  },
  {
    sold: 1608,
    images: [
      "https://ecommerce.routemisr.com/Route-Academy-products/1680395860011-4.jpeg",
    ],
    subcategory: [{ _id: "2", name: "Men's Clothing" }],
    ratingsQuantity: 17,
    id: "6428ce55dc1175abc65ca043",
    title: "Court Tennis Track Pants Black",
    price: 3159,
    priceAfterDiscount: 2199,
    imageCover:
      "https://ecommerce.routemisr.com/Route-Academy-products/1680395859874-cover.jpeg",
    ratingsAverage: 2.8,
  },
  {
    sold: 1608,
    images: [
      "https://ecommerce.routemisr.com/Route-Academy-products/1680395860011-4.jpeg",
    ],
    subcategory: [{ _id: "2", name: "Men's Clothing" }],
    ratingsQuantity: 17,
    id: "6428ce55dc1175abc65ca043",
    title: "Court Tennis Track Pants Black",
    price: 3159,
    priceAfterDiscount: 2199,
    imageCover:
      "https://ecommerce.routemisr.com/Route-Academy-products/1680395859874-cover.jpeg",
    ratingsAverage: 2.8,
  },
];

const BestSale = () => {
  const t = useTranslations("BestSale");
  const { locale } = useParams();

  return (
    <div>
      <h2 className="text-3xl font-bold px-4 mb-10">{t("title")}</h2>
      <div className="flex overflow-x-auto gap-4 py-3 px-1">
        <div
          className="box rounded-lg px-5 py-8 min-w-[250px] bg-cover"
          style={{ backgroundImage: "url(/banner-deal.png)" }}
        >
          <div className="text-3xl font-bold mb-2 text-white">{t("head")}</div>
          <div className="font-bold text-white">{t("sub")}</div>
          <Link href={`/${locale}/products`} className="mt-5 block">
            <Button className="text-xs mt-4 !py-4 md:text-lg flex items-center dark:bg-main dark:text-white dark:hover:bg-green-700 bg-main hover:bg-green-700 !transition-all duration-500">
              {t("shop")} {locale == "en" ? <MoveRight /> : <MoveLeft />}
            </Button>
          </Link>
        </div>
        <Products limit={4} customClass="flex items-center gap-6" />
      </div>
    </div>
  );
};

export default BestSale;
