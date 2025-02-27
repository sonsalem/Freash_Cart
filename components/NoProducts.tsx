"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

const NoProducts = () => {
  const t = useTranslations("no");

  return (
    <div className="NoProducts mx-auto flex justify-center flex-col items-center gap-4 h-full w-fit text-center min-h-[50vh]">
      <Image
        src="/no.png"
        alt="NoProducts"
        width={150}
        height={150}
        className="mx-auto"
      />
      {t("noItems")}
    </div>
  );
};

export default NoProducts;
