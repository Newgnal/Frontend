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
