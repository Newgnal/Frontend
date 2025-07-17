export interface NewsItem {
  newsId: number;
  id: number;
  title: string;
  contentUrl: string;
  source: string;
  thema: string;
  date: string;
  sentiment: number;
  imageUrl: string;
  imageCaption: string;
  view: number;
  commentNum: number;
  voteNum: number;
  summary: string;
}
