import Image from "next/image";
import { Container } from "@/components/Container";
import mainImg from "@img/main.png";
import content from "@public/content.json";
import { BlogGallery } from "@/components/BlogGallery";
import { VideoGallery } from "@/components/VideoGallery";
import { RulesAccordion } from "@/components/AccordionItem";
import TelegramIcon from "./icons/TelegramIcon";
import VKIcon from "./icons/VKIcon";
import YoutubeIcon from "./icons/YoutubeIcon";

export const Main = () => {
  return (
    <>
      <Container className="flex flex-col-reverse md:flex-wrap md:flex-row max-w-7xl">
        {/* Left section (Text and button) */}
        <div className="flex items-center w-full md:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="caption md:text-left my-0">
              <span className="purple">Перепиши </span>
              культурный код
            </h1>
            <p className="basic md:mr-20 my-6">{content.main.lead}</p>

            <div className="bg-first flex flex-col items-center space-y-3 md:space-x-4 md:space-y-0 md:items-start md:flex-row">
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
        <div className="flex items-center w-full md:w-1/2 justify-between my-8 md:my-0">
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
          <div className="flex flex-col items-center green -mr-7 lg:ml-8 justify-end">
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
                <TelegramIcon />
              </a>
              <a
                href="https://vk.com/code_sisters"
                target="_blank"
                rel="noopener"
                className=""
              >
                <span className="sr-only">VK</span>
                <VKIcon />
              </a>
              <a
                href="https://www.youtube.com/@code_sisters"
                target="_blank"
                rel="noopener"
                className=""
              >
                <span className="sr-only">YouTube</span>
                <YoutubeIcon />
              </a>
            </div>
          </div>
        </div>
      </Container>
      <RulesAccordion />
      <hr className="my-6 border-gray-300 dark:border-gray-700" />
      <BlogGallery />
      <VideoGallery channelId="UC_JXPJ8Vo-qkV4pn0C7KAQw" />
    </>
  );
};