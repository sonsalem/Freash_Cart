"use client";

import { ThemeContext } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { useContext, useEffect, useState } from "react";

const ChangeTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  // Theme

  const handleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div onClick={() => handleTheme()} className="changeMoog cursor-pointer">
      {theme === "dark" ? <Moon /> : <Sun />}
    </div>
  );
};

export default ChangeTheme;
