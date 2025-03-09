"use client";
import React, { useEffect, useState } from 'react';
import { Container } from "@/components/Container";
import { Markdown } from "@/components/Markdown";
import Link from 'next/link';
import Image from 'next/image';

export const Blog = () => {
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
  const [expandedPosts, setExpandedPosts] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchPosts = async () => {
			try {
				const res = await fetch('/blog/posts.json');
				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`);
				}
				const filenames = await res.json();
				console.log('Fetched filenames:', filenames); // Проверка на список файлов

				const postComponents = await Promise.all(
					filenames.map(async (filename: string) => {
						console.log('Processing filename:', filename); // Отладка имени файла
						const [content, metadata] = await Promise.all([
							fetch(`/blog/${filename}`).then(res => res.text()),
							fetch(`/blog/${filename.replace('.mdx', '.json')}`).then(res => res.json())
						]);

						const slug = filename.replace('.mdx', ''); // Получение slug из имени файла
						console.log('Generated slug:', slug); // Проверка сгенерированного slug

						return { content, data: metadata, slug }; // Возвращаем объект с правильным slug
					})
				);

				setPosts(postComponents);
			} catch (error) {
				console.error('Error fetching posts:', error);
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

  const getPreview = (content: string) => {
    const sentences = content.split(/(?<=\.)\s+/);
    const lines = content.split('\n');

    const previewSentences = sentences.slice(0, 7).join(' ');
    const previewLines = lines.slice(0, 7).join('\n');

    return previewSentences.length <= previewLines.length ? previewSentences : previewLines;
  };

  return (
    <Container className="flex flex-col-reverse lg:flex-wrap lg:flex-row max-w-7xl">
      <div className="flex items-center w-full">
        <div className="max-w-7xl">
        {posts.length > 0 ? (
            <>
          <h1 className="caption text-center">
            <span className="purple">Блог</span>
          </h1>
          {posts.map((post, index) => (
            <div key={index} className="basic my-6 widget">
              <Link href={`/post/${post.slug}`} legacyBehavior>
              <a className="text-3xl">{post.data.title}</a>
              </Link>
              <p className="text-xl mt-5 text-gray-700 dark:text-gray-400">
                {post.data.author} 🞄 {new Date(post.data.date).toLocaleDateString('ru-RU')}
              </p>
              {post.data.tags && (
                <p className="text-base my-4 blog-tags">
                  {post.data.tags.join(', ')}
                </p>
              )}
              {post.data.hero_image && (<Image width="800" className="max-w-full lg:max-w-3/4" src={post.data.hero_image} alt={post.data.title} />)}
              <Markdown content={expandedPosts.has(index) ? post.content : getPreview(post.content)} />
              <button onClick={() => toggleExpand(index)} className=" text-gray-700 dark:text-gray-400 hover:underline">
                {expandedPosts.has(index) ? 'Свернуть' : 'Читать дальше'}
              </button>
            </div>
          ))}
          </>
          ) :(
            <div className="text-[40px]">Загрузка постов...</div> // Или другой лоадер
          )}
        </div>
      </div>
    </Container>
  );
};