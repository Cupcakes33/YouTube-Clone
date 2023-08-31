import axios from "axios";

// 10 - Music
// 15 - Pets & Animals
// 17 - Sports
// 20 - Gaming

const instance = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: { key: import.meta.env.VITE_YOUTUBE_API_KEY },
});

export const fetchPopularVideos = async ({
  categoryId,
  pageToken,
}: {
  categoryId?: string;
  pageToken?: string;
}) => {
  const params = {
    part: "snippet, contentDetails, statistics",
    chart: "mostPopular",
    regionCode: "KR",
    maxResults: 10,
    pageToken,
    ...(categoryId && { videoCategoryId: categoryId }),
  };

  const response = await instance.get("/videos", { params });
  return {
    videos: response.data.items,
    nextPageToken: response.data.nextPageToken,
  };
};

export const fetchChannelInfo = async (channelIds: string[]) => {
  const params = {
    part: "snippet",
    id: channelIds.join(","),
  };

  const response = await instance.get("/channels", { params });
  return response.data.items;
};

export const getPopularVideos = async ({
  pageToken,
  categoryId,
}: {
  pageToken?: string;
  categoryId?: string;
}) => {
  const { videos, nextPageToken } = await fetchPopularVideos({
    pageToken,
    categoryId,
  });

  const channelIds = videos.map((video: any) => video.snippet.channelId);
  const channels = await fetchChannelInfo(channelIds);
  console.log(channels);

  const items = videos.map((video) => {
    const channelInfo = channels.find(
      (channel) => channel.id === video.snippet.channelId
    );
    return {
      id: video.id,
      title: video.snippet.title,
      duration: video.contentDetails.duration,
      thumbnail: video.snippet.thumbnails.medium.url,
      publishedAt: video.snippet.publishedAt,
      viewCount: video.statistics.viewCount,
      publisher: channelInfo.snippet.title,
      publisherProfileImg: channelInfo.snippet.thumbnails.default.url,
    };
  });

  return { items, nextPageToken: nextPageToken };
};

// 어떻게 하면 nextPageToken 을 전달할 수 있을지 고민해보기.
