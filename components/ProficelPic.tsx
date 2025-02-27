"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { clearToken } from "@/store/slices/tokenSlice";
import { useTranslations } from "next-intl";

const ProfilePic = () => {
  const t = useTranslations("profile");

  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const handleLogOut = () => {
    router.push(`/${locale}/`);
    dispatch(clearToken());
  };

  return (
    <DropdownMenu dir={locale == "en" ? "ltr" : "rtl"}>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-[30px] h-[30px] cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="bg-light-100 dark:bg-dark-100">
            NA
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[120px] mx-4">
        <DropdownMenuLabel className="font-bold">
          {t("My Account")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href={`/${locale}/profile`}>{t("profile")}</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogOut}
          className="!text-red-500 cursor-pointer"
        >
          {t("log out")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfilePic;
