"use client";

import Image from "next/image";
import { CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useTranslations } from "next-intl";
import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";

const FormHeader = ({ val }: { val: string }) => {
  const t = useTranslations("sign");
  const { theme } = useContext(ThemeContext);

  return (
    <CardHeader>
      <CardTitle className="w-fit mx-auto mb-2">
        <Image
          src={theme === "dark" ? "/freshcart-logo.png" : "/freshcart-logo.svg"}
          alt="logo"
          width={160}
          height={31}
        />
      </CardTitle>
      <CardDescription className="w-fit mx-auto">{t(val)}</CardDescription>
    </CardHeader>
  );
};

export default FormHeader;
