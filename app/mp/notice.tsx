import VerDotIcon from "@/assets/images/ic_cmnt_etc_ver.svg";
import NextLgIcon from "@/assets/images/icon_next_lg.svg";
import { Header } from "@/components/ui/Header";
import { Notice } from "@/components/ui/mypage/Notice";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NoticeScreen() {
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
      </SafeAreaView>
      <Notice title="개인정보 처리 방침 개정 안내" date="2025.05.28" />
      <Notice title="개인정보 처리 방침 개정 안내" date="2025.05.28" />
      <Notice title="개인정보 처리 방침 개정 안내" date="2025.05.28" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
});
