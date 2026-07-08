'use client';

import { useState } from 'react';
import { Container } from './Container';

const AccordionItem = ({ title, children, isOpen, onToggle }: { 
  title: string; 
  children: React.ReactNode; 
  isOpen: boolean; 
  onToggle: () => void;
}) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 px-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors rounded-lg"
      >
        <span className="text-lg font-large text-gray-800 dark:text-gray-200">{title}</span>
        <span className="ml-4 flex-shrink-0 text-gray-500 dark:text-gray-400">
           {isOpen ? (
            // Стрелка вверх (открыто)
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          ) : (
            // Стрелка вниз (закрыто)
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          )}
        </span>
      </button>
      
      {isOpen && (
        <div className="px-2 pb-4 text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
          {children}
        </div>
      )}
    </div>
  );
};

export const RulesAccordion = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const rulesData = [
    {
      id: 'rule1',
      title: 'Кто мы?',
      description: 'Закрытое сообщество code_sisters создано женщинами для женщин, оно объединяет разработчиц независимо от уровня и стека.'
    },
    {
      id: 'rule2',
      title: 'Чего мы хотим? Это наши ценности',
      description: 'Мы хотим объединить всех русскоговорящих программисток и разработчиц в одном чате, но только если это взаимно.\n\nТолько женщины и только код.\n\nМы хотим вовлекать в программирование как можно больше женщин.\n\nЖелательно всех!'
    },
    {
      id: 'rule3',
      title: 'Как нам нравится общаться?',
      description: 'На ты - сокращаем дистанцию в общении.\n\nВ женском роде - мы хотим озвучивать свою женскость и наш общий женский опыт.\n\nДоброжелательно, но без самоуничижения - с точкой в конце предложения или скобочкой, главное - без заходов "я наверно тупая…" и "глупый вопрос…"'
    },
    {
      id: 'rule4',
      title: 'Что мы хотим видеть в чате?',
      description: 'Обсуждение айти, работы, зарплат, технологий в целом и конкретного кода.\n\nМитапы с женщинами и сделанными женщинами, туториалы и книги от женщин.\n\nКороче - только женские лица и имена!'
    },
    {
      id: 'rule5',
      title: 'Чего мы не хотим?',
      description: 'Помогать вашим мужьям-сватьям-братьям, ни информационно, никак.\n\nМы вообще ничего не хотим знать и слышать о них.\n\nНаш чат это одно из заповедных мест, где их нет.\n\nЕще мы не хотим голосовые и кружочки.'
    },
    {
      id: 'rule6', 
      title: 'Модерация', 
      description: 'Баны бывают редко, потому что к нам приходят женщины со схожими ценностями.\n\nЧат закрытый, а значит скриншотить и пересылать сообщения нельзя, если это не публичный материал.\n\nЕсли что-то непонятно или подозрительно, то можно спросить в чате или у нашего бота.\n\nЕще участницы обычно указывают на какие-то несоответствия.\n\nЧтобы получить бан, надо собрать бинго из 3 ворнингов #warning, а это не так-то просто.\n\nУ нас не демократия, но можно обсуждать правила.\n\nПоследнее слово за главной админшей.'
    }
  ];

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <Container className="flex flex-col max-w-7xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Правила участия
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Ознакомьтесь с правилами перед получением приглашения
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/30 overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="p-6">
          {rulesData.map((rule) => (
            <AccordionItem
              key={rule.id}
              title={rule.title}
              isOpen={openAccordion === rule.id}
              onToggle={() => toggleAccordion(rule.id)}
            >
              {rule.description}
            </AccordionItem>
          ))}
        </div>
      </div>
    </Container>
  );
};