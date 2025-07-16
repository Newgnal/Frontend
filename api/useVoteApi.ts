import axiosInstance from "@/lib/axiosInstance";
import { VoteRequest, VoteResponse } from "@/types/vote";

export const postVote = async (payload: VoteRequest): Promise<VoteResponse> => {
  const res = await axiosInstance.post("/news/v1/vote", payload);
  return res.data.data;
};
