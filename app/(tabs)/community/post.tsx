import EtcVerIcon from "@/assets/images/ic_cmnt_etc_ver.svg";
import ShareIcon from "@/assets/images/ic_header.svg";
import NextLgIcon from "@/assets/images/icon_next_lg.svg";
import TopicDetail from "@/components/ui/community/TopicDetail";
import { Header } from "@/components/ui/Header";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function PostScreen() {
  const router = useRouter();
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header
          title=""
          leftSlot={<NextLgIcon onPress={() => router.back()} />}
          rightSlot={
            <>
              <ShareIcon />
              <EtcVerIcon />
            </>
          }
        />
        <View style={styles.content}>
          <TopicDetail
            isList={false}
            item={{
              username: "홍길동",
              time: "2시간 전",
              category: "스타트업",
              title: "요즘 스타트업 근무 환경 어때요?",
              content:
                "유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다. 유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다. 유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다. 유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다. 유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다. 유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다. 유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다. 유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다.",

              likes: 8,
              views: 25,
              comments: 3,
            }}
            hasNews={true}
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
  content: {
    padding: 20,
  },
});
