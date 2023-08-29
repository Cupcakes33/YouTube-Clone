import { useQuery } from "@tanstack/react-query";
import { getPopularVideos } from "../api/axios";
import VideoItem from "../components/VideoItem";
import { useState } from "react";

const CATEGORYS = ["0", "10", "15", "17", "20"];

export default function HomePage() {
  const [category, setCategory] = useState("0");
  const {
    data: initVideosData,
    isLoading,
    isError,
  } = useQuery(["videos", category], () => getPopularVideos(category), {
    staleTime: 1000 * 60 * 10,
  });

  console.log(initVideosData);
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error...</div>}
      {CATEGORYS.map((category) => (
        <button
          className="p-2 border mr-2"
          onClick={() => setCategory(category)}
        >
          {category}
        </button>
      ))}
      {initVideosData
        ? initVideosData.map((video: any) => (
            <VideoItem key={video.id} video={video} />
          ))
        : null}
    </>
  );
}
