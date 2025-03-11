import React, { useEffect, useState, useRef } from "react";
import { Container } from "@/components/Container";
import { Markdown } from "@/components/Markdown";
import Link from "next/link";
import Image from "next/image";

export const BlogGallery = () => {
  interface Post {
    content: string;
    data: {
      title: string;
      author: string;
      date: string;
      hero_image?: string;
      tags?: string[];
    };
    slug: string;
  }

  const [posts, setPosts] = useState<Post[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [postsPerPage, setPostsPerPage] = useState<number>(3); // Default to 3 posts per page

  // Реф для контейнера, который будет отслеживать его ширину
  const containerRef = useRef<HTMLDivElement>(null);

  // Функция для обновления количества постов на основе ширины контейнера
  const updatePostsPerPage = () => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth; // Получаем ширину контейнера
      console.log("Container width:", width); // Отладочное сообщение
      if (width >= 1024) {
        // xl
        setPostsPerPage(3); // 3 поста на странице
      } else if (width >= 640) {
        // md
        setPostsPerPage(2); // 2 поста на странице
      } else {
        // sm
        setPostsPerPage(1); // 1 пост на странице
      }
    } else {
      console.log("Container ref is null"); // Отладочное сообщение
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/blog/posts.json");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const filenames = await res.json();
        console.log("Fetched filenames:", filenames); // Проверка на список файлов

        const postComponents = await Promise.all(
          filenames.map(async (filename: string) => {
            console.log("Processing filename:", filename); // Отладка имени файла
            const [content, metadata] = await Promise.all([
              fetch(`/blog/${filename}`).then((res) => res.text()),
              fetch(`/blog/${filename.replace(".mdx", ".json")}`).then((res) =>
                res.json(),
              ),
            ]);

            const slug = filename.replace(".mdx", ""); // Получение slug из имени файла
            console.log("Generated slug:", slug); // Проверка сгенерированного slug

            return { content, data: metadata, slug }; // Возвращаем объект с правильным slug
          }),
        );

        setPosts(postComponents);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();

    // Обновляем количество постов на странице при изменении размера контейнера
    window.addEventListener("resize", updatePostsPerPage);
    updatePostsPerPage(); // Устанавливаем начальное значение

    return () => window.removeEventListener("resize", updatePostsPerPage);
  }, []);

  // Функция для переключения на следующий пост
  const nextPost = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + postsPerPage, posts.length - postsPerPage),
    );
  };

  // Функция для переключения на предыдущий пост
  const prevPost = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - postsPerPage, 0));
  };

  return (
    <Container className="flex flex-col max-w-7xl">
      <h1 className="caption lg:text-left mt-0 mb-7">
        <span className="purple">Посты в </span>
        блоге
      </h1>
      <div className="relative w-full overflow-hidden" ref={containerRef}>
        <div
          className="flex transition-transform duration-300"
          style={{
            transform: `translateX(-${currentIndex * (100 / postsPerPage)}%)`,
          }}
        >
          {posts.map((post, index) => {
            console.log(post.slug); // Выведем slug в консоль для каждого поста
            return (
              <div
                key={index}
                className={`flex-shrink-0 w-full ${postsPerPage === 1 ? "sm:w-full" : postsPerPage === 2 ? "sm:w-1/2" : "sm:w-1/3"} p-4`}
              >
                <div className="basic text-lg widget p-8 h-full flex flex-col">
                  <Link href={`/post/${post.slug}`} legacyBehavior>
                    <a
                      className="text-2xl line-clamp-2"
                      style={{ minHeight: "3em" }}
                    >
                      {post.data.title}
                    </a>
                  </Link>
                  {post.data.tags && (
                    <p className="text-base my-2 blog-tags line-clamp-1">
                      {post.data.tags.join(", ")}
                    </p>
                  )}
                  <div
                    className="flex-grow overflow-hidden"
                    style={{ height: "300px" }}
                  >
                    {post.data.hero_image ? (
                      <div className="w-full h-2/3 overflow-hidden">
                        <Image
                          src={post.data.hero_image}
                          alt={post.data.title}
                          className=""
                        />
                      </div>
                    ) : (
                      <div className="h-full">
                        <Markdown content={post.content.slice(0, 600)} />
                      </div>
                    )}
                    {post.data.hero_image && (
                      <div className="h-1/3 overflow-hidden">
                        <Markdown content={post.content.slice(0, 200)} />
                      </div>
                    )}
                  </div>
                  <p className="text-lg text-gray-700 dark:text-gray-400 mt-auto">
                    {post.data.author} 🞄{" "}
                    {new Date(post.data.date).toLocaleDateString("ru-RU")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <button
          onClick={prevPost}
          className="absolute -left-2.5 top-1/2 transform -translate-y-1/2 basic text-sm p-2"
          style={{ transform: "scaleY(3)" }}
        >
          &lt;
        </button>
        <button
          onClick={nextPost}
          className="absolute -right-2.5 top-1/2 transform -translate-y-1/2 basic text-sm p-2"
          style={{ transform: "scaleY(3)" }}
        >
          &gt;
        </button>
      </div>
    </Container>
  );
};
