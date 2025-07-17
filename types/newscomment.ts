// 댓글 공통 응답 구조
export interface CommentItem {
  commentId: number;
  comment: string;
  voteType:
    | "STRONGLY_POSITIVE"
    | "POSITIVE"
    | "NEUTRAL"
    | "NEGATIVE"
    | "STRONGLY_NEGATIVE";
  nickName: string;
  createdAt: string;
  timeAgo: string;
}

// 댓글 작성 요청
export interface PostCommentRequest {
  newsId: number;
  comment: string;
}

// 댓글 작성 응답 = CommentItem 그대로 사용
export type CommentResponse = CommentItem;

// 댓글 리스트 조회 응답
export interface GetCommentsResponse {
  data: any;
  newsId: number;
  totalCount: number;
  comments: CommentItem[];
}

// 댓글 수정 요청
export interface UpdateCommentRequest {
  comment: string;
  newsId: number;
}

// 댓글 수정 응답 = CommentItem 그대로 사용
export type UpdateCommentResponse = CommentItem;

// 댓글 삭제 응답
export interface DeleteCommentResponse {
  status?: string; // 예: "삭제 성공"
}
