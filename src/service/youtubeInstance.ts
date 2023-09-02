import axios, { AxiosInstance } from "axios";
import {
  VideoParamsProps,
  FetchVideos,
  PopularVideos,
  ChannelInfo,
  IYoutubeInstance,
} from "../types/instance";
class BaseYoutubeInstance {
  protected instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: "https://www.googleapis.com/youtube/v3",
      params: { key: import.meta.env.VITE_YOUTUBE_API_KEY },
    });
  }
}

class ParamsInstance extends BaseYoutubeInstance {
  protected getPopularVideosParams = ({
    categoryId,
    pageToken,
  }: VideoParamsProps) => {
    return {
      part: "snippet, contentDetails, statistics",
      chart: "mostPopular",
      regionCode: "KR",
      maxResults: 16,
      pageToken,
      ...(categoryId && { videoCategoryId: categoryId }),
    };
  };

  protected getChannelInfoParams = (channelIds: string[]) => {
    return {
      part: "snippet",
      id: channelIds.join(","),
    };
  };
}

class MiddlewareYoutubeInstance extends ParamsInstance {
  protected fetchPopularVideos = async ({
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

  protected fetchChannelInfo = async (
    channelIds: string[]
  ): Promise<ChannelInfo> => {
    const params = this.getChannelInfoParams(channelIds);
    const response = await this.instance.get("/channels", { params });
    return response.data.items;
  };
}

export default class YoutubeInstance
  extends MiddlewareYoutubeInstance
  implements IYoutubeInstance
{
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
