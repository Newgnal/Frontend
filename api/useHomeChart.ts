import axiosInstance from "@/lib/axiosInstance";

export interface DailyAnalytics {
  date: string;
  avgSentiment: number;
  newsCount: number;
}

export const getHomeAnalytics = async (
  themaCode: string
): Promise<DailyAnalytics[]> => {
  const res = await axiosInstance.get(
    `/news/v1/analytics/thema/${themaCode}/recent-month`
  );

  return res.data.data.dailyData;
};
