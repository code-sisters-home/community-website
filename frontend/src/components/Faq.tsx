"use client";
import React from "react";
import { Container } from "@/components/Container";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

export const Faq = () => {
  return (
    <Container>
      <h1 className="caption">
        <span className="purple">Частые </span>вопросы
      </h1>
      <Container className="!p-0">
        <div className="w-full max-w-6xl mx-auto rounded-2xl">
          <div className="flex flex-wrap">
            {faqdata.map((item, index) => (
              <div key={item.question} className="lg:w-1/2 p-2 w-full">
                {" "}
                {/* В каждом элементе задаем ширину в 50% */}
                <Disclosure>
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex items-center justify-between w-full px-4 py-4 text-left rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 widget widget-hover basic">
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

const faqdata = [
  {
    question: "Кто может присоединиться к сообществу?",
    answer:
      "Женщины старше 18 лет, уже работающие в техносфере или желающие обучиться нужным для этого навыкам.",
  },
  {
    question: "Как присоединиться к сообществу?",
    answer:
      "Написать в телеграме боту code_sisters_bot и следовать его инструкциям.",
  },
  {
    question: "Зачем нужно женское сообщество?",
    answer:
      "Женское сообщество это круг своих, где ты не прочитаешь сексистских или уничижительных комментариев. В сфере все еще не достаточно женщин, и просто учась и работая, поддержку найти не просто.",
  },
  {
    question: "Что если мой вопрос глупый и я стесняюсь задавать его в чате?",
    answer:
      "Не бывает глупых вопросов, все когда-то не умели делать то, чему ты сейчас учишься, это нормально. Более того, называть вопросы глупыми (и свои тоже) в чате запрещено.",
  },
];
