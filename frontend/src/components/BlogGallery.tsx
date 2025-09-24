import React, { useEffect, useState, useRef } from "react";
import { Container } from "@/components/Container";
import { fetchPosts, Post } from "@/utils/fetchPosts";
import { Gallery, GalleryItem } from "@/components/Gallery";
import Image from "next/image";
import Link from "next/link";
import { Markdown } from "@/components/Markdown";
import { DotSeparator } from "@/components/DotSeparator";
import { useRef as useDebounceRef } from "react";

const ClampedMarkdown: React.FC<{
  content: string;
  availableHeight: number;
}> = ({ content, availableHeight }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [clampedText, setClampedText] = useState("");
  const [containerWidth, setContainerWidth] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    // Если высота недоступна (например, картинка ещё не отрендерилась), не пересчитываем
    if (!availableHeight || availableHeight <= 0) return;
    const style = window.getComputedStyle(containerRef.current);
    const width = containerRef.current.offsetWidth;
    const font = style.font;
    const fontSize = style.fontSize;
    const fontFamily = style.fontFamily;
    const lineHeight = style.lineHeight;
    const padding = style.padding;
    const letterSpacing = style.letterSpacing;
    const fontWeight = style.fontWeight;

    let plainText = content
      .replace(/[#_*`>\[\]\+!]/g, "")
      //.replace(/[#_*`>\[\]\(\)\-\+!]/g, "")
      //.replace(/[\n\r]/g, " ")
      //.replace(/\s+/g, " ")
      .trim();

    const paddingTop = parseFloat(style.paddingTop) || 0;
    const paddingBottom = parseFloat(style.paddingBottom) || 0;
    const height = (availableHeight || 0) - paddingTop - paddingBottom;

    // Создаём временный div для реального рендеринга текста
    const temp = document.createElement("div");
    temp.style.position = "absolute";
    temp.style.visibility = "hidden";
    temp.style.height = "auto";
    temp.style.width = width + "px";
    temp.style.font = font;
    temp.style.fontSize = fontSize;
    temp.style.fontFamily = fontFamily;
    temp.style.fontWeight = fontWeight;
    temp.style.lineHeight = lineHeight;
    temp.style.padding = padding;
    temp.style.letterSpacing = letterSpacing;
    temp.style.whiteSpace = "normal";
    temp.style.wordBreak = "break-word";
    temp.style.boxSizing = "border-box";
    document.body.appendChild(temp);

    let words = plainText.split(" ");
    let left = 1;
    let right = words.length;
    let best = "";

    // Бинарный поиск по количеству слов
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      let test = words.slice(0, mid).join(" ");
      temp.innerText = test + (mid < words.length ? "…" : "");
      if (temp.scrollHeight <= height) {
        best = test + (mid < words.length ? "…" : "");
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    // Проверяем, что последняя строка помещается полностью
    let fits = false;
    while (best) {
      temp.innerText = best;
      const lines = temp.innerText.split("\n").length;
      const lastLine = temp.innerText.split("\n").pop() || "";
      // Проверяем, что высота блока равна количеству строк * высоте строки
      if (temp.scrollHeight <= height) {
        fits = true;
        break;
      }
      // Убираем последнее слово
      best = best.replace(/\s+\S+\s*(…)?$/, "…");
    }
    document.body.removeChild(temp);
    setClampedText(best.trim());
  }, [content, availableHeight, containerWidth]);

  // Debounce для ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    let debounceTimer: NodeJS.Timeout | null = null;
    const observer = new window.ResizeObserver(() => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        setContainerWidth(el.offsetWidth);
      }, 60); // 60мс debounce
    });
    observer.observe(el);
    // Инициализация
    setContainerWidth(el.offsetWidth);
    return () => {
      observer.disconnect();
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: "100%",
        overflow: "hidden",
        whiteSpace: "pre-line",
        textOverflow: "ellipsis",
      }}
    >
      {clampedText}
    </div>
  );
};

export const BlogGallery = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsPerPage, setPostsPerPage] = useState<number>(3);
  const [loading, setLoading] = useState(true);
  const [imgHeights, setImgHeights] = useState<{ [slug: string]: number }>({});
  const imgRefs = useRef<{ [slug: string]: HTMLImageElement | null }>({});

  useEffect(() => {
    const handleResize = () => {
      const newHeights: { [slug: string]: number } = {};
      Object.keys(imgRefs.current).forEach((slug) => {
        const img = imgRefs.current[slug];
        if (img) newHeights[slug] = img.clientHeight;
      });
      setImgHeights(newHeights);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [posts]);

  useEffect(() => {
    const loadPosts = async () => {
      const postComponents = await fetchPosts();
      setPosts(postComponents);
      setLoading(false);
    };
    loadPosts();
  }, []);

  const updatePostsPerPage = (width: number) => {
    if (width >= 1024) {
      setPostsPerPage(3); // 3 поста на странице
    } else if (width >= 640) {
      setPostsPerPage(2); // 2 поста на странице
    } else {
      setPostsPerPage(1); // 1 пост на странице
    }
  };

  const galleryItems: GalleryItem[] = posts.map((post) => ({
    id: post.slug,
    content: (
      <>
        <Link href={`/post/${post.slug}`} legacyBehavior>
          <a className="text-2xl line-clamp-2 overflow-hidden" style={{ minHeight: "2.5em" }}>
            {post.data.title}
          </a>
        </Link>
        {post.data.tags && (
          <p className="text-base my-2 blog-tags line-clamp-1">
            {post.data.tags.join(", ")}
          </p>
        )}
        <div className="flex-col overflow-hidden" style={{ height: "300px" }}>
          {post.data.hero_image ? (
            <>
              <Image
                ref={(el) => {
                  imgRefs.current[post.slug] = el;
                  // Корректно навешиваем onload только один раз
                  if (el && !el.dataset._resizeHandled) {
                    el.dataset._resizeHandled = "1";
                    const triggerResize = () => {
                      const event = new Event("resize");
                      window.dispatchEvent(event);
                    };
                    if (el.complete) {
                      triggerResize();
                    } else {
                      el.addEventListener("load", triggerResize, {
                        once: true,
                      });
                    }
                  }
                }}
                src={post.data.hero_image}
                alt={post.data.title}
                className="-my-1.5"
                style={{ objectFit: "contain" }}
                layout="responsive"
                width={100}
                height={100}
              />
              <div style={{ height: 8 }} />
              <ClampedMarkdown
                content={post.content.slice(0, 200)}
                availableHeight={300 - (imgHeights[post.slug] || 0) - 8}
              />
            </>
          ) : (
            <ClampedMarkdown
              content={post.content.slice(0, 600)}
              availableHeight={300}
            />
          )}
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-400 mt-auto">
          {post.data.author}
          <DotSeparator />
          {new Date(post.data.date).toLocaleDateString("ru-RU")}
        </p>
      </>
    ),
  }));

  return (
    <Container className="flex flex-col max-w-7xl">
      {!loading && posts.length > 0 && (
        <h1 className="caption lg:text-left mt-0 mb-7">
          <span className="purple">Посты в </span>
          блоге
        </h1>
      )}
      <Gallery
        items={galleryItems}
        itemsPerPage={postsPerPage}
        updateItemsPerPage={updatePostsPerPage}
        onNext={() => {}}
        onPrev={() => {}}
      />
    </Container>
  );
};
