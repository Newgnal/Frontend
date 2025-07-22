// 댓글 또는 답글 1개 정보
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

  parentId?: number;
  replies: CommentItem[];
  replyCount?: number;
}

// 댓글 또는 답글 작성 요청
export interface PostCommentRequest {
  newsId: number;
  comment: string;
  voteType:
    | "STRONGLY_POSITIVE"
    | "POSITIVE"
    | "NEUTRAL"
    | "NEGATIVE"
    | "STRONGLY_NEGATIVE";
  parentId?: number; // 있으면 답글
}

// 댓글 또는 답글 응답
export type CommentResponse = CommentItem;

// 댓글 전체 목록 조회 응답
export interface CommentListResponse {
  data: any;
  newsId: number;
  totalCount: number;
  comments: CommentItem[];
}

// 댓글 또는 답글 수정 요청
export interface UpdateCommentRequest {
  comment: string;
  newsId: number;
}

// 삭제 응답
export interface DeleteCommentResponse {
  status?: string; // 예: "삭제 성공"
}

//수정 응답
export type UpdateCommentResponse = CommentItem;
