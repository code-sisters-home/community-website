// src/components/VideoGallery.tsx
import React, { useEffect, useState } from "react";
import { Gallery, GalleryItem } from "@/components/Gallery";
import { Container } from "@/components/Container";
import { LiteYoutubeEmbed } from "react-lite-yt-embed";

interface Video {
  videoId: string;
  title: string;
}

interface SearchResponse {
  items: Video[];
  nextPageToken?: string | null;
}

export const VideoGallery = ({ channelId }: { channelId: string }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [videosPerPage, setVideosPerPage] = useState<number>(2);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!channelId) return;

    const controller = new AbortController();

    const fetchVideos = async () => {
      try {
        setLoading(true);

        const videosToLoad = 30;
        const params = new URLSearchParams({
          channelId,
          order: "date",
          maxResults: String(videosToLoad),
        });

        // ⚠️ Ключ НЕ нужен в браузере — запрос идёт на наш серверный API-роут
        const res = await fetch(`/api/youtube/search?${params.toString()}`, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: SearchResponse = await res.json();
        setVideos(data.items ?? []);
      } catch (err: any) {
        if (err?.name === "AbortError") return;
        console.error("Error fetching videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
    return () => controller.abort();
  }, [channelId]);

  useEffect(() => {
    if (
      !loading &&
      videos.length === 0 &&
      process.env.NODE_ENV === "development"
    ) {
      console.log("Видео не найдены. Проверьте channelId.");
    }
  }, [loading, videos.length]);

  const updateVideosPerPage = (width: number) => {
    if (width >= 1024) {
      setVideosPerPage(2); // 2 видео на странице
    } else {
      setVideosPerPage(1); // 1 видео на странице
    }
  };

  const galleryItems: GalleryItem[] = videos.map((video) => ({
    id: video.videoId,
    content: (
      <>
        <h2
          className="text-2xl mb-4 line-clamp-2"
          style={{ minHeight: "3em" }}
          title={video.title}
        >
          {video.title}
        </h2>
        <div
          className="relative w-full"
          style={{ height: 0, paddingBottom: "56.25%" }}
        >
          <div className="absolute top-0 left-0 w-full h-full">
            <LiteYoutubeEmbed id={video.videoId} />
          </div>
        </div>
      </>
    ),
  }));

  return (
    <Container className="flex flex-col max-w-7xl">
      {!loading && videos.length > 0 && (
        <h1 className="caption lg:text-left mt-0 mb-7">
          <span className="purple">Видео на </span>
          канале
        </h1>
      )}
      {loading && (
        <div className="mb-6 text-sm opacity-70">Загружаем видео…</div>
      )}
      <Gallery
        items={galleryItems}
        itemsPerPage={videosPerPage}
        updateItemsPerPage={updateVideosPerPage}
        onNext={() => {}}
        onPrev={() => {}}
      />
    </Container>
  );
};
