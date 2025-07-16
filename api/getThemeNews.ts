import axiosInstance from "@/lib/axiosInstance";
import { NewsItem } from "@/types/news";

export const getThemeNews = async (
  thema: string,
  order: "latest" | "views" = "latest"
): Promise<{ content: NewsItem[] }> => {
  const res = await axiosInstance.get(`/news/v1/thema/${thema}`, {
    params: {
      sort: order.toUpperCase(),
      page: 0,
      size: 5,
    },
  });
  return res.data.data;
};
