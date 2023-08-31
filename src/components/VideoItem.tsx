import htmlParser from "../utils/htmlParser";
import { Videos } from "../service/youtubeInstance";

type Props = {
  video: Videos;
};

export default function VideoItem({ video }: Props) {
  return (
    <div>
      <img src={video.thumbnail.default.url} />
      <p>{video.duration}</p>
      <p>{htmlParser(video.title)}</p>
      <p>{video.publisher}</p>
      <img src={video.publisherProfileImg.default.url} />
      <p>{video.publishedAt}</p>
      <p>{video.viewCount}</p>
      <hr className="mb-2" />
    </div>
  );
}
