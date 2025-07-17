import axiosInstance from "@/lib/axiosInstance";
import {
  CommentResponse,
  DeleteCommentResponse,
  GetCommentsResponse,
  UpdateCommentRequest,
  UpdateCommentResponse,
} from "@/types/newscomment";

//댓글 작성
export const postComment = (newsId: number, comment: string) => {
  return axiosInstance.post<CommentResponse>("/news/v1/comments", {
    newsId,
    comment,
  });
};

//댓글 목록 조회
export const getComments = (newsId: number) => {
  return axiosInstance.get<GetCommentsResponse>(`/news/v1/comments/${newsId}`);
};

//댓글 수정
export const updateComment = (
  commentId: number,
  data: UpdateCommentRequest
) => {
  return axiosInstance.put<UpdateCommentResponse>(
    `/news/v1/comments/${commentId}`,
    data
  );
};

//댓글 삭제
export const deleteComment = (commentId: number) => {
  return axiosInstance.delete<DeleteCommentResponse>(
    `/news/v1/comments/${commentId}`
  );
};
