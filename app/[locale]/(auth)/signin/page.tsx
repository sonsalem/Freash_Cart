"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SingInData, SingInSchema } from "@/validation/singin";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setToken } from "@/store/slices/tokenSlice";
import FormHeader from "@/components/FormHeader";
import FormFooter from "@/components/FormFooter";

const SingIn = () => {
  const { locale } = useParams();
  const t = useTranslations("sign");
  const router = useRouter();
  const [errMsg, setErrMsg] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  if (localStorage.getItem("token")) router.push(`/${locale}`);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SingInData>({
    resolver: zodResolver(SingInSchema),
  });
  const onSubmit = async (data: SingInData) => {
    try {
      setIsloading(true);
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response?.data?.message === "success") {
        dispatch(setToken(response?.data?.token));
        localStorage.setItem("userId", response?.data?.id);
        router.push(`/${locale}`);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || t("somethingWrong");
      setErrMsg(t(errorMessage));
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="w-full px-4 min-h-screen flex items-center justify-center bg-light-100 dark:bg-dark-100">
      <Card className="w-full sm:w-[500px] dark:bg-dark-200">
        <FormHeader val="in" />
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
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
              <Link
                href={`/${locale}/forgetpassword`}
                className="text-green-600 text-sm"
                style={{ textDecoration: "underline" }}
              >
                {t("forgetPas")}
              </Link>
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
                href={`/${locale}/signup`}
                className="text-green-600 text-sm"
                style={{ textDecoration: "underline" }}
              >
                {t("dontHaveAccount")}
              </Link>
            </div>
          </form>
        </CardContent>
        <FormFooter />
      </Card>
    </div>
  );
};

export default SingIn;
