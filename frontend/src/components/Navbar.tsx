"use client";
import { FC } from 'react';
import Link from "next/link";
import ThemeChanger from "./DarkSwitch";
import { Disclosure } from "@headlessui/react";
import React, { useState } from "react";

export const Navbar: FC = () => {
  const navigation = [
    { label: "Главная", value: "/" },
    { label: "О нас", value: "about" },
    { label: "ЧаВо", value: "faq" },
    { label: "Блог", value: "blog" },
    { label: "Мерч", value: "merch", external: true, link: "https://codesisters.vsemaykishop.ru/" }, // добавляем внешний сайт для "Мерч"
  ];

  const [isNavListActive, setOpen] = useState(false)

  function onNavActiveClick() {
    setOpen(!isNavListActive)
  }

  const navListStyles = isNavListActive ? 'col-span-2 items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex' : 'hidden'
  const navLinkStyles = "inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:green focus:green";

  const navLinkHoverStyles = `
    ${navLinkStyles}
    hover:underline
  `;

  return (
    <div className="w-full top-0 sticky z-[100] background">
      {/* <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-1"> */}
      <nav className="container relative grid grid-rows-(max-content) grid-cols-2 items-center justify-between p-8 mx-auto lg:justify-between">
        {/* Logo  */}
        <Link href="/">
          <span className="flex items-center space-x-2 text-2xl font-medium dark:text-gray-100">
            <span className="font-ubuntu text-3xl font-bold green -mx-2">{'}'}</span>
            <span className="font-ubuntu text-3xl font-bold purple -mx-2">{'{'}</span>
            <span className="font-ubuntu">code_sisters</span>
          </span>
        </Link>

        <div className="flex items-center ml-auto space-x-6">
          {/* Menu */}
          <div className="hidden text-center lg:flex lg:items-center">
            <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
              {navigation.map((menu, index) => (
                <li className="mr-3 nav__item w-max" key={index}>
                  {/* Если это внешний линк, заменяем на <a> */}
                  {menu.external ? (
                    <a
                      href={menu.link}
                      target="_blank"
                      rel="noopener noreferrer" // открытие в новой вкладке
                      className={navLinkHoverStyles}
                    >
                      {menu.label}
                    </a>
                  ) : (
                    <Link href={menu.value}>
                    <button
                      className={navLinkHoverStyles}
                    >
                      {menu.label}
                    </button></Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Log in and theme*/}
          <div className="gap-3 nav__item mr-2 lg:flex ml-auto lg:ml-0 lg:order-2">
            <ThemeChanger />
            {/*<div className="hidden mr-3 lg:flex nav__item">
              <Link href="/" className="button px-6 py-2 md:ml-5">
                Войти
              </Link>
            </div>*/}
          </div>

          {/* Mobile Menu Toggle */}
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button
                  onClick={() => onNavActiveClick()}
                  aria-label="Toggle Menu"
                  className="px-2 py-1 text-gray-500 rounded-md lg:hidden">
                  <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    {open && (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    )}
                    {!open && (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </Disclosure.Button>

                {/* <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden ">
                  {navigation.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => onNavClick(item.value)} // Вызов родительской функции для изменения activePage
                      className="w-full px-4 py-2 -ml-4 text-gray-500"
                    >
                      {item.label}
                    </button>
                  ))}
                </Disclosure.Panel> */}
              </>
            )}
          </Disclosure>
        </div>

        <ul className={`${navListStyles} lg:hidden`}>
              {navigation.map((menu, index) => (
                <li className="mr-3 nav__item" key={index}>
                  {/* Если это внешний линк, заменяем на <a> */}
                  {menu.external ? (
                    <a
                      href={menu.link}
                      target="_blank"
                      rel="noopener noreferrer" // открытие в новой вкладке
                      className={navLinkHoverStyles}
                    >
                      {menu.label}
                    </a>
                  ) : (
                    <Link href={menu.value}>
                    <button
                      className={navLinkHoverStyles}
                    >
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
}