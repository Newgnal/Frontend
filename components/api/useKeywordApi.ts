import axiosInstance from "@/lib/axiosInstance";
import {
  KeywordCountResponse,
  KeywordNewsResponse,
  PopularKeyword,
  ServerKeyword,
} from "@/types/keyword";

// 키워드 목록 조회
export const getKeywords = async (): Promise<KeywordCountResponse[]> => {
  const res = await axiosInstance.get("/newsroom/v1/keywords");
  const keywordCounts = res.data?.data?.keywordCounts;

  if (!Array.isArray(keywordCounts)) {
    console.error("서버 응답 구조 이상:", res.data);
    return [];
  }

  return keywordCounts;
};

// 키워드 등록
export const postKeyword = async (keyword: string): Promise<ServerKeyword> => {
  const res = await axiosInstance.post("/newsroom/v1/keywords", { keyword });
  return res.data.data as ServerKeyword;
};

// 키워드 삭제
export const deleteKeyword = async (keywordId: number): Promise<void> => {
  await axiosInstance.delete(`/newsroom/v1/keywords/${keywordId}`);
};

// 키워드 순서 변경
export const updateKeywordOrder = async (
  keywordIds: number[]
): Promise<void> => {
  await axiosInstance.put("/newsroom/v1/keywords/order", { keywordIds });
};

// 인기 키워드 조회
export const getPopularKeywords = async (
  count = 10
): Promise<PopularKeyword[]> => {
  const res = await axiosInstance.get("/newsroom/v1/popular-keywords", {
    params: { count },
  });

  const keywordList = res.data?.data;

  if (!Array.isArray(keywordList)) {
    console.error(" 인기 키워드 응답 형식 이상:", res.data);
    return [];
  }

  return keywordList;
};

// 키워드별 뉴스 조회
export const getKeywordNews = async (
  keywordId: number
): Promise<KeywordNewsResponse> => {
  const res = await axiosInstance.get(
    `/newsroom/v1/keywords/${keywordId}/news`
  );

  return res.data?.data;
};
