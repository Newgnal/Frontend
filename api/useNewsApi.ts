import axiosInstance from "@/lib/axiosInstance";
import { NewsItem } from "@/types/news";

//뉴스 전체 조회
export const getAllNews = async (
  order: "latest" | "views",
  pageNum: number
): Promise<NewsItem[]> => {
  const sortParam = order === "latest" ? "LATEST" : "POPULAR";

  const res = await axiosInstance.get("/news/v1", {
    params: {
      sortType: sortParam,
      page: pageNum,
      size: 5,
    },
  });
  return res.data.data.content;
};

//뉴스 상세 페이지
export const getNewsById = async (id: string): Promise<NewsItem | null> => {
  try {
    const res = await axiosInstance.get(`/news/v1/${id}`);
    return res.data?.data || null;
  } catch (e) {
    return null;
  }
};
