"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import MoonIcon from "./icons/MoonIcon";
import SunIcon from "./icons/SunIcon";

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => {
    setMounted(true); // Move setMounted inside useEffect

    if (theme === "system") {
      const isDarkTheme = window?.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      const defaultTheme = isDarkTheme ? "dark" : "light";
      setTheme(defaultTheme);
    }
  }, [theme, setTheme]); // Add theme and setTheme to the dependency array
  if (!mounted)
    return (
      // When mounted on client, now we can reserve the space for icon
      <div className="w-5"></div>
    );

  return (
    <div className="flex items-center order-last">
      {theme == "dark" ? (
        <button
          onClick={() => setTheme("light")}
          className="text-gray-300 rounded-full outline-none focus:outline-none"
        >
          <span className="sr-only">Light Mode</span>

          <MoonIcon />
        </button>
      ) : (
        <button
          onClick={() => setTheme("dark")}
          className="text-gray-900 rounded-full outline-none focus:outline-none focus-visible:ring focus-visible:ring-gray-100 focus:ring-opacity-20"
        >
          <span className="sr-only">Dark Mode</span>
          <SunIcon />
        </button>
      )}
    </div>
  );
};

export default ThemeChanger;
