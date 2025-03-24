import React, { useEffect, useState } from "react";
import { Container } from "@/components/Container";
import { fetchPosts, Post } from "@/utils/fetchPosts";
import { Gallery, GalleryItem } from "@/components/Gallery";
import Image from "next/image";
import Link from "next/link";
import { Markdown } from "@/components/Markdown";

export const BlogGallery = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsPerPage, setPostsPerPage] = useState<number>(3); // Default to 3 posts per page

  useEffect(() => {
    const loadPosts = async () => {
      const postComponents = await fetchPosts();
      setPosts(postComponents);
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
          <a className="text-2xl line-clamp-2" style={{ minHeight: "3em" }}>
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
            <Image
              src={post.data.hero_image}
              alt={post.data.title}
              className="-my-1.5"
              style={{ objectFit: "cover" }}
              layout="responsive"
              width={300}
              height={300}
            />
          ) : (
            <div className="h-full overflow-hidden">
              <Markdown content={post.content.slice(0, 600)} />
            </div>
          )}
          {post.data.hero_image && (
            <div className="h-full overflow-hidden">
              <Markdown content={post.content.slice(0, 200)} />
            </div>
          )}
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-400 mt-auto">
          {post.data.author} 🞄{" "}
          {new Date(post.data.date).toLocaleDateString("ru-RU")}
        </p>
      </>
    ),
  }));

  return (
    <Container className="flex flex-col max-w-7xl">
      <h1 className="caption lg:text-left mt-0 mb-7">
        <span className="purple">Посты в </span>
        блоге
      </h1>
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
