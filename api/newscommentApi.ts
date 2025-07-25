import axiosInstance from "@/lib/axiosInstance";
import {
  CommentListResponse,
  DeleteCommentResponse,
  UpdateCommentRequest,
  UpdateCommentResponse,
} from "@/types/newscomment";

// 댓글 또는 답글 생성
export const postComment = (
  newsId: number,
  comment: string,
  voteType: string = "NEUTRAL"
) => {
  return axiosInstance.post("/news/v1/comment", {
    newsId,
    comment,
    voteType,
  });
};

export const postReply = (payload: {
  comment: string;
  parentId: number;
  newsId: number;
  voteType?: string;
}) => {
  console.log(" 최종 postReply payload:", payload);

  return axiosInstance.post("/news/v1/comment", {
    comment: payload.comment,
    parentId: payload.parentId,
    voteType: payload.voteType ?? "NEUTRAL",
    newsId: payload.newsId,
  });
};

// 댓글 전체 조회
export const getComments = (newsId: number) => {
  return axiosInstance.get<CommentListResponse>(`/news/v1/comment/${newsId}`);
};

// 댓글 또는 답글 수정
export const updateComment = (
  commentId: number,
  data: UpdateCommentRequest
) => {
  return axiosInstance.patch<UpdateCommentResponse>(
    `/news/v1/comment/${commentId}`,
    data
  );
};

// 댓글 또는 답글 삭제
export const deleteComment = (commentId: number) => {
  return axiosInstance.delete<DeleteCommentResponse>(
    `/news/v1/comment/${commentId}`
  );
};

// 댓글 좋아요 추가/취소
export const toggleLikeComment = async (commentId: number) => {
  console.log("toggleLikeComment 호출:", commentId);
  return axiosInstance.post(`/news/v1/comment/like/${commentId}`);
};

// 댓글 좋아요 상태 조회
export const getLikeStatus = (commentId: number) => {
  return axiosInstance.get(`/news/v1/comment/like/${commentId}/status`);
};
