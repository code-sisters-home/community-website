import { useEffect, useState, useRef } from "react";
import { LiteYoutubeEmbed } from "react-lite-yt-embed";
import { Container } from "@/components/Container";

interface Video {
  videoId: string;
  title: string;
}

export const VideoGallery = ({ channelId }: { channelId: string }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [videosPerPage, setVideosPerPage] = useState<number>(2); // Default to 2 videos per page
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  // Реф для контейнера, который будет отслеживать его ширину
  const containerRef = useRef<HTMLDivElement>(null);

  // Функция для обновления количества видео на основе ширины контейнера
  const updateVideosPerPage = () => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth; // Получаем ширину контейнера
      console.log("Container width:", width); // Отладочное сообщение
      if (width >= 1024) {
        // xl
        setVideosPerPage(2); // 2 видео на странице
      } else {
        // sm
        setVideosPerPage(1); // 1 видео на странице
      }
    } else {
      console.log("Container ref is null"); // Отладочное сообщение
    }
  };

  useEffect(() => {
    console.log("API Key:", apiKey); // Отладочное сообщение для проверки API ключа
    console.log("Channel ID:", channelId); // Отладочное сообщение для проверки Channel ID

    const fetchVideos = async () => {
      if (!apiKey) {
        console.error("API key is missing");
        setLoading(false);
        return;
      }

      try {
        const videosToLoad = 30;
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${videosToLoad}`,
        );
        console.log("Response status:", response.status); // Отладочное сообщение для проверки статуса ответа
        if (!response.ok) {
          throw new Error(`HTTPS error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Отладочное сообщение для проверки данных
        const videoData = data.items
          .map((item: any) => ({
            videoId: item.id.videoId,
            title: item.snippet.title,
          }))
          .filter((video: Video) => video.videoId);

        setVideos(videoData);
      } catch (error) {
        console.error("Error fetching videos from YouTube API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();

    // Обновляем количество видео на странице при изменении размера контейнера
    window.addEventListener("resize", updateVideosPerPage);
    updateVideosPerPage(); // Устанавливаем начальное значение

    return () => window.removeEventListener("resize", updateVideosPerPage);
  }, [channelId, apiKey]);

  // Функция для переключения на следующее видео
  const nextVideo = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + videosPerPage, videos.length - videosPerPage),
    );
  };

  // Функция для переключения на предыдущее видео
  const prevVideo = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - videosPerPage, 0));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!videos.length) {
    return null; // Если нет видео, ничего не отображаем
  }

  return (
    <Container className="flex flex-col max-w-7xl">
      <h1 className="caption lg:text-left mt-0 mb-7">
        <span className="purple">Видео на </span>
        канале
      </h1>
      <div className="relative w-full overflow-hidden" ref={containerRef}>
        <div
          className="flex transition-transform duration-300"
          style={{
            transform: `translateX(-${currentIndex * (100 / videosPerPage)}%)`,
          }}
        >
          {videos.map((video, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-full ${videosPerPage === 1 ? "sm:w-full" : "sm:w-1/2"} p-4`}
            >
              <div className="basic text-lg widget p-8 h-full flex flex-col">
                <h2
                  className="text-2xl mb-4 line-clamp-2"
                  style={{ minHeight: "3em" }}
                >
                  {video.title}
                </h2>

                {/* Контейнер для видео с пропорциями 16:9 */}
                <div
                  className="relative w-full"
                  style={{ height: 0, paddingBottom: "56.25%" }}
                >
                  <div className="absolute top-0 left-0 w-full h-full">
                    <LiteYoutubeEmbed
                      id={video.videoId}
                      //   opts={{
                      //     width: '100%',
                      //     height: '300px',
                      //     playerVars: {
                      // 		modestbranding: 1, // Убирает логотип YouTube
                      // 		rel: 0, // Отключает предложенные видео после завершения
                      // 		showinfo: 0, // Скрывает заголовок и информацию о видео
                      // 		controls: 0, // Отображает кнопку Play и другие элементы управления
                      // 		iv_load_policy: 3, // Отключает аннотации на видео
                      //     },
                      //   }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={prevVideo}
          className="absolute -left-2.5 top-1/2 transform -translate-y-1/2 basic text-sm p-2"
          style={{ transform: "scaleY(3)" }}
        >
          &lt;
        </button>
        <button
          onClick={nextVideo}
          className="absolute -right-2.5 top-1/2 transform -translate-y-1/2 basic text-sm p-2"
          style={{ transform: "scaleY(3)" }}
        >
          &gt;
        </button>
      </div>
    </Container>
  );
};

export default VideoGallery;
