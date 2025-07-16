export type VoteType =
  | "STRONGLY_NEGATIVE"
  | "NEGATIVE"
  | "NEUTRAL"
  | "POSITIVE"
  | "STRONGLY_POSITIVE";

export interface VoteRequest {
  newsId: number;
  voteType: VoteType;
}

export interface VoteResponse {
  newsId: number;
  stronglyPositiveCount: number;
  positiveCount: number;
  neutralCount: number;
  negativeCount: number;
  stronglyNegativeCount: number;
  voteType: VoteType;
  thema: string;
}
