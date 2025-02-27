"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

const Featuers = () => {
  const t = useTranslations("features");

  const featuresData = [
    {
      id: 1,
      icon: "/clock.svg",
      title: t("feature1.title"),
      description: t("feature1.description"),
    },
    {
      id: 2,
      icon: "/gift.svg",
      title: t("feature2.title"),
      description: t("feature2.description"),
    },
    {
      id: 3,
      icon: "/package.svg",
      title: t("feature3.title"),
      description: t("feature3.description"),
    },
    {
      id: 4,
      icon: "/refresh-cw.svg",
      title: t("feature4.title"),
      description: t("feature4.description"),
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center sm:text-start">
        {featuresData.map((feat) => (
          <div className="flex flex-col gap-4" key={feat.id}>
            <Image
              className="mx-auto sm:mx-0"
              src={feat.icon}
              alt="iconImage"
              width={40}
              height={40}
            />
            <div className="font-semibold">{feat.title}</div>
            <div className="text-sm text-light-gray">{feat.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featuers;
