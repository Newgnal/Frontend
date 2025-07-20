import axiosInstance from "@/lib/axiosInstance";
import {
  CommentListResponse,
  CommentResponse,
  DeleteCommentResponse,
  UpdateCommentRequest,
  UpdateCommentResponse,
} from "@/types/newscomment";

// 댓글 또는 답글 생성
export const postComment = (
  newsId: number,
  comment: string,
  parentId?: number
) => {
  return axiosInstance.post<CommentResponse>("/news/v1/comment", {
    newsId,
    comment,
    ...(parentId !== undefined && { parentId }),
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
