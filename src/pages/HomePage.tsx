import { useQuery } from "@tanstack/react-query";
import { VideoItem } from "../types/youtube";
import htmlParser from "../utils/htmlParser";
import { getVideos } from "../api/axios";

export default function HomePage() {
  const {
    data: initVideosData,
    isLoading,
    isError,
  } = useQuery(["videos"], () => getVideos());

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error...</div>}
      {initVideosData
        ? initVideosData.map((video: VideoItem) => (
            <div key={video.id}>
              <p>{htmlParser(video.snippet.title)}</p>
              <img src={video.snippet.thumbnails.medium.url} />
            </div>
          ))
        : null}
    </>
  );
}
