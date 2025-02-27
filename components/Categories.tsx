"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { CategoryDate, CatTypes } from "@/types/categories";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Loader from "./Loader";
import Link from "next/link";
import { useParams } from "next/navigation";

export const getCategories = async (): Promise<CatTypes> => {
  const { data } = await axios.get<CatTypes>(
    "https://ecommerce.routemisr.com/api/v1/categories"
  );
  return data;
};

const Categories = ({ slider }: { slider: boolean }) => {
  const t = useTranslations("categories");
  const { locale } = useParams();

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 8,
    gcTime: 1000 * 60 * 5,
    select: (data) => data.data,
  });

  if (isLoading) return <Loader screen={!slider} />;

  const randerCategories = () => {
    return (
      <>
        {categories?.map((cat: CategoryDate) => (
          <SwiperSlide key={cat._id}>
            <Link
              href={`/${locale}/products?category=${cat.name}-${cat._id}`}
              className="block"
            >
              {slider && <div className="mt-[55px]"></div>}
              <div
                className="border-[1px] border-gray-300 dark:border-gray-800 p-4 rounded-lg
                    hover:border-main dark:hover:border-main hover:shadow-xl !transition-all cursor-pointer duration-500"
              >
                <Image
                  src={cat.image}
                  alt={cat.slug}
                  width={300}
                  height={300}
                  className="w-[280px] h-[200px] border-[1px] border-gray-300 dark:border-gray-800 object-cover rounded-lg mx-auto"
                />
                <div className="text-light-gray text-center mt-3">
                  {t(cat.name)}
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </>
    );
  };

  return (
    <div>
      {slider ? (
        <div className="text-3xl font-bold px-4 mb-4">{t("Categories")}</div>
      ) : (
        <div className="text-4xl font-bold px-4 mb-8 text-center">
          {t("Categories")}
        </div>
      )}
      <div lang="ltr">
        {slider ? (
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
              1299: { slidesPerView: 6 },
            }}
            navigation
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="w-full"
          >
            {randerCategories()}
          </Swiper>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 justify-center">
            {randerCategories()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
