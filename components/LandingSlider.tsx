"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Button } from "./ui/button";
import { MoveLeft, MoveRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

const LandingSlider = () => {
  const { locale } = useParams();
  const t = useTranslations("sliderLaning");

  const SliderData = [
    {
      img: "/slide-1.jpg",
      small: t("slide1.small"),
      header: t("slide1.header"),
      sub: t("slide1.sub"),
    },
    {
      img: "/slider-2.jpg",
      small: t("slide2.small"),
      header: t("slide2.header"),
      sub: t("slide2.sub"),
    },
  ];

  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      className="w-full"
    >
      {SliderData.map((slide, i) => (
        <SwiperSlide
          key={i}
          className="!h-full rounded-lg px-4 md:px-12 py-32 relative z-1 overflow-hidden"
        >
          <div
            className={`-z-1 absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat ${
              locale === "ar" ? "scale-x-[-1]" : ""
            }`}
            style={{ backgroundImage: `url(${slide.img})` }}
          />
          <div className="max-w-[500px] relative z-10">
            <div className="rounded-sm px-1 bg-yellow-500 w-fit text-black font-semibold text-[10px] md:text-base">
              {slide.small}
            </div>
            <div className="mt-5 text-2xl md:text-5xl font-extrabold text-black">
              {slide.header}
            </div>
            <div className="mt-5 text-xs md:text-lg text-light-gray">
              {slide.sub}
            </div>
            <Link href={`/${locale}/products`} className="mt-5 block">
              <Button className="text-xs py-3 md:text-lg flex items-center dark:bg-black dark:text-white dark:hover:bg-slate-900">
                {t("shop")} {locale == "en" ? <MoveRight /> : <MoveLeft />}
              </Button>
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default LandingSlider;
