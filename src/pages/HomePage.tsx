import { useQuery } from "@tanstack/react-query";
import { VideoItem } from "../types/youtube";
import htmlParser from "../utils/htmlParser";

export default function HomePage() {
  const {
    data: initVideosData,
    isLoading,
    isError,
  } = useQuery(["videos"], async () => {
    return fetch(`/mock/youtube_list.json`).then((res) =>
      res.json().then((data) => data.items)
    );
  });

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error...</div>}
      {initVideosData
        ? initVideosData.map((video: VideoItem) => (
            <div key={video.id.videoId}>
              <p>{htmlParser(video.snippet.title)}</p>
              <img src={video.snippet.thumbnails.medium.url} />
            </div>
          ))
        : null}
    </>
  );
}
