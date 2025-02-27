"use client";

import { ProductPros, ProductsDataProps } from "@/types/products";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Filter } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import NoProducts from "./NoProducts";
import FilterProducts from "./Filter";
import PaginationItems from "./Pagination";
import RenderProduct from "./RenderProduct";

const getProducts = async (
  limit: number | undefined,
  catId: string | undefined,
  subCatId: string | undefined,
  sort: string | undefined,
  page: string | undefined
): Promise<ProductsDataProps> => {
  let path = "https://ecommerce.routemisr.com/api/v1/products";
  const params: URLSearchParams = new URLSearchParams();

  limit && params.set("limit", limit.toString());

  catId && params.set("category", catId);

  subCatId && params.set("subcategory", subCatId);

  sort && params.set("sort", sort);

  page && params.set("page", page);

  if (params.toString()) path = `${path}?${params.toString()}`;

  const { data } = await axios.get<ProductsDataProps>(path);

  return data;
};

const Products = ({
  limit,
  customClass,
  header,
  filter,
  pagination,
}: {
  limit?: number;
  customClass?: string;
  header?: boolean;
  filter?: boolean;
  pagination?: boolean;
}) => {
  const serach = useSearchParams();
  const t = useTranslations("products");

  const subTrns = useTranslations("subCate");
  const catTrans = useTranslations("categories");
  const [open, setOpen] = useState<boolean>(false);

  // Products
  const [title, setTitle] = useState<string | undefined>(undefined);
  const category = serach.get("category");
  const [catName, catId] = category
    ? category.split("-")
    : [undefined, undefined];
  const subCategory = serach.get("subcategory");
  const [subCatName, subCatId] = subCategory
    ? subCategory.split("-")
    : [undefined, undefined];
  const sort = serach.get("sort");
  const page = serach.get("page");

  const { data, isLoading } = useQuery<ProductsDataProps>({
    queryKey: ["products", limit, catId, subCatId, sort, page],
    queryFn: () =>
      getProducts(
        limit ?? undefined,
        catId ?? undefined,
        subCatId ?? undefined,
        sort ?? undefined,
        page ?? undefined
      ),
    gcTime: 1000 * 60 * 3,
  });

  useEffect(() => {
    if (catName != undefined && subCatName == undefined)
      setTitle(catTrans(catName));
    else if (catName == undefined && subCatName != undefined)
      setTitle(subTrns(subCatName));
    else if (catName != undefined && subCatName != undefined)
      setTitle(`${catTrans(catName)} | ${subTrns(subCatName)}`);
    else setTitle(t("products"));
  }, [catName, subCatName]);

  let products = data?.data;
  const metadata = data?.metadata;

  return (
    <div className={` ${filter && "flex gap-6 items-start"}`}>
      {filter && <FilterProducts open={open} setOpen={setOpen} />}
      {isLoading ? (
        <Loader screen={!header} />
      ) : (
        <div className={`flex-1 self-start`}>
          {header && (
            <div className="text-3xl font-bold px-4 mb-10">{t("products")}</div>
          )}
          {filter && (
            <div className="text-2xl flex-wrap gap-4 md:text-4xl font-extrabold py-8 px-5 bg-light-100 dark:bg-dark-100 rounded-lg mb-10 flex justify-between items-center">
              <span>{title}</span>
              <Button
                onClick={() => setOpen((prev) => !prev)}
                className={`!bg-transparent lg:hidden hover:!bg-main hover:!text-white !ring-1 !ring-main !py-3 !text-main`}
              >
                <Filter /> {t("Filter")}
              </Button>
            </div>
          )}
          {products?.length == 0 ? (
            <NoProducts />
          ) : (
            <>
              <div className={`${customClass}`}>
                {products?.map((product: ProductPros) => (
                  <RenderProduct key={product._id} product={product} />
                ))}
              </div>
              {pagination && (
                <div className="mt-8">
                  <PaginationItems metadata={metadata || undefined} />
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
