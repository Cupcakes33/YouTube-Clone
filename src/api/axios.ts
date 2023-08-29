import axios from "axios";

// 10 - Music
// 15 - Pets & Animals
// 17 - Sports
// 20 - Gaming

const instance = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: { key: import.meta.env.VITE_YOUTUBE_API_KEY },
});

export const fetchPopularVideos = async (
  categoryId?: string,
  pageToken?: string
) => {
  const params = {
    part: "snippet, contentDetails, statistics",
    chart: "mostPopular",
    regionCode: "KR",
    maxResults: 10,
    pageToken,
    ...(categoryId && { videoCategoryId: categoryId }),
  };
  const response = await instance.get("/videos", { params });
  return response.data.items;
};

// 서비스에서 제공하는 카테고리는 4가지 밖에 없으므로 categoryId 의 type 을 제한해야 할 지 고민해보기.

export const fetchChannelInfo = async (channelIds: string[]) => {
  const params = {
    part: "snippet",
    id: channelIds.join(","),
  };

  const response = await instance.get("/channels", { params });
  return response.data.items;
};

export const getPopularVideos = async (
  pageToken?: string,
  categoryId?: string
) => {
  const videos = await fetchPopularVideos(pageToken, categoryId);
  const channelIds = videos.map((video: any) => video.snippet.channelId);
  const channels = await fetchChannelInfo(channelIds);

  return videos.map((video) => {
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
};
