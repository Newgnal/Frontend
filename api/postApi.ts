import axiosInstance from "@/lib/axiosInstance";

// 게시글 생성
interface CreatePostRequest {
  postTitle: string;
  postContent: string;
  newsId?: number;
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
  data: {
    postTitle?: string;
    postContent?: string;
    newsId?: number;
    thema?: string;
    hasVote?: boolean;
  }
) => {
  const res = await axiosInstance.patch(`/post/v1/${postId}`, data);
  return res.data;
};

// 게시글 삭제
export const deletePostById = async (postId: number) => {
  const res = await axiosInstance.delete(`/post/v1/${postId}`);
  return res.data;
};

// 게시글 리스트 조회
interface GetPostListParams {
  page?: number;
  size?: number;
  sortType?: string;
}

export const getPostList = async ({
  page = 0,
  size = 10,
  sortType = "LATEST",
}: GetPostListParams) => {
  const res = await axiosInstance.get("/post/v1/list", {
    params: { page, size, sortType },
  });
  return res.data.data.content;
};

// 게시글 상세 조회
export const getPostById = async (postId: number) => {
  const res = await axiosInstance.get(`/post/v1/detail/${postId}`);
  return res.data;
};

// 게시글 신고
interface ReportPostResponse {
  reportId: number;
  reported: boolean;
  targetType: string;
}

export const reportPostById = async (
  postId: number
): Promise<ReportPostResponse> => {
  const res = await axiosInstance.patch(`/post/v1/${postId}/report`);
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

// 대댓글 신고
interface ReportReplyResponse {
  reportId: number;
  reported: boolean;
  targetType: string;
}

export const reportReplyById = async (
  replyId: number
): Promise<ReportReplyResponse> => {
  const res = await axiosInstance.patch(`/post/v1/reply/${replyId}/report`);
  return res.data;
};

// 게시글 좋아요
interface TogglePostLikeResponse {
  likeId: number;
  liked: boolean;
  targetType: string;
}

export const togglePostLikeById = async (
  postId: number
): Promise<TogglePostLikeResponse> => {
  const res = await axiosInstance.patch(`/post/v1/${postId}/likes`);
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
