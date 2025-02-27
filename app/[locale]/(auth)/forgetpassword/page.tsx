"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgetPaswordData, ForgetPaswordSchema } from "@/validation/forgetPas";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import FormHeader from "@/components/FormHeader";
import FormFooter from "@/components/FormFooter";

const ForgetPassword = () => {
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
  } = useForm<ForgetPaswordData>({
    resolver: zodResolver(ForgetPaswordSchema),
  });

  const onSubmit = async (data: ForgetPaswordData) => {
    try {
      setIsloading(true);
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        data,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response?.data?.statusMsg === "success") {
        router.push(`/${locale}/resetcode`);
      }
    } catch (error: any) {
      setErrMsg(error.response?.data?.errors?.msg || t("somethingWrong"));
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="w-full px-4 min-h-screen flex items-center justify-center bg-light-100 dark:bg-dark-100">
      <Card className="w-full sm:w-[500px] dark:bg-dark-200">
        <FormHeader val="forget" />
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={`flex flex-col gap-2 flex-1`}>
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
            </div>
          </form>
        </CardContent>
        <FormFooter />
      </Card>
    </div>
  );
};

export default ForgetPassword;
