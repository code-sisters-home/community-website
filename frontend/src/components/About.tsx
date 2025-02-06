import Image from "next/image";
import { Container } from "@/components/Container";
import adaImg from "../../public/img/Ada_Lovelace_squared.png";

export const About = () => {
  return (
    <>
      <Container className="flex flex-col-reverse lg:flex-wrap lg:flex-row max-w-7xl">
        {/* Left section (Text) */}
        <div className="flex items-center w-full">
          <div className="max-w-7xl">
            <h1 className="caption">
              <span className="purple">O нас</span>
            </h1>

            <p className="basic mr-20 my-6 widget">
              {/* Image in the top-right corner */}
              <div className="relative">
                <Image
                  src={adaImg}
                  alt="Ada Image"
                  width="500"
                  height="500"
                  className="rounded-full w-full lg:w-1/3 object-cover lg:float-right ml-3 mb-3" // mr-20 mt-20 - Ensure image floats and has some margin
                />
              </div>
              <h1 className="text-xl font-semibold pt-3 pb-3">Как всё начиналось</h1>
              Сообщество code_sisters появилось в 2016 как группа в Вконтакте для gamedev-разработчиц. Тогда группа называлась "Gamedev ♀ Girls Only".
              Почти сразу мы создали закрытый чат в телеграме и стало понятно, что нет смысла ограничиваться геймдевом, поэтому проголосовали за другое название - Codegirls.
              Codegirls было местом, где мы делились своими историями, радостями и проблемами в профессиональной жизни. Участницы стали огранизовываться в группы по обучению новым технологиям, языкам и не только программирования.
              Важной особенностью сообщества всегда было то, что для любой инициативы можно собрать небольшую рабочую или учебную группу. Например, одна админша курировала участие в челлендже, аналогичном #100DaysOfCode, который проводится в твиттере. Он сам по себе простой, но учиться чему-то вместе с подругами - гораздо веселее и продуктивнее!

              <h1 className="text-xl font-semibold pt-3 pb-3">Все люди - сёстры</h1>
              Основное общение происходит в чате, так что за три года сообщество пережило несколько установочных обсуждений (по-простому, срачей), и мы постепенно пришли к выводу, что слово girls в названии добавляет коннотацию возраста. В 2019, голосованием выбрали новое название - code_sisters, т.е. сестры по коду.
              Еще одна особенность чата - безопасная атмосфера. Можно задать абсолютно любой вопрос, не боясь получить кучу сарказма вместо ответа. Можно обсуждать любые темы от линукса до зарплат и не беспокоиться, что получишь пачку дикпиков в личные сообщения. Это тот самый чатик с сестрами, которого многим из нас не хватало!
            </p>
          </div>
        </div>


      </Container>
    </>
  );
};
