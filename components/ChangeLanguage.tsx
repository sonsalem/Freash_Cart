"use client";

import Image from "next/image";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

const ChangeLanguage = () => {
  const pathName = usePathname();
  const router = useRouter();
  const { locale } = useParams();
  const searchParams = useSearchParams();

  const changeLanguage = () => {
    const currentParams = searchParams.toString();
    let newPath = "";
    if (pathName.startsWith("/en")) {
      newPath = `/ar${pathName.slice(3)}`;
    } else if (pathName.startsWith("/ar")) {
      newPath = `/en${pathName.slice(3)}`;
    }

    router.replace(`${newPath}${currentParams ? `?${currentParams}` : ""}`);

    return null;
  };

  return (
    <div
      onClick={() => changeLanguage()}
      className="flex gap-1 cursor-pointer items-center"
    >
      <Image
        src={
          locale === "en"
            ? "/Flag_of_the_United_Kingdom.svg"
            : "/Flag_of_Egypt.svg"
        }
        alt="flag"
        width={30}
        height={15}
        className="rounded-md min-w-[30px]"
      />
      <span className="hidden sm:block">{locale === "en" ? "EN" : "عربي"}</span>
    </div>
  );
};

export default ChangeLanguage;
