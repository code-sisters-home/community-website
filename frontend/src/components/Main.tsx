import Image from "next/image";
import { Container } from "@/components/Container";
import mainImg from "../../public/img/main.png";
import { BlogGallery } from "@/components/BlogGallery";
import { VideoGallery } from "@/components/VideoGallery";
export const Main = () => {
  return (
    <>
      <Container className="flex flex-col-reverse lg:flex-wrap  lg:flex-row max-w-7xl">
        {/* Left section (Text and button) */}
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="caption lg:text-left my-0">
              <span className="purple">Перепиши </span>
              культурный код
            </h1>
            <p className="basic lg:mr-20 my-6">
              Сообщество code_sisters объединяет женщин в IT независимо от
              уровня и стека. Если тебя интересует индустрия, ты хочешь
              вдохновиться замечательными специалистками, задать вопрос в
              комфортной атмосфере или, наоборот, помочь кому-то с полночным
              неработающим кодом, ждем тебя!
            </p>

            <div className="bg-first flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <a
                href="https://t.me/code_sisters_bot"
                target="_blank"
                rel="noopener"
                className="button px-8 py-4 text-lg font-medium"
              >
                Получить приглашение
              </a>
            </div>
          </div>
        </div>

        {/* Right section (Image and social media links) */}
        <div className="flex items-center w-full lg:w-1/2 justify-between my-8 lg:my-0">
          {/* Image */}
          <div className="">
            <Image
              src={mainImg}
              width="616"
              height="617"
              className="object-cover"
              alt="Main Illustration"
              loading="eager"
            />
          </div>

          {/* Social media links */}
          <div className="flex flex-col items-center green lg:ml-8 justify-end">
            {/* "Subscribe" text rotated */}
            <div className="transform rotate-90 text-base mb-8">Подпишись</div>

            {/* Vertical line */}
            <div className="h-8 border-l-2 border-green my-4"></div>

            {/* Social media icons */}
            <div className="flex flex-col items-center space-y-4 green">
              <a
                href="https://t.me/codesisters"
                target="_blank"
                rel="noopener"
                className=""
              >
                <span className="sr-only">Telegram</span>
                <Telegram />
              </a>
              <a
                href="https://vk.com/code_sisters"
                target="_blank"
                rel="noopener"
                className=""
              >
                <span className="sr-only">VK</span>
                <VK />
              </a>
              <a
                href="https://www.youtube.com/@code_sisters"
                target="_blank"
                rel="noopener"
                className=""
              >
                <span className="sr-only">VK</span>
                <Youtube />
              </a>
            </div>
          </div>
        </div>
      </Container>
      <BlogGallery />
      <VideoGallery channelId="UC_JXPJ8Vo-qkV4pn0C7KAQw" />
    </>
  );
};

const Telegram = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 50 50"
    fill="currentColor"
  >
    <path d="M46.137,6.552c-0.75-0.636-1.928-0.727-3.146-0.238l-0.002,0C41.708,6.828,6.728,21.832,5.304,22.445	c-0.259,0.09-2.521,0.934-2.288,2.814c0.208,1.695,2.026,2.397,2.248,2.478l8.893,3.045c0.59,1.964,2.765,9.21,3.246,10.758	c0.3,0.965,0.789,2.233,1.646,2.494c0.752,0.29,1.5,0.025,1.984-0.355l5.437-5.043l8.777,6.845l0.209,0.125	c0.596,0.264,1.167,0.396,1.712,0.396c0.421,0,0.825-0.079,1.211-0.237c1.315-0.54,1.841-1.793,1.896-1.935l6.556-34.077	C47.231,7.933,46.675,7.007,46.137,6.552z M22,32l-3,8l-3-10l23-17L22,32z"></path>
  </svg>
);

const VK = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M 4 2 C 2.898438 2 2 2.898438 2 4 L 2 20 C 2 21.101563 2.898438 22 4 22 L 20 22 C 21.101563 22 22 21.101563 22 20 L 22 4 C 22 2.898438 21.101563 2 20 2 Z M 8 6 L 11.875 6 C 13.074219 6 16 6.046875 16 8.53125 C 16 10.011719 14.992188 10.652344 14.53125 10.84375 L 14.53125 10.90625 C 15.71875 10.90625 17 12.15625 17 13.53125 C 17 15.011719 16.382813 17 12.40625 17 L 8 17 Z M 11 8 L 11 10 C 11 10 11.910156 10 12.0625 10 C 12.921875 10 13 9.242188 13 9.0625 C 13 8.949219 12.984375 8 12.03125 8 Z M 11 12 L 11 15 C 11 15 12.25 14.96875 12.5 14.96875 C 13.796875 14.96875 14 13.871094 14 13.46875 C 14 12.859375 13.65625 12 12.53125 12 C 12.261719 12 11 12 11 12 Z"></path>
  </svg>
);

const Youtube = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,14.598V9.402c0-0.385,0.417-0.625,0.75-0.433l4.5,2.598c0.333,0.192,0.333,0.674,0,0.866l-4.5,2.598 C10.417,15.224,10,14.983,10,14.598z"></path>
  </svg>
);
