'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Container } from './Container';

const AccordionItem = ({ title, children, isOpen, onToggle }: { 
  title: string; 
  children: React.ReactNode; 
  isOpen: boolean; 
  onToggle: () => void;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);
  //без isAnimating не будет работать корректно
  const [isAnimating, setIsAnimating] = useState(false);

  const updateHeight = useCallback(() => {
    if (contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      setHeight(scrollHeight);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(updateHeight, 50);
    
    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
    };
  }, [children, isOpen, updateHeight]);

  // Функция для преобразования текста в абзацы с точками
  const renderDescription = (text: string) => {
    const paragraphs = text.split('\n\n').filter(p => p.trim() !== '');
    
    return paragraphs.map((paragraph, index) => (
      <p key={index} className="mb-2 mt-2 first:mt-0 last:mb-0 flex items-start gap-2">
        <span className="text-gray-500 dark:text-gray-400 flex-shrink-0 mt-1">•</span>
        <span>{paragraph}</span>
      </p>
    ));
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <button
        onClick={() => {
          setIsAnimating(true);
          onToggle();
          setTimeout(() => setIsAnimating(false), 400);
        }}
        className="w-full flex items-center justify-between py-4 px-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors rounded-lg group relative"
      >
        <span className="text-lg font-large text-gray-800 dark:text-gray-200">{title}</span>
        <span className={`
          ml-4 flex-shrink-0 text-gray-500 dark:text-gray-400 
          transition-all duration-400 ease-in-out
          ${isOpen ? 'rotate-180' : 'rotate-0'}
          group-hover:text-gray-700 dark:group-hover:text-gray-300
          group-hover:scale-110
        `}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </button>
      
      <div 
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{
          maxHeight: isOpen ? height : 0,
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateY(0)' : 'translateY(-8px)',
          transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1), transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div 
          ref={contentRef} 
          className="px-2 pb-4 text-gray-600 dark:text-gray-300 leading-relaxed"
        >
          {typeof children === 'string' ? renderDescription(children) : children}
        </div>
      </div>
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
      title: 'Чего мы хотим?',
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

  // Компонент для отображения карточки с правилом
  const RuleCard = ({ rule }: { rule: typeof rulesData[0] }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Разбиваем описание на абзацы
    const paragraphs = rule.description.split('\n\n').filter(p => p.trim() !== '');

    return (
      <div 
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/30 overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-gray-900/50 transition-all duration-300"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white text-left">
            {rule.title}
          </h3>
          <span className={`
            ml-4 flex-shrink-0 text-gray-500 dark:text-gray-400 
            transition-transform duration-300
            ${isOpen ? 'rotate-180' : 'rotate-0'}
          `}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </button>
        
        <div 
          className={`
            overflow-hidden transition-all duration-300 ease-in-out
            ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="p-6 pt-0 text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-700">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-2 mt-2 first:mt-0 last:mb-0 flex items-start gap-2">
                <span className="text-gray-500 dark:text-gray-400 flex-shrink-0 mt-1">•</span>
                <span>{paragraph}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Container className="flex flex-col max-w-7xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Что для нас важно?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Ознакомьтесь с нашими ценностями перед получением приглашения
        </p>
      </div>
      
      {/* Аккордеон для мобильных устройств (ширина меньше 820px) */}
      <div className="block lg:hidden">
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
      </div>

      {/* Карточки для десктопа (ширина больше 820px) */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-6">
        {rulesData.map((rule) => (
          <RuleCard key={rule.id} rule={rule} />
        ))}
      </div>

       <p className="caption text-center mb-12">
        <span className="purple">Откликается? </span><span>Присоединяйся!</span>
      </p>
    </Container>
  );
};