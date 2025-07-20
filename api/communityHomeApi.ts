import axiosInstance from "@/lib/axiosInstance";

export const getCommunityHomeData = async () => {
  const res = await axiosInstance.get("/post/v1/list/home");
  const responseData = res.data.data;
  return {
    topThemes: responseData.topThemes,
    hotPosts: responseData.hotPostResponse,
    recentPosts: responseData.postResponse,
  };
};

// 게시글 투표
interface VotePostRequest {
  postId: number;
  voteType: "BUY" | "HOLD" | "SELL";
}

interface VotePostResponse {
  postId: number;
  buyCount: number;
  holdCount: number;
  sellCount: number;
  voteType: "BUY" | "HOLD" | "SELL";
}

export const votePost = async (
  data: VotePostRequest
): Promise<VotePostResponse> => {
  const res = await axiosInstance.post("/post/v1/vote", data);
  return res.data;
};

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

// 대댓글 작성
interface WriteReplyRequest {
  replyContent: string;
}

interface WriteReplyResponse {
  replyId: number;
  replyContent: string;
  nickname: string;
  createdAt: string; // ISO 8601
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

export const writeComment = async (
  postId: number,
  data: WriteCommentRequest
): Promise<WriteCommentResponse> => {
  const res = await axiosInstance.post(`/post/v1/comment/${postId}`, data);
  return res.data;
};
