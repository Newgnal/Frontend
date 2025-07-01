import VerDotIcon from "@/assets/images/ic_cmnt_etc_ver.svg";
import NextLgIcon from "@/assets/images/icon_next_lg.svg";
import { Header } from "@/components/ui/Header";
import { typography } from "@/styles/typography";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NoticeDetailScreen() {
  const router = useRouter();
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header
          title="공지사항"
          leftSlot={
            <Pressable onPress={() => router.back()}>
              <NextLgIcon />
            </Pressable>
          }
          rightSlot={<VerDotIcon />}
        />
        <View style={styles.content}>
          <View>
            <Text style={typography.title_t2_18_semi_bold}>
              개인정보 처리 방침 개정 안내
            </Text>
          </View>
          <View>
            <Text
              style={[
                typography.caption_c2_12_regular,
                { color: "#484F56", marginTop: 8 },
              ]}
            >
              2025.05.28
            </Text>
          </View>
          <View>
            <Text
              style={[
                typography.body_b3_14_regular,
                { color: "#717D89", marginTop: 16 },
              ]}
            >
              닉네임 변경은 [더보기 → 프로필] 에서 할 수 있습니다. 문의 설명문의
              설명문의 설명문의 설명문의 설명문의 설명문의 설명문의 설명문의
              설명문의 설명문의 설명문의 설명문의 설명문의 설명문의 설명문의
              설명문의 설명문의 설명문의 설명문의 설명닉네임 변경은 [더보기 →
              프로필] 에서 할 수 있습니다. 문의 설명문의 설명문의 설명문의
              설명문의 설명문의 설명문의 설명문의 설명문의 설명문의 설명문의
              설명문의 설명문의 설명문의 설명문의 설명문의 설명문의 설명문의
              설명문의 설명문의 설명닉네임 변경은 [더보기 → 프로필] 에서 할 수
              있습니다. 문의 설명문의 설명문의 설명문의 설명문의 설명문의
              설명문의 설명문의 설명문의 설명문의 설명문의 설명문의 설명문의
              설명문의 설명문의 설명문의 설명문의 설명문의 설명문의 설명문의
              설명닉네임 변경은 [더보기 → 프로필] 에서 할 수 있습니다. 문의
              설명문의 설명문의 설명문의 설명문의 설명문의 설명문의 설명문의
              설명문의 설명문의 설명문의 설명문의 설명문의 설명문의 설명문의
              설명문의 설명문의 설명문의 설명문의 설명문의 설명
            </Text>
          </View>
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
  content: {
    padding: 20,
  },
});
