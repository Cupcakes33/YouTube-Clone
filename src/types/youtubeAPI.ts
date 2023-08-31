type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

export type Thumbnails = Record<"default" | "medium" | "high", Thumbnail> & {
  standard?: Thumbnail;
  maxres?: Thumbnail;
};

type Localized = {
  title: string;
  description: string;
};

type SnippetCommon = {
  publishedAt: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  defaultLanguage?: string;
  localized: Localized;
};

type VideoResponseSnippet = SnippetCommon & {
  channelId: string;
  channelTitle: string;
  tags?: string[];
  categoryId: string;
  liveBroadcastContent: string;
  defaultAudioLanguage?: string;
};

type ContentDetails = {
  duration: string;
  dimension: string;
  definition: string;
  caption: string;
  licensedContent: boolean;
  contentRating: Record<string, unknown>;
  projection: string;
};

type Statistics = {
  viewCount: string;
  likeCount: string;
  favoriteCount: string;
  commentCount: string;
};

export type VideoResponse = {
  kind: string;
  etag: string;
  id: string;
  snippet: VideoResponseSnippet;
  contentDetails: ContentDetails;
  statistics: Statistics;
};

type ChannelResponseSnippet = SnippetCommon & {
  customUrl: string;
  country?: string;
};

export type ChannelResponse = {
  kind: string;
  etag: string;
  id: string;
  snippet: ChannelResponseSnippet;
};
