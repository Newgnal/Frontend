import axiosInstance from "@/lib/axiosInstance";

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
  return res.data.vote;
};
