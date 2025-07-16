export interface NewsItem {
  id: number;
  title: string;
  content: string;
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
