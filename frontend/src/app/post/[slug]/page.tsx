"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Markdown } from "@/components/Markdown";
import { Container } from "@/components/Container";
import Image from 'next/image';

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

const BlogPost = () => {
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`/blog/${slug}.mdx`);
        if (!res.ok) {
          throw new Error(`Error fetching post: ${res.status}`);
        }
        const content = await res.text();

        const metadataRes = await fetch(`/blog/${slug}.json`);
        if (!metadataRes.ok) {
          throw new Error(`Error fetching post metadata: ${metadataRes.status}`);
        }
        const metadata: Post['data'] = await metadataRes.json();

        setPost({ content, data: metadata, slug });
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [slug]);

  if (!slug) {
    return <div>Slug is missing!</div>; // Если slug не найден
  }

  if (!post) return <div></div>;//<div>Loading...</div>;

  return (
      <Container className="flex flex-col-reverse lg:flex-wrap lg:flex-row max-w-7xl">
        <div className="flex items-center w-full">
          <div className="max-w-7xl">
            <div className="basic my-6 widget">
              <h1 className="text-3xl">{post.data.title}</h1>
              <p className="text-xl mt-5 text-gray-700 dark:text-gray-400">
                {post.data.author} 🞄 {new Date(post.data.date).toLocaleDateString('ru-RU')}
              </p>
              {post.data.tags && (
                <p className="text-base my-4 blog-tags">
                  {post.data.tags.join(', ')}
                </p>
              )}
              {post.data.hero_image && (
                <Image width="800" className="max-w-full lg:max-w-3/4" src={post.data.hero_image} alt={post.data.title} />
              )}
              <Markdown content={post.content} />
            </div>
          </div>
        </div>
      </Container>
  );
};

export default BlogPost;