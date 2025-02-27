"use client";

import ChangeLanguage from "./ChangeLanguage";
import ChangeTheme from "./ChangeTheme";
import { CardFooter } from "./ui/card";

const FormFooter = () => {
  return (
    <CardFooter className="flex justify-between items-center gap-4">
      <ChangeLanguage />
      <ChangeTheme />
    </CardFooter>
  );
};

export default FormFooter;
