"use client";

import Cart from "@/components/Cart";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { verifyToken } from "@/store/slices/tokenSlice";
import { AppDispatch, RootState } from "@/store/store";
import { UserInformationProps } from "@/types/userInfo";
import { UpdateUserData, UpdateUserSchema } from "@/validation/updateData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const getUserData = async (id: string): Promise<UserInformationProps> => {
  const response = await axios.get<UserInformationProps>(
    `https://ecommerce.routemisr.com/api/v1/users/${id}`
  );
  return response.data;
};

const Page = () => {
  const t = useTranslations("sign");
  const [fecthLodaing, setFecthLodaing] = useState<boolean>(false);
  const { id, token } = useSelector((state: RootState) => state.token);
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  const { data, isLoading } = useQuery({
    queryKey: ["userInfo", id],
    queryFn: () => getUserData(id as string),
    enabled: !!id,
    refetchOnMount: true,
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<UpdateUserData>({
    resolver: zodResolver(UpdateUserSchema),
  });

  useEffect(() => {
    if (data?.data) {
      reset({
        name: data.data.name,
        email: data.data.email,
        phone: data.data.phone,
      });
    }
  }, [data, reset]);

  if (isLoading) return <Loader screen={true} />;

  const onSubmit = async (formData: UpdateUserData) => {
    try {
      setFecthLodaing(true);
      const updatedData: Partial<UpdateUserData> = {};
      if (formData.name !== data?.data.name) updatedData.name = formData.name;
      if (formData.email !== data?.data.email)
        updatedData.email = formData.email;
      if (formData.phone !== data?.data.phone)
        updatedData.phone = formData.phone;

      if (Object.keys(updatedData).length === 0) {
        setFecthLodaing(false);
        return;
      }

      const response = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/users/updateMe/",
        updatedData,
        {
          headers: { "Content-Type": "application/json", token: token },
        }
      );

      if (response.data.message === "success") {
        toast.success(t("profileUpdated"));
        queryClient.invalidateQueries({ queryKey: ["userInfo", id] });
      }
    } catch (error: any) {
      toast.error(t(error.response.data.errors.msg));
    } finally {
      setFecthLodaing(false);
    }
  };

  const nameValue = watch("name");
  const emailValue = watch("email");
  const phoneValue = watch("phone");

  return (
    <>
      {data?.data && (
        <div className="container mx-auto px-4 lg:px-10 py-10">
          {/* HEAD */}
          <div className="h-[300px] text-center rounded-xl bg-light-100 dark:bg-dark-100 flex-1 relative z-1 flex flex-col justify-end items-center">
            <Image
              src={"/profile-2.webp"}
              alt="prof"
              width={1000}
              height={1000}
              className="absolute top-0 left-0 w-full h-full rounded-xl -z-1 object-cover"
            />
            <div className="relative -mb-[80px]">
              <Image
                src={"https://github.com/shadcn.png"}
                alt="profImage"
                width={160}
                height={160}
                className="rounded-full"
              />
              <div className="text-lg mt-3">{data.data.name}</div>
            </div>
          </div>
          {/* FORM */}
          <div className="flex gap-6 flex-col md:flex-row mt-32">
            <div className="md:w-1/3 bg-light-100 dark:bg-dark-100 rounded-lg p-4">
              <div className="text-lg font-bold">{t("yourInfo")}</div>
              <form
                className="flex flex-col gap-4 py-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col gap-2 flex-1">
                  <Label>{t("name")}</Label>
                  <Input type="text" {...register("name")} />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {t(errors.name.message)}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <Label>{t("email")}</Label>
                  <Input type="email" {...register("email")} />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {t(errors.email.message)}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <Label>{t("phone")}</Label>
                  <Input type="text" {...register("phone")} />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {t(errors.phone.message)}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={
                    fecthLodaing ||
                    (data.data.email === emailValue &&
                      data.data.name === nameValue &&
                      data.data.phone === phoneValue)
                  }
                  className="mt-4 bg-main hover:bg-green-500 dark:bg-main dark:hover:bg-green-500 !text-white"
                >
                  {!fecthLodaing ? t("update") : `${t("Loading")}...`}
                </Button>
              </form>
            </div>
            <div className="md:w-2/3 bg-light-100 dark:bg-dark-100 rounded-lg p-4">
              <Cart />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
