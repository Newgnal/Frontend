import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";

const axiosInstance = axios.create({
  baseURL: "https://newgnal.site",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터: AccessToken 자동 추가
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: AccessToken 갱신 및 401 처리
axiosInstance.interceptors.response.use(
  async (response) => {
    const newAccessToken = response.headers?.authorization;
    if (newAccessToken) {
      const pureToken = newAccessToken.replace(/^Bearer\s/, "");
      await AsyncStorage.setItem("access_token", pureToken);
    }
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // 로그아웃 처리
      await AsyncStorage.multiRemove(["access_token", "refresh_token"]);
      router.replace("/login");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
