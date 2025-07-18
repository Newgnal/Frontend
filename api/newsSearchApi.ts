import axiosInstance from "@/lib/axiosInstance";
import { SearchNewsResponse } from "@/types/newsSearch";

export const getSearchNews = async (
  title: string,
  page: number,
  size: number
): Promise<SearchNewsResponse> => {
  const response = await axiosInstance.get("/search/v1", {
    params: { title, page, size },
    headers: { Accept: "*/*" },
  });
  return response.data.data;
};
