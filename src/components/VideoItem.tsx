import { Videos } from "../types/instance";
import htmlParser from "../utils/htmlParser";
import FormatTimeAgo from "./FormatTimeAgo";
import { convertVideoDuration, formatViewCount } from "../utils/format";

type Props = {
  video: Videos;
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
