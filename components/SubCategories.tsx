"use client";

import { SubCategoriesData } from "@/types/subCategories";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "./Loader";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export const getSubCategories = async (): Promise<SubCategoriesData> => {
  const { data } = await axios.get<SubCategoriesData>(
    "https://ecommerce.routemisr.com/api/v1/subcategories?limit=60"
  );

  return data;
};

const SubCategories = () => {
  const { locale } = useParams();
  const t = useTranslations("subCate");

  const { data, isLoading } = useQuery({
    queryKey: ["subCategories"],
    queryFn: getSubCategories,
    gcTime: 1000 * 60 * 10,
  });

  if (isLoading) <Loader screen={true} />;

  return (
    <div className="container mx-auto px-4 lg:px-10 py-12">
      <div className="text-4xl font-bold px-4 mb-8 text-center">
        {t("subcategries")}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {data?.data.map((subCat) => (
          <Link
            key={subCat._id}
            href={`/${locale}/products?subcategory=${subCat.name}-${subCat._id}`}
            className="box rounded-lg px-4 h-[70px] bg-light-100 dark:bg-dark-100 hover:text-main transition-all duration-300 flex items-center justify-center"
          >
            {t(subCat.name)}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubCategories;
