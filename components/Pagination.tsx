"use client";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { Metadata } from "@/types/products";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationItems = ({ metadata }: { metadata: Metadata | undefined }) => {
  const { locale } = useParams();

  const pathName = usePathname();
  const { replace } = useRouter();
  const getSearchParams = useSearchParams();

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(getSearchParams.toString());
    params.set("page", pageNumber.toString());
    replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div className="flex gap-2">
      {metadata && (
        <>
          <button
            onClick={() => createPageUrl(metadata.currentPage - 1)}
            disabled={metadata.currentPage === 1}
            className="border border-gray-300 hover:border-main transition-all duration-300 text-gray-500 disabled:bg-gray-300 hover:bg-main hover:text-white rounded-md w-[40px] h-[40px] disabled:pointer-events-none
            flex items-center justify-center"
          >
            {locale == "en" ? (
              <ChevronLeft size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>

          {Array.from({ length: metadata.numberOfPages }, (_, i) => (
            <button
              key={i}
              onClick={() => createPageUrl(i + 1)}
              className={`border cursor-pointer rounded-md w-[40px] h-[40px] ransition-all duration-300 ${
                metadata.currentPage === i + 1
                  ? "bg-main border-main text-white"
                  : "text-gray-500 border-gray-300 hover:bg-main hover:text-white hover:border-main"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => createPageUrl(metadata.currentPage + 1)}
            disabled={metadata.currentPage === metadata.numberOfPages}
            className="border border-gray-300 hover:border-main transition-all duration-300 text-gray-500 disabled:bg-gray-300 hover:bg-main hover:text-white rounded-md w-[40px] h-[40px] disabled:pointer-events-none
            flex items-center justify-center"
          >
            {locale == "en" ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </button>
        </>
      )}
      {/* الزر السابق */}
    </div>
  );
};

export default PaginationItems;
