export type KeywordCountResponse = {
  keywordId: number;
  keywordName: string;
  count: number;
};

export type ServerKeyword = {
  id: number;
  keyword: string;
  createdAt: string;
  userId: number;
};
export type PopularKeyword = {
  keyword: string;
  count: number;
  representativeNews: {
    title: string;
    source: string;
    timeAgo: string;
  } | null;
};

export type NewsItem = {
  id: number;
  title: string;
  source: string;
  thema: string;
  date: string;
  sentiment: number;
  imageUrl: string;
  view: number;
  commentNum: number;
  voteNum: number;
};

export type KeywordNewsResponse = {
  keyword: string;
  newsData: {
    content: NewsItem[];
    hasNext: boolean;
    nextLastId: number;
    size: number;
    totalCount: number;
  };
};
