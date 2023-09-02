import {
  ChannelResponse,
  Thumbnails,
  VideoResponse,
  VideoThumbnails,
} from "../types/youtubeAPI";

export type CategoryId = "0" | "10" | "15" | "17" | "20";

export type VideoParamsProps = {
  categoryId?: CategoryId;
  pageToken?: string;
};

export type PopularVideos = {
  videos: VideoResponse[];
  nextPageToken: string;
};

export type ChannelInfo = ChannelResponse[];

export type Videos = {
  id: string;
  title: string;
  duration: string;
  thumbnail: VideoThumbnails;
  publishedAt: string;
  viewCount: string;
  publisher: string;
  publisherProfileImg: Thumbnails;
};

export type FetchVideos = {
  items: Videos[];
  nextPageToken: string;
};

export interface IYoutubeInstance {
  fetchVideos: (params: VideoParamsProps) => Promise<FetchVideos>;
}
