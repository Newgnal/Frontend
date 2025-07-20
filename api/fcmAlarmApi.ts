import axiosInstance from "@/lib/axiosInstance";

export const postAlarmToken = async (
  userId: number,
  fcmToken: string
): Promise<any> => {
  const res = await axiosInstance.post(`/fcm/v1/tokens`, {
    userId,
    fcmToken,
  });
  return res.data;
};
