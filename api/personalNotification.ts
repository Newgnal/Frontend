import axiosInstance from "@/lib/axiosInstance";

const BASE_URL = "/user-notification/v1";

// 1. 전체 알림 설정 조회
export const getNotificationSettings = () => {
  return axiosInstance.get(`${BASE_URL}`);
};

// 2. 알림 유형 활성화/비활성화
export const updateNotificationType = (
  notificationType: string,
  enabled: boolean
) => {
  return axiosInstance.put(`${BASE_URL}/types/${notificationType}`, {
    enabled,
  });
};

// 3. 방해금지 시간 설정
export const setDoNotDisturb = (
  enabled: boolean,
  startTime: string,
  endTime: string
) => {
  const payload = {
    enabled,
    startTime,
    endTime,
  };

  return axiosInstance.put("/user-notification/v1/do-not-disturb", payload);
};
