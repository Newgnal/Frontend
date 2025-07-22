import axiosInstance from "@/lib/axiosInstance";

// 대댓글 작성
interface WriteReplyRequest {
  replyContent: string;
}

interface WriteReplyResponse {
  replyId: number;
  replyContent: string;
  nickname: string;
  createdAt: string;
  voteType: "BUY" | "SELL" | "HOLD" | null;
  likeCount: number;
}

export const writeReply = async (
  commentId: number,
  data: WriteReplyRequest
): Promise<WriteReplyResponse> => {
  const res = await axiosInstance.post(
    `/post/v1/comment/reply/${commentId}`,
    data
  );
  return res.data;
};

// 대댓글 좋아요
interface ToggleReplyLikeResponse {
  likeId: number;
  liked: boolean;
  targetType: string;
}

export const toggleReplyLikeById = async (
  replyId: number
): Promise<ToggleReplyLikeResponse> => {
  const res = await axiosInstance.patch(`/post/v1/reply/${replyId}/likes`);
  return res.data;
};

// 대댓글 삭제
export const deleteReplyById = async (replyId: number) => {
  const res = await axiosInstance.delete(`/post/v1/comment/reply/${replyId}`);
  return res.data;
};

// 대댓글 신고
interface ReportReplyResponse {
  reportId: number;
  reported: boolean;
  targetType: string;
}

export const reportReplyById = async (
  replyId: number
): Promise<ReportReplyResponse> => {
  const res = await axiosInstance.patch(`/report/v1/reply/${replyId}`);
  return res.data;
};
