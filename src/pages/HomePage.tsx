import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import VideoItem from "../components/VideoItem";
import { useState } from "react";
import { useYoutubeApi } from "../context/YoutubeApiContext";
import { FetchVideos } from "../service/youtubeInstance";

const CATEGORYS = ["0", "10", "15", "17", "20"];

export default function HomePage() {
  const [category, setCategory] = useState("0");
  const { youtubeInstance } = useYoutubeApi();
  const {
    data: { items, nextPageToken } = {},
    isLoading,
    isError,
  } = useQuery<FetchVideos>(
    ["videos", category],
    () => youtubeInstance.fetchVideos({ categoryId: category }),
    {
      staleTime: 1000 * 60 * 10,
    }
  );

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error...</div>}
      {CATEGORYS.map((category) => (
        <button
          key={category}
          className="p-2 border mr-2"
          onClick={() => setCategory(category)}
        >
          {category}
        </button>
      ))}
      {items
        ? items.map((video) => <VideoItem key={video.id} video={video} />)
        : null}
    </>
  );
}
