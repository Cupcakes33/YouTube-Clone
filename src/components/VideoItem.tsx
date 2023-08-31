import htmlParser from "../utils/htmlParser";
import { Videos } from "../service/youtubeInstance";
import FormatTimeAgo from "./FormatTimeAgo";

type Props = {
  video: Videos;
};

function convertVideoDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  if (!match) {
    return "Invalid duration";
  }

  const hoursStr = (match[1] ?? "").replace("H", "") || "0";
  const minutesStr = (match[2] ?? "").replace("M", "") || "0";
  const secondsStr = (match[3] ?? "").replace("S", "") || "0";

  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  const seconds = parseInt(secondsStr, 10);

  const paddedHours = hours.toString().padStart(2, "0");
  const paddedMinutes = minutes.toString().padStart(2, "0");
  const paddedSeconds = seconds.toString().padStart(2, "0");

  if (hours > 0) {
    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  }
  return `${paddedMinutes}:${paddedSeconds}`;
}

const formatViewCount = (viewCount: string): string => {
  const formatter = new Intl.NumberFormat("ko-KR", {
    notation: "compact",
  });
  return formatter.format(parseInt(viewCount, 10));
};

export default function VideoItem({ video }: Props) {
  return (
    <div className="h-full flex flex-col">
      <div className="relative">
        <div className="aspect-w-16 aspect-h-9">
          <img
            className="h-full rounded-2xl object-cover"
            src={video.thumbnail.standard.url}
          />
        </div>
        <div className="absolute right-1 bottom-1 bg-gray-800 bg-opacity-70 px-[3px] py-[2px] rounded">
          <p className="text-white text-sm">
            {convertVideoDuration(video.duration)}
          </p>
        </div>
      </div>
      <div className="flex flex-row mt-2 gap-3">
        <img
          className="w-9 h-9 rounded-full"
          src={video.publisherProfileImg.default.url}
        />
        <div>
          <h3 className="line-clamp-2 leading-6 font-gray-600">
            {htmlParser(video.title)}
          </h3>
          <div className="mt-1 text-gray-500 font-normal">
            <p>{video.publisher}</p>
            <div className="flex flex-row">
              <p>조회수 {formatViewCount(video.viewCount)}회</p>
              <span className="mx-1">•</span>
              <FormatTimeAgo date={video.publishedAt} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
