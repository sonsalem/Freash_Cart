"use client";

import { BrandDataProps, BrandProps } from "@/types/brands";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Loader from "./Loader";

const getBrands = async (): Promise<BrandDataProps> => {
  const { data } = await axios.get<BrandDataProps>(
    "https://ecommerce.routemisr.com/api/v1/brands"
  );
  return data;
};

const Brands = () => {
  const { data: brands, isLoading } = useQuery({
    queryKey: ["Brands"],
    queryFn: getBrands,
    staleTime: 1000 * 60 * 8,
    gcTime: 1000 * 60 * 5,
    select: (data) => data.data,
  });

  if (isLoading) return <Loader screen={true} />;

  return (
    <div className="flex justify-center items-center flex-wrap gap-6">
      {brands?.map((brand: BrandProps) => (
        <div className="box text-center" key={brand._id}>
          <Image src={brand.image} alt={brand.name} width={200} height={200} />
          <div className="text-light-gray">{brand.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Brands;
