"use client";

import { ChevronLeft, ChevronRight, Filter, X } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "use-intl";
import { Input } from "./ui/input";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "./Categories";
import Loader from "./Loader";
import { getSubCategories } from "./SubCategories";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const FilterProducts = ({ open, setOpen }: { open: boolean; setOpen: any }) => {
  const t = useTranslations("filter");
  const subTrns = useTranslations("subCate");
  const catTrans = useTranslations("categories");
  const { locale } = useParams();
  const { replace } = useRouter();
  const search = useSearchParams();
  const [cats, setCats] = useState<
    {
      id: string;
      name: string;
    }[]
  >();

  const { data: cates, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    gcTime: 1000 * 60 * 3,
  });

  useEffect(() => {
    if (!isLoading) {
      const CatData = cates?.data.map((el) => ({
        id: el._id,
        name: el.name,
      }));

      setCats(CatData);
    }
  }, [isLoading]);

  const { data: subCates, isLoading: isLoading2 } = useQuery({
    queryKey: ["subCategories"],
    queryFn: getSubCategories,
    gcTime: 1000 * 60 * 3,
  });

  const handleFilterChange = (name: string, value: string) => {
    if (typeof window !== "undefined") {
      const params: URLSearchParams = new URLSearchParams(
        window.location.search
      );
      params.set(name, value);
      params.delete("page");
      replace(`${window.location.pathname}?${params.toString()}`);
    }
  };

  const WIDTH_MENU = 350;
  const degree = open === true ? "0" : `-${WIDTH_MENU}px`;

  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  if (isLoading && isLoading2) return <Loader screen={true} />;

  return (
    <>
      <div
        className={`bg-[#000000A1] w-full h-full fixed top-0 left-0 transition-all duration-200 ${
          open ? "z-50" : "-z-[10] opacity-0"
        }`}
      ></div>
      <div
        ref={filterRef}
        className={`fixed lg:static h-screen lg:h-full transition-all duration-500 lg:transition-none overflow-y-auto top-0 z-[51] px-4 py-10 max-w-full lg:w-[250px] xl:!w-[400px] bg-white dark:bg-dark-200 shadow-md lg:shadow-none `}
        style={{
          [locale === "en" ? "left" : "right"]: degree,
          width: `${WIDTH_MENU}px`,
        }}
      >
        <X
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 cursor-pointer lg:hidden"
        />
        <div className="text-2xl font-bold  mb-10">{t("Filter")}</div>
        <div className="flex flex-col gap-6">
          <div className="box mb-4">
            <div className="font-bold text-xl mb-4">{t("Search")}</div>
            <Input
              placeholder={t("searchNot")}
              onChange={(e) =>
                handleFilterChange("name", e.target.value.toLowerCase())
              }
              type="search"
              className="focus-visible:ring-main dark:focus-visible:ring-main transition-all"
            />
          </div>
          <div className="box mb-4">
            <div className="font-bold text-xl mb-4">{t("Categories")}</div>
            <div className="flex flex-col">
              <div
                onClick={() => handleFilterChange("category", ``)}
                className={`mb-2 py-2 border-b-[1px] hover:text-main transition-all duration-500 cursor-pointer flex justify-between items-center dark:border-b-gray-800 ${
                  search.get("category")?.length == 0 || !search.get("category")
                    ? "text-main"
                    : ""
                }`}
              >
                {t("all")}
                {locale == "en" ? (
                  <ChevronRight size={15} />
                ) : (
                  <ChevronLeft size={15} />
                )}
              </div>
              {cats?.map((cat) => (
                <div
                  onClick={() =>
                    handleFilterChange("category", `${cat.name}-${cat.id}`)
                  }
                  className={`mb-2 py-2 border-b-[1px] hover:text-main transition-all duration-500 cursor-pointer flex justify-between items-center dark:border-b-gray-800 ${
                    search.get("category")?.includes(cat.id) ? "text-main" : ""
                  }`}
                  key={cat.id}
                >
                  {catTrans(cat.name)}
                  {locale == "en" ? (
                    <ChevronRight size={15} />
                  ) : (
                    <ChevronLeft size={15} />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="box mb-4">
            <div className="font-bold text-xl mb-4">{t("Sort")}</div>
            <RadioGroup
              defaultValue={search.get("sort") || ""}
              onValueChange={(value) => handleFilterChange("sort", value)}
              className="flex flex-col gap-3"
            >
              <div
                className={`flex items-center gap-x-2 ${
                  locale == "ar" && "flex-row-reverse"
                }`}
              >
                <RadioGroupItem
                  value=""
                  id="normal"
                  className="!text-main data-[state=checked]:!bg-main data-[state=checked]:!border-main"
                />
                <Label htmlFor="normal" className="cursor-pointer">
                  {t("normal")}
                </Label>
              </div>
              <div
                className={`flex items-center gap-x-2 ${
                  locale == "ar" && "flex-row-reverse"
                }`}
              >
                <RadioGroupItem
                  value="-title"
                  id="r3"
                  className="!text-main data-[state=checked]:!bg-main data-[state=checked]:!border-main"
                />
                <Label htmlFor="r3" className="cursor-pointer">
                  {t("ZTA")}
                </Label>
              </div>
              <div
                className={`flex items-center gap-x-2 ${
                  locale == "ar" && "flex-row-reverse"
                }`}
              >
                <RadioGroupItem
                  value="title"
                  id="r4"
                  className="!text-main data-[state=checked]:!bg-main data-[state=checked]:!border-main"
                />
                <Label htmlFor="r4" className="cursor-pointer">
                  {t("ATZ")}
                </Label>
              </div>
              <div
                className={`flex items-center gap-x-2 ${
                  locale == "ar" && "flex-row-reverse"
                }`}
              >
                <RadioGroupItem
                  value="price"
                  id="r1"
                  className="!text-main data-[state=checked]:!bg-main data-[state=checked]:!border-main"
                />
                <Label htmlFor="r1" className="cursor-pointer">
                  {t("LTH")}
                </Label>
              </div>
              <div
                className={`flex items-center gap-x-2 ${
                  locale == "ar" && "flex-row-reverse"
                }`}
              >
                <RadioGroupItem
                  value="-price"
                  id="r2"
                  className="!text-main data-[state=checked]:!bg-main data-[state=checked]:!border-main"
                />
                <Label htmlFor="r2" className="cursor-pointer">
                  {t("HTL")}
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="box mb-4">
            <div className="font-bold text-xl mb-4">{t("subcategries")}</div>
            <div className="grid grid-cols-2 gap-x-4">
              <div
                onClick={() => handleFilterChange("subcategory", ``)}
                className={`mb-2 py-2 border-b-[1px] hover:text-main transition-all duration-500 cursor-pointer flex justify-between items-center dark:border-b-gray-800 ${
                  search.get("subcategory")?.length == 0 ||
                  !search.get("subcategory")
                    ? "text-main"
                    : ""
                }`}
              >
                {t("all")}
                {locale == "en" ? (
                  <ChevronRight size={15} />
                ) : (
                  <ChevronLeft size={15} />
                )}
              </div>
              {subCates?.data.map((subCat) => (
                <div
                  onClick={() =>
                    handleFilterChange(
                      "subcategory",
                      `${subCat.name}-${subCat._id}`
                    )
                  }
                  className={`mb-2 py-2 border-b-[1px] hover:text-main transition-all duration-500 cursor-pointer flex justify-between items-center dark:border-b-gray-800 ${
                    search.get("subcategory")?.includes(subCat._id)
                      ? "text-main"
                      : ""
                  }`}
                  key={subCat._id}
                >
                  {subTrns(subCat.name)}
                  {locale == "en" ? (
                    <ChevronRight size={15} />
                  ) : (
                    <ChevronLeft size={15} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterProducts;
