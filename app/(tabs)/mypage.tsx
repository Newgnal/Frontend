import ProfileIcon from "@/assets/images/icn_profile.svg";
import NextLgIcon from "@/assets/images/icon_next_lg.svg";
import SettingIcon from "@/assets/images/setting.svg";
import { HorizontalLine } from "@/components/ui/HorizontalLine";
import { MyPageRow } from "@/components/ui/mypage/MyPageRow";
import { typography } from "@/styles/typography";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyPageScreen() {
  const router = useRouter();
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <NextLgIcon />
          </Pressable>
          <Text style={[typography.title_t2_18_semi_bold]}>마이페이지</Text>
          <SettingIcon />
        </View>

        <HorizontalLine width="100%" style={{ marginBottom: 32 }} />

        <View style={styles.contents}>
          <ProfileIcon />
          <Text
            style={[typography.title_t2_18_semi_bold, { paddingVertical: 16 }]}
          >
            알림잇슈지킴이
          </Text>
          <Pressable
            onPress={() => router.push("/mypage/edit")}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#E0E1E2" : "#F4F5F7", // 눌렀을 때 더 진한 색
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
          <MyPageRow label="알림 설정" />
          <MyPageRow label="공지사항" />
          <MyPageRow label="자주 묻는 질문" />
          <MyPageRow label="1:1문의" />
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 15,
  },
  contents: {
    justifyContent: "center",
    alignItems: "center",
    // alignSelf: "center",
  },
});
