import ProfileIcon from "@/assets/images/icn_profile.svg";
import NextLgIcon from "@/assets/images/icon_next_lg.svg";
import SettingIcon from "@/assets/images/setting.svg";
import { Header } from "@/components/ui/Header";
import { MyPageRow } from "@/components/ui/mypage/MyPageRow";
import { useAuth } from "@/context/authContext";
import { typography } from "@/styles/typography";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyPageScreen() {
  const router = useRouter();
  const { nickName } = useAuth();
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header
          title="마이페이지"
          leftSlot={
            <Pressable onPress={() => router.back()}>
              <NextLgIcon />
            </Pressable>
          }
          rightSlot={
            <>
              <SettingIcon />
            </>
          }
        />

        <View style={styles.contents}>
          <ProfileIcon />
          <Text
            style={[typography.title_t2_18_semi_bold, { paddingVertical: 16 }]}
          >
            {nickName}
          </Text>
          <Pressable
            onPress={() => router.push("/mp/edit")}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#E0E1E2" : "#F4F5F7",
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 100,
              },
            ]}
          >
            <Text style={[typography.label_l2_13_medium, { color: "#484F56" }]}>
              프로필 수정
            </Text>
          </Pressable>
          <MyPageRow
            label="알림 설정"
            onPress={() => router.push("/mp/alarm")}
          />
          <MyPageRow
            label="공지사항"
            onPress={() => router.push("/mp/notice")}
          />
          <MyPageRow
            label="자주 묻는 질문"
            onPress={() => router.push("/mp/question")}
          />
          <MyPageRow
            label="1:1문의"
            onPress={() => router.push("/mp/contact")}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  contents: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    // alignSelf: "center",
  },
});
