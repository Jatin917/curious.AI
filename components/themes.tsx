"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

enum ThemeEnum {
  Dark = "Dark Theme",
  Light = "Light Theme",
  System = "System Theme",
}

export default function Themes({ children, borders = true }: { children?: React.ReactNode, borders?: boolean }) {
  const [theme, setTheme] = useState<ThemeEnum>(ThemeEnum.System);

  const handleThemeChange = (selectedTheme: ThemeEnum) => {
    setTheme(selectedTheme);
    if (selectedTheme === ThemeEnum.Dark) {
      localStorage.theme = "Dark Theme";
      return;
    }
    if (selectedTheme === ThemeEnum.Light) {
      localStorage.theme = "Light Theme";
      return;
    }

    // if user has choosed system theme.
    localStorage.removeItem("theme");
  };

  useEffect(() => {
    setTheme(localStorage.theme || ThemeEnum.System);
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "Dark Theme" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }, [handleThemeChange]);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={`rounded-lg ${borders ? " dark:border-white" : "border-none"}`}>
            {children || theme}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-20 text-center">
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => handleThemeChange(ThemeEnum.Light)}>
            Light
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => handleThemeChange(ThemeEnum.Dark)}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => handleThemeChange(ThemeEnum.System)}
          >
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div >
  );
}
