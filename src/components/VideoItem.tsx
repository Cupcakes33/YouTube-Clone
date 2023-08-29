import React from "react";
import htmlParser from "../utils/htmlParser";

type Props = {
  video: any;
};

export default function VideoItem({ video }: Props) {
  return (
    <div>
      <img src={video.thumbnail} />
      <p>{video.duration}</p>
      <p>{htmlParser(video.title)}</p>
      <p>{video.publisher}</p>
      <img src={video.publisherProfileImg} />
      <p>{video.publishedAt}</p>
      <p>{video.viewCount}</p>
    </div>
  );
}
