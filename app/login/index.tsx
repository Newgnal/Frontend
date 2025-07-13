import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Login() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인이 필요합니다</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/login/kakao")}
      >
        <Text style={styles.buttonText}>카카오로 로그인하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 18, marginBottom: 20 },
  button: { backgroundColor: "#FEE500", padding: 12, borderRadius: 8 },
  buttonText: { color: "#000", fontWeight: "bold" },
});

export const options = {
  headerShown: false,
};
