"use client";
import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeChanger from "./DarkSwitch";
import { Disclosure } from "@headlessui/react";
import { DisclosureButton } from "@headlessui/react";
import React, { useState } from "react";
import { MenuIcon } from "./icons/MenuIcon";

export const Navbar: FC = () => {
  const pathname = usePathname();

  const navigation = [
    { label: "Главная", value: "/" },
    { label: "О нас", value: "/about" },
    { label: "ЧаВо", value: "/faq" },
    { label: "Блог", value: "/blog" },
    {
      label: "Мерч",
      value: "merch",
      external: true,
      link: "https://codesisters.vsemaykishop.ru/",
    },
  ];

  const [isNavListActive, setOpen] = useState(false);

  function onNavActiveClick() {
    setOpen(!isNavListActive);
  }

  const navListStyles = isNavListActive
    ? "col-span-2 items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex"
    : "hidden";

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname?.startsWith(path);
  };

  // Базовые стили для ссылок
  const navLinkStyles = "inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:underline";

  // Стили для активной ссылки
  const getNavLinkClasses = (path: string) => {
    const isActiveLink = isActive(path);
    return `${navLinkStyles} ${isActiveLink ? 'font-bold text-green-600 dark:text-green-400' : ''}`;
  };

  return (
    <div className="w-full top-0 sticky z-[100] background">
      <nav className="container relative grid grid-rows-(max-content) grid-cols-2 items-center justify-between p-8 mx-auto lg:justify-between">
        {/* Logo */}
        <Link href="/">
          <span className="flex items-center space-x-2 text-2xl font-medium dark:text-gray-100">
            <span className="font-ubuntu text-3xl font-bold green -mx-2">
              {"}"}
            </span>
            <span className="font-ubuntu text-3xl font-bold purple -mx-2">
              {"{"}
            </span>
            <span className="font-ubuntu">code_sisters</span>
          </span>
        </Link>

        <div className="flex items-center ml-auto space-x-6">
          {/* Desktop Menu */}
          <div className="hidden text-center lg:flex lg:items-center">
            <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
              {navigation.map((menu, index) => (
                <li className="mr-3 nav__item w-max" key={index}>
                  {menu.external ? (
                    <a
                      href={menu.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={navLinkStyles}
                    >
                      {menu.label}
                    </a>
                  ) : (
                    <Link href={menu.value}>
                      <button className={getNavLinkClasses(menu.value)}>
                        {menu.label}
                      </button>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Theme Changer */}
          <div className="gap-3 nav__item mr-2 lg:flex ml-auto lg:ml-0 lg:order-2">
            <ThemeChanger />
          </div>

          {/* Mobile Menu Toggle */}
          <Disclosure>
            {({ open }) => (
              <>
                <DisclosureButton
                  onClick={() => onNavActiveClick()}
                  aria-label="Toggle Menu"
                  className="px-2 py-1 text-gray-500 rounded-md lg:hidden"
                >
                  <MenuIcon open={open} className="w-6 h-6 fill-current" />
                </DisclosureButton>
              </>
            )}
          </Disclosure>
        </div>

        {/* Mobile Menu */}
        <ul className={`${navListStyles} lg:hidden`}>
          {navigation.map((menu, index) => (
            <li className="mr-3 nav__item" key={index}>
              {menu.external ? (
                <a
                  href={menu.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={navLinkStyles}
                >
                  {menu.label}
                </a>
              ) : (
                <Link href={menu.value}>
                  <button className={getNavLinkClasses(menu.value)}>
                    {menu.label}
                  </button>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
