import {
  ChannelResponse,
  Thumbnails,
  VideoResponse,
} from "../types/youtubeAPI";
import axios, { AxiosInstance } from "axios";

type VideoParamsProps = {
  categoryId?: string;
  pageToken?: string;
};

type PopularVideos = {
  videos: VideoResponse[];
  nextPageToken: string;
};

type ChannelInfo = ChannelResponse[];

export type Videos = {
  id: string;
  title: string;
  duration: string;
  thumbnail: Thumbnails;
  publishedAt: string;
  viewCount: string;
  publisher: string;
  publisherProfileImg: Thumbnails;
};

export type FetchVideos = {
  items: Videos[];
  nextPageToken: string;
};

export default class YoutubeInstance {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: "https://www.googleapis.com/youtube/v3",
      params: { key: import.meta.env.VITE_YOUTUBE_API_KEY },
    });
  }

  private getPopularVideosParams = ({
    categoryId,
    pageToken,
  }: VideoParamsProps) => {
    return {
      part: "snippet, contentDetails, statistics",
      chart: "mostPopular",
      regionCode: "KR",
      maxResults: 10,
      pageToken,
      ...(categoryId && { videoCategoryId: categoryId }),
    };
  };

  private fetchPopularVideos = async ({
    categoryId,
    pageToken,
  }: VideoParamsProps): Promise<PopularVideos> => {
    const params = this.getPopularVideosParams({ categoryId, pageToken });
    const response = await this.instance.get("/videos", { params });
    return {
      videos: response.data.items,
      nextPageToken: response.data.nextPageToken,
    };
  };

  private getChannelInfoParams = (channelIds: string[]) => {
    return {
      part: "snippet",
      id: channelIds.join(","),
    };
  };

  private fetchChannelInfo = async (
    channelIds: string[]
  ): Promise<ChannelInfo> => {
    const params = this.getChannelInfoParams(channelIds);
    const response = await this.instance.get("/channels", { params });
    return response.data.items;
  };

  fetchVideos = async ({
    pageToken,
    categoryId,
  }: VideoParamsProps): Promise<FetchVideos> => {
    const { videos, nextPageToken } = await this.fetchPopularVideos({
      pageToken,
      categoryId,
    });
    const channelIds = videos.map((video) => video.snippet.channelId);
    const channels = await this.fetchChannelInfo(channelIds);

    const items = videos.map((video) => {
      const channelInfo = channels.find(
        (channel) => channel.id === video.snippet.channelId
      )!;

      return {
        id: video.id,
        title: video.snippet.title,
        duration: video.contentDetails.duration,
        thumbnail: video.snippet.thumbnails,
        publishedAt: video.snippet.publishedAt,
        viewCount: video.statistics.viewCount,
        publisher: channelInfo.snippet.title,
        publisherProfileImg: channelInfo.snippet.thumbnails,
      };
    });

    return { items, nextPageToken };
  };
}
