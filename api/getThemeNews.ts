import axiosInstance from "@/lib/axiosInstance";
import { NewsItem } from "@/types/news";

const sortTypeMap = {
  latest: "LATEST",
  views: "POPULAR",
} as const;

export const getThemeNews = async (
  thema: string,
  order: "latest" | "views" = "views",
  page: number = 0
): Promise<{ content: NewsItem[] }> => {
  const res = await axiosInstance.get(`/news/v1/thema/${thema}`, {
    params: {
      sort: order.toUpperCase(),
      page,
      size: 5,
    },
  });
  return res.data.data;
};
