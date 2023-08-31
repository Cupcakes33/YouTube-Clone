import { ChannelResponse, VideoResponse } from "../types/youtubeAPI";
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

export default class Youtube {
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

  fetchVideos = async ({ pageToken, categoryId }: VideoParamsProps) => {
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
        description: video.snippet.description,
        thumbnails: video.snippet.thumbnails,
        channelTitle: video.snippet.channelTitle,
        publishedAt: video.snippet.publishedAt,
        viewCount: video.statistics.viewCount,
        channelThumbnail: channelInfo.snippet.thumbnails,
      };
    });

    return { items, nextPageToken };
  };
}
