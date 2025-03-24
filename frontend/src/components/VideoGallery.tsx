import React, { useEffect, useState } from "react";
import { Gallery, GalleryItem } from "@/components/Gallery";
import { Container } from "@/components/Container";
import { LiteYoutubeEmbed } from "react-lite-yt-embed";

interface Video {
  videoId: string;
  title: string;
}

export const VideoGallery = ({ channelId }: { channelId: string }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [videosPerPage, setVideosPerPage] = useState<number>(2); // Default to 2 videos per page
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  useEffect(() => {
    const fetchVideos = async () => {
      if (!apiKey) {
        console.error("API key is missing");
        return;
      }

      try {
        const videosToLoad = 30;
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${videosToLoad}`,
        );
        if (!response.ok) {
          throw new Error(`HTTPS error! status: ${response.status}`);
        }
        const data = await response.json();
        const videoData = data.items
          .map((item: any) => ({
            videoId: item.id.videoId,
            title: item.snippet.title,
          }))
          .filter((video: Video) => video.videoId);

        setVideos(videoData);
      } catch (error) {
        console.error("Error fetching videos from YouTube API:", error);
      }
    };

    fetchVideos();
  }, [channelId, apiKey]);

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
        <h2 className="text-2xl mb-4 line-clamp-2" style={{ minHeight: "3em" }}>
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
      <h1 className="caption lg:text-left mt-0 mb-7">
        <span className="purple">Видео на </span>
        канале
      </h1>
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
