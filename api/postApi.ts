import axiosInstance from "@/lib/axiosInstance";

// 게시글 생성
interface CreatePostRequest {
  postTitle: string;
  postContent: string;
  articleUrl?: string;
  thema: string;
  hasVote: boolean;
}

export const createPost = async (data: CreatePostRequest) => {
  const res = await axiosInstance.post("/post/v1", data);
  return res.data;
};

// 게시글 수정
export const updatePost = async (
  postId: number,
  data: { title?: string; content?: string }
) => {
  const res = await axiosInstance.patch(`/post/v1/${postId}`, data);
  return res.data;
};

// 게시글 삭제
export const deletePostbyId = async (postId: number) => {
  const res = await axiosInstance.delete(`/post/v1/${postId}`);
  return res.data;
};

// 게시글 신고
export const reportPost = async (postId: number) => {
  const res = await axiosInstance.patch(`/post/v1/${postId}/report`);
  return res.data;
};

// (나중에 만들게 될 GET API)
// export const getPostList = async () => {
//   const res = await axiosInstance.get("/post/v1/list");
//   return res.data;
// };
