import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Container } from "@/components/Container";
import { Markdown } from "@/components/Markdown";
import { renderToString } from 'react-dom/server';

export const Blog = () => {
  interface Post {
    content: string;
    data: {
      title: string;
      author: string;
      date: string;
      hero_image?: string;
    };
  }

  const [posts, setPosts] = useState<Post[]>([]);
  const [expandedPosts, setExpandedPosts] = useState<Set<number>>(new Set());

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

  const toggleExpand = (index: number) => {
    setExpandedPosts(prev => {
      const newExpandedPosts = new Set(prev);
      if (newExpandedPosts.has(index)) {
        newExpandedPosts.delete(index);
      } else {
        newExpandedPosts.add(index);
      }
      return newExpandedPosts;
    });
  };

  const getFirstSentence = (content: string) => {
	let str = content;//renderToString(content);
    if (typeof str === 'string') {
      const sentences = str.split('. ');
	  console.log("found string");
      return sentences[0] + '.';
    }
    return str;
  };

  return (
    <Container className="flex flex-col-reverse lg:flex-wrap lg:flex-row max-w-7xl">
      <div className="flex items-center w-full">
        <div className="max-w-7xl">
          <h1 className="caption text-center">
            <span className="purple">Блог</span>
          </h1>
          {posts.map((post, index) => (
            <div key={index} className="basic my-6 widget">
              <h1 className="text-3xl">{post.data.title}</h1>
              <p className="text-xl my-6 text-gray-700 dark:text-gray-400">
                {post.data.author} 🞄 {new Date(post.data.date).toLocaleDateString('ru-RU')}
              </p>
              {post.data.hero_image && <img src={post.data.hero_image} alt={post.data.title} />}
              <Markdown content={expandedPosts.has(index) ? post.content : getFirstSentence(post.content)} />
              <button onClick={() => toggleExpand(index)} className=" text-gray-700 dark:text-gray-400 hover:underline">
                {expandedPosts.has(index) ? 'Свернуть' : 'Читать дальше'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};