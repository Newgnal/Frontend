import KakaoIcon from "@/assets/images/ic_lg_kakao.svg";
import LogoNameImg from "@/assets/images/name_logo.png";
import { typography } from "@/styles/typography";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Login() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#5B656F", "#4A525C", "#353B44", "#1F2329", "#0E0F15"]}
      locations={[0.0, 0.05, 0.4, 0.75, 1.0]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView>
        <View style={styles.subContainer}>
          <View style={styles.main}>
            <Text style={styles.title}>
              쏟아지는 뉴스 속, 나만의 투자 시그널
            </Text>
            <Image source={LogoNameImg} style={styles.logoImg} />
          </View>
          <View style={styles.kakao}>
            <TouchableOpacity
              onPress={() => router.push("/login/kakao")}
              style={styles.button}
            >
              <KakaoIcon />
              <Text style={styles.buttonText}>카카오로 시작하기</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.text}>카카오 계정 직접 입력하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  subContainer: { flex: 1, justifyContent: "space-between" },
  title: { fontSize: 18, fontWeight: "500", color: "#FFF" },
  main: { gap: 14, alignItems: "center", paddingTop: 227 },
  kakao: {
    gap: 20,
    paddingBottom: 47,
  },
  button: {
    backgroundColor: "#FEE500",
    paddingVertical: 14,
    paddingHorizontal: 109,
    borderRadius: 10,
    flexDirection: "row",
    marginHorizontal: 20,
  },
  buttonText: {
    color: "#000",
    ...typography.subtitle_s1_18_semi_bold,
    marginLeft: 10,
  },
  text: {
    textDecorationLine: "underline",
    ...typography.body_b1_16_medium,
    color: "#FFF",
    textAlign: "center",
    lineHeight: 24,
  },
  logoImg: {
    width: 240,
    height: 59,
  },
});

export const options = {
  headerShown: false,
};
