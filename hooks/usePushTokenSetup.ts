import { postAlarmToken } from "@/api/fcmAlarmApi";
import { useAuth } from "@/context/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

export function usePushTokenSetup() {
  const { userId } = useAuth();

  useEffect(() => {
    const registerPushToken = async () => {
      try {
        const alreadyRegistered = await AsyncStorage.getItem("fcm_registered");
        if (alreadyRegistered === "true") {
          console.log("이미 FCM 토큰 등록됨");
          return;
        }

        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          console.log("알림 권한 거부됨");
          return;
        }

        const { data: devicePushToken } =
          await Notifications.getDevicePushTokenAsync();
        console.log("[FCM Native Device Token]:", devicePushToken);

        if (!userId) {
          console.log("유저 정보 없음");
          return;
        }

        const res = await postAlarmToken(userId, devicePushToken);
        console.log("FCM 토큰 서버에 등록:", res);

        await AsyncStorage.setItem("fcm_registered", "true");
      } catch (error) {
        console.error("FCM 토큰 등록 실패:", error);
      }
    };
    // 알림 수신 리스너
    const receivedSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("알림 수신됨:", notification);
      }
    );

    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("알림 탭됨:", response);
        // 알림 클릭 시 이동 처리 추가 가능
      });

    if (userId) registerPushToken();

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      receivedSubscription.remove();
      responseSubscription.remove();
    };
  }, [userId]);
}
