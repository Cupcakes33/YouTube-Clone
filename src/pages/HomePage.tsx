import { useQuery } from "@tanstack/react-query";
import { VideoItem } from "../types/youtube";

const decodeHTMLEntities = (text: string) => {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
};

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
              <p>{decodeHTMLEntities(video.snippet.title)}</p>
              <img src={video.snippet.thumbnails.medium.url} />
              <div>{video.snippet.title}</div>
            </div>
          ))
        : null}
    </>
  );
}
