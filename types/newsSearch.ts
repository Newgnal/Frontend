export interface SearchNewsItem {
  id: number;
  title: string;
  source: string;
  thema: string;
  date: string;
  sentiment: number;
  imageUrl: string;
  imageCaption: string;
  view: number;
  commentNum: number;
  voteNum: number;
}

export interface RecentSearchItem {
  searchId: number;
  content: string;
}

export interface SearchNewsResponse {
  newsList: SearchNewsItem[];
  recentSearches: RecentSearchItem[];
  hasNext: boolean;
}
