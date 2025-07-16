import axiosInstance from "@/lib/axiosInstance";

export const getCommunityHomeData = async () => {
  const res = await axiosInstance.get("/post/v1/list/home");
  return {
    topThemas: res.data.topThemes,
    hotPosts: res.data.hotPostResponse,
    recentPosts: res.data.postResponse,
  };
};
