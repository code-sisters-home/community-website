export interface Post {
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
  
  export const fetchPosts = async (): Promise<Post[]> => {
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
  
	  return postComponents;
	} catch (error) {
	  console.error("Error fetching posts:", error);
	  return [];
	}
  };