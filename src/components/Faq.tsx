"use client";
import React from "react";
import { Container } from "@/components/Container";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import content from "@public/content.json";

export const Faq = () => {
  return (
    <Container>
      <h1 className="caption">
        <span className="purple">Частые </span>вопросы
      </h1>
      <Container className="!p-0">
        <div className="w-full max-w-6xl mx-auto rounded-2xl">
          <div className="flex flex-wrap">
            {content.faq.map((item: any, index: number) => (
              <div key={item.question} className="lg:w-1/2 p-2 w-full">
                {" "} {/* В каждом элементе задаем ширину в 50% */}
                <Disclosure>
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex items-center justify-between w-full px-4 py-4 text-left rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 widget widget-hover basic lg:h-20 h-auto">
                        <span>{item.question}</span>
                        <ChevronUpIcon
                          className={`${
                            open ? "transform rotate-180" : ""
                          } w-5 h-5 green`}
                        />
                      </DisclosureButton>
                      <DisclosurePanel className="basic px-4 pt-4 pb-2">
                        {item.answer}
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Container>
  );
};
