type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

type Thumbnails = Record<"default" | "medium" | "high", Thumbnail> & {
  standard?: Thumbnail;
  maxres?: Thumbnail;
};

type Snippet = {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
};

export type VideoItem = {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
};

export type YoutubeList = {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: VideoItem[];
};
