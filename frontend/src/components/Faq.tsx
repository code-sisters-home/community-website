"use client";
import React from "react";
import { Container } from "@/components/Container";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

export const Faq = () => {
  return (
    <Container>
      <h1 className="caption text-center my-10">
        <span className="purple">Частые </span>вопросы 
      </h1>
      <Container className="!p-0">
  <div className="w-full max-w-6xl mx-auto rounded-2xl">
    <div className="flex flex-wrap">
      {faqdata.map((item, index) => (
        <div key={item.question} className="w-1/2 p-2"> {/* В каждом элементе задаем ширину в 50% */}
          <Disclosure>
            {({ open }) => (
              <>
                <DisclosureButton className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-200">
                  <span>{item.question}</span>
                  <ChevronUpIcon
                    className={`${
                      open ? "transform rotate-180" : ""
                    } w-5 h-5 text-indigo-500`}
                  />
                </DisclosureButton>
                <DisclosurePanel className="px-4 pt-4 pb-2 text-gray-500 dark:text-gray-300">
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
}

const faqdata = [
  {
    question: "Что такое квантовая физика?",
    answer: "Квантовая физика — это раздел физики, изучающий поведение микрочастиц, таких как электроны и фотоны, на квантовом уровне. Она основывается на принципах, отличных от классической физики.",
  },
  {
    question: "Что такое квантовая запутанность?",
    answer: "Квантовая запутанность — это явление, при котором пары или группы частиц становятся взаимосвязаны, так что состояние одной частицы напрямую влияет на состояние другой, независимо от расстояния между ними.",
  },
  {
    question: "Как работает принцип неопределенности Гейзенберга?",
    answer: "Принцип неопределенности Гейзенберга утверждает, что невозможно одновременно точно измерить положение и импульс частицы. Чем точнее мы знаем одно из этих значений, тем меньше информации о другом.",
  },
  {
    question: "Что такое квантовые флуктуации?",
    answer: "Квантовые флуктуации — это временные изменения энергии в пустом пространстве, вызванные принципами квантовой механики. Они могут приводить к появлению виртуальных частиц, которые быстро создаются и исчезают.",
  },
];
