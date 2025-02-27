"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VerifyData, VerifySchema } from "@/validation/resetCode";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import FormHeader from "@/components/FormHeader";
import FormFooter from "@/components/FormFooter";

const ResetCode = () => {
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
  } = useForm<VerifyData>({
    resolver: zodResolver(VerifySchema),
  });

  const onSubmit = async (data: VerifyData) => {
    console.log(data);
    try {
      setIsloading(true);
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        data,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response?.data?.status === "Success") {
        router.push(`/${locale}/resetpassword`);
      }
    } catch (error: any) {
      setErrMsg(error.response?.data?.message || t("invaildresetcode"));
    } finally {
      setIsloading(false);
    }
  };

  const { onChange, onBlur, ref } = register("resetCode");

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
              <Label>{t("resetCode")}</Label>
              <div className="w-fit mx-auto" dir="ltr">
                <InputOTP
                  maxLength={6}
                  name="resetCode"
                  onChange={(value) => onChange({ target: { value } })}
                  onBlur={onBlur}
                  ref={ref}
                  className="mx-auto w-fit"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              {errors.resetCode && (
                <p className="text-red-500 text-sm">
                  {t(errors.resetCode.message)}
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

export default ResetCode;
