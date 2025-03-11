"use client";
import React, { useEffect, useState } from "react";
import { Container } from "@/components/Container";
import { Markdown } from "@/components/Markdown";
import Image from "next/image";
import adaImg from "../../public/img/Ada_Lovelace_squared.png";

export const About = () => {
  const [aboutContent, setAboutContent] = useState<string>("");

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const res = await fetch("/about.mdx");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const text = await res.text();
        setAboutContent(text);
      } catch (error) {
        console.error("Error fetching about content:", error);
      }
    };

    fetchAboutContent();
  }, []);

  return (
    <Container className="flex flex-col-reverse lg:flex-wrap lg:flex-row max-w-7xl">
      {/* Left section (Text) */}
      <div className="flex items-center w-full">
        <div className="max-w-7xl">
          {aboutContent.length > 0 ? (
            <>
              <h1 className="caption">
                <span className="purple">O нас</span>
              </h1>
              <div className="basic my-6 widget">
                {/* Image in the top-right corner */}
                <Image
                  src={adaImg}
                  alt="Ada Image"
                  width="500"
                  height="500"
                  className="rounded-full w-full lg:w-1/3 object-cover p-6 lg:float-right" // mr-20 mt-20 - Ensure image floats and has some margin
                />
                <Markdown content={aboutContent} />
              </div>
            </>
          ) : (
            <div className="text-[40px]">Загрузка постов...</div> // Или другой лоадер
          )}
        </div>
      </div>
    </Container>
  );
};
