import axiosInstance from "@/lib/axiosInstance";

interface SendNotificationPayload {
  token: string;
  title: string;
  body: string;
}

interface SendNotificationResponse {
  messageId: string;
  fcmToken: string;
  sentAt: string;
}

export const sendPushNotification = async (
  payload: SendNotificationPayload
): Promise<SendNotificationResponse> => {
  const res = await axiosInstance.post("/fcm/v1/notifications", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
};
