import { useAuth } from "@/context/authContext";
import axiosInstance from "@/lib/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

const REST_API_KEY = process.env.EXPO_PUBLIC_REST_API_KEY;
const REDIRECT_URI = process.env.EXPO_PUBLIC_REDIRECT_URI;

export default function LoginScreen() {
  const router = useRouter();
  const { checkAuth } = useAuth();
  const [isHandled, setIsHandled] = useState(false);

  const handleNavigationChange = async (navState: any) => {
    const { url } = navState;
    console.log("current URL:", url);
    if (isHandled) return;

    if (url.includes("code=")) {
      const code = extractQueryParam(url, "code");
      if (code) {
        setIsHandled(true);
        try {
          // const response = await fetch(
          //   `https://newgnal.site/auth/v1/login/kakao?code=${code}`,
          //   {
          //     method: "POST",
          //     headers: { "Content-Type": "application/json" },
          //   }
          // );
          // const data = await response.json();
          const { data } = await axiosInstance.post(
            `/auth/v1/login/kakao?code=${code}`
          );
          console.log("백엔드 응답:", data);
          const jwtToken = data?.data?.jwtAccessToken;
          if (jwtToken) {
            const pureToken = jwtToken.replace(/^Bearer\s/, "");
            console.log("Bearer 제거된 토큰:", pureToken);
            await AsyncStorage.setItem("access_token", pureToken);
            await checkAuth();
            router.replace("/(tabs)/home");
          } else {
            Alert.alert("로그인 실패", "토큰이 없습니다.");
            console.log("로그인실패.토큰:", jwtToken);
          }
        } catch (error) {
          console.error("로그인 실패", error);
          Alert.alert("로그인 실패", "백엔드 요청 실패");
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        style={{ flex: 1 }}
        originWhitelist={["*"]}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        javaScriptEnabled
        onNavigationStateChange={handleNavigationChange}
      />
    </View>
  );
}

function extractQueryParam(url: string, key: string): string | null {
  const match = url.match(new RegExp(`[?&]${key}=([^&]+)`));
  return match?.[1] || null;
}
export const options = {
  headerShown: false,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
