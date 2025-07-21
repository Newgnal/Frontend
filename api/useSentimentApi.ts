import axiosInstance from "@/lib/axiosInstance";

export const getSentimentScores = async (
  titles: string[]
): Promise<number[]> => {
  const results: number[] = [];

  for (const title of titles) {
    try {
      const res = await axiosInstance.post("/ai/sentiment", [title], {
        headers: { "Content-Type": "application/json" },
      });
      console.log("감성 점수 응답:", res.data);
      results.push(res.data?.data?.score ?? 0);
    } catch (error) {
      console.error("감성 점수 요청 실패:", error);
      results.push(0);
    }
  }

  return results;
};
