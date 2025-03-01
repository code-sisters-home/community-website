import React, { useEffect, useState } from 'react';
import { Container } from "@/components/Container";
import { Markdown } from "@/components/Markdown";

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
  }

  const [posts, setPosts] = useState<Post[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [postsPerPage, setPostsPerPage] = useState<number>(3); // Default to 3 posts per page
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/blog/posts.json'); // Абсолютный путь к JSON файлу
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const filenames = await res.json();
        console.log('Fetched filenames:', filenames); // Отладочное сообщение

        const postComponents = await Promise.all(
          filenames.map(async (filename: string) => {
            const [content, metadata] = await Promise.all([
              fetch(`/blog/${filename}`).then(res => res.text()),
              fetch(`/blog/${filename.replace('.mdx', '.json')}`).then(res => res.json())
            ]);
            return { content, data: metadata };
          })
        );
        setPosts(postComponents);
      } catch (error) {
        console.error('Error fetching posts:', error); // Отладочное сообщение
      }
    };

    fetchPosts();
  }, []);

  const nextPost = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, posts.length - 1));
  };

  const prevPost = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <Container className="flex flex-col  max-w-7xl">
      <h1 className="caption lg:text-left my-0">
        <span className="purple">Посты в </span>
        блоге
      </h1>
      <div className="relative w-full overflow-hidden">
        <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {posts.map((post, index) => (
            <div key={index} className="flex-shrink-0 w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/3 p-4">
              <div className="basic text-lg widget p-8 h-full flex flex-col">
                <h2 className="text-2xl line-clamp-2">{post.data.title}</h2>
                {post.data.tags && (
                  <p className="text-base my-2 blog-tags line-clamp-1">
                    {post.data.tags.join(', ')}
                  </p>
                )}
				<div className="flex-grow overflow-hidden" style={{ height: '300px' }}>
                  {post.data.hero_image ? (
                    <div className="w-full h-2/3 overflow-hidden">
                      <img src={post.data.hero_image} alt={post.data.title} className="" />
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
                  {post.data.author} 🞄 {new Date(post.data.date).toLocaleDateString('ru-RU')}
                </p>
              </div>
            </div>
          ))}
        </div>
        <button onClick={prevPost} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full">
          &lt;
        </button>
        <button onClick={nextPost} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full">
          &gt;
        </button>
      </div>
    </Container>
  );
};