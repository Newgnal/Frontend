import axiosInstance from "@/lib/axiosInstance";

// 댓글 작성
interface WriteCommentRequest {
  comment: string;
}

interface WriteCommentResponse {
  commentId: number;
  commentContent: string;
  likeCount: number;
  nickname: string;
  createdAt: string;
  voteType: "BUY" | "SELL" | "HOLD" | null;
  replies: {
    replyId: number;
    replyContent: string;
    nickname: string;
    createdAt: string;
    voteType: "BUY" | "SELL" | "HOLD" | null;
    likeCount: number;
  }[];
}

export const writeComment = async (
  postId: number,
  data: WriteCommentRequest
): Promise<WriteCommentResponse> => {
  const res = await axiosInstance.post(`/post/v1/comment/${postId}`, data);
  return res.data;
};

// 댓글 좋아요
interface ToggleCommentLikeResponse {
  likeId: number;
  liked: boolean;
  targetType: string;
}

export const toggleCommentLikeById = async (
  commentId: number
): Promise<ToggleCommentLikeResponse> => {
  const res = await axiosInstance.patch(`/post/v1/comment/${commentId}/likes`);
  return res.data;
};

// 댓글 삭제
export const deleteCommentById = async (commentId: number) => {
  const res = await axiosInstance.delete(`/post/v1/comment/${commentId}`);
  return res.data;
};

// 댓글 신고
interface ReportCommentResponse {
  commentId: number;
  reported: boolean;
  targetType: string;
}

export const reportCommentById = async (
  commentId: number
): Promise<ReportCommentResponse> => {
  const res = await axiosInstance.patch(`/post/v1/comment/${commentId}/report`);
  return res.data;
};
