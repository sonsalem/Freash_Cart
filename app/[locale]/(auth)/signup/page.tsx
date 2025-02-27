"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SingUpData, SingUpSchema } from "@/validation/singup";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import FormHeader from "@/components/FormHeader";
import FormFooter from "@/components/FormFooter";

const SingUp = () => {
  const { locale } = useParams();
  const t = useTranslations("sign");
  const router = useRouter();
  const [errMsg, setErrMsg] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);

  if (localStorage.getItem("token")) router.push(`/${locale}`);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SingUpData>({
    resolver: zodResolver(SingUpSchema),
  });
  const onSubmit = async (data: SingUpData) => {
    try {
      setIsloading(true);
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response?.data?.message === "success") {
        router.push("/singin");
      }
    } catch (error: any) {
      console.log(error.response?.data);
      const errorMessage = error.response?.data?.message || t("somethingWrong");
      setErrMsg(t(errorMessage));
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="w-full px-4 min-h-screen flex items-center justify-center bg-light-100 dark:bg-dark-100">
      <Card className="w-full sm:w-[500px] dark:bg-dark-200">
        <FormHeader val="up" />
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-2">
              <Label>{t("name")}</Label>
              <Input
                type="text"
                {...register("name")}
                className="focus-visible:ring-main dark:focus-visible:ring-main transition-all"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{t(errors.name.message)}</p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="flex flex-col gap-2 flex-1">
                <Label>{t("email")}</Label>
                <Input
                  type="email"
                  {...register("email")}
                  className="focus-visible:ring-main dark:focus-visible:ring-main transition-all"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">
                    {t(errors.email.message)}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <Label>{t("phone")}</Label>
                <Input
                  type="text"
                  {...register("phone")}
                  className="focus-visible:ring-main dark:focus-visible:ring-main transition-all"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">
                    {t(errors.phone.message)}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="flex flex-col gap-2 flex-1">
                <Label>{t("password")}</Label>
                <Input
                  type="password"
                  {...register("password")}
                  className="focus-visible:ring-main dark:focus-visible:ring-main transition-all"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {t(errors.password.message)}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <Label>{t("rePassword")}</Label>
                <Input
                  type="password"
                  {...register("rePassword")}
                  className="focus-visible:ring-main dark:focus-visible:ring-main transition-all"
                />
                {errors.rePassword && (
                  <p className="text-red-500 text-sm">
                    {t(errors.rePassword.message)}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="mt-4 bg-main hover:bg-green-500 dark:bg-main dark:hover:bg-green-500 !text-white"
              >
                {!isLoading ? t("send") : `${t("Loading")}...`}
              </Button>
              {!isLoading && errMsg && (
                <p className="text-red-600 text-center text-sm font-semibold">
                  {errMsg}
                </p>
              )}
              <Link
                href={`/${locale}/signin`}
                className="text-green-600 text-sm"
                style={{ textDecoration: "underline" }}
              >
                {t("haveAccount")}
              </Link>
            </div>
          </form>
        </CardContent>
        <FormFooter />
      </Card>
    </div>
  );
};

export default SingUp;
