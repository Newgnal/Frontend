import axiosInstance from "@/lib/axiosInstance";

interface NotificationItem {
  id: number;
  type: string;
  typeName: string;
  title: string;
  body: string;
  isRead: boolean;
  timeAgo: string;
  createdAt: string;
  readAt: string;
  relatedEntityId: number;
  status: string;
}

export interface GetNotificationsResponse {
  status: number;
  message: string;
  data: {
    notifications: NotificationItem[];
    totalCount: number;
    hasNext: boolean;
    unreadCount: number;
  };
}

export const getNotifications = async (
  userId: number,
  page: number = 0,
  size: number = 20
): Promise<GetNotificationsResponse> => {
  const res = await axiosInstance.get("/notifications/v1", {
    params: {
      userId,
      page,
      size,
    },
  });
  return res.data;
};

export const markNotificationAsRead = async (
  notificationId: number,
  userId: number
): Promise<void> => {
  await axiosInstance.put(`/notifications/v1/${notificationId}/read`, null, {
    params: {
      userId,
    },
  });
};
