"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

const Loader = ({ screen }: { screen?: boolean }) => {
  const t = useTranslations("load");

  return (
    <div
      className={`loader mx-auto w-full flex justify-center flex-col items-center gap-4 ${
        screen && "min-h-screen"
      }`}
    >
      <Image src="/loading.svg" alt="loader" width={80} height={80} />
      {t("Loading")}...
    </div>
  );
};

export default Loader;
