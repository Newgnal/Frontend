import PlusIcon from "@/assets/images/ic_add.svg";
import SearchIcon from "@/assets/images/ic_search.svg";
import FireIcon from "@/assets/images/mingcute_fire-fill.svg";
import HotTopicList from "@/components/ui/community/HotTopicList";
import { Header } from "@/components/ui/Header";
import { HorizontalLine } from "@/components/ui/HorizontalLine";
import { typography } from "@/styles/typography";
// import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyPageScreen() {
  // const router = useRouter();
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header
          title="홈"
          leftSlot={<View />}
          rightSlot={
            <>
              <SearchIcon />
              <PlusIcon />
            </>
          }
        />

        <View style={styles.contents}>
          <View>
            <View style={{ flexDirection: "row", paddingBottom: 8 }}>
              <FireIcon />
              <Text style={typography.subtitle_s2_16_semi_bold}>인기 테마</Text>
            </View>
            <View style={styles.rankbox}>
              <View style={styles.rankdetail}>
                <Text>1위</Text>
                <Text
                  style={[styles.rankname, typography.caption_c2_12_regular]}
                >
                  반도체/AI
                </Text>
              </View>
              <View style={styles.rankdetail}>
                <Text>2위</Text>
                <Text
                  style={[styles.rankname, typography.caption_c2_12_regular]}
                >
                  IT/인터넷
                </Text>
              </View>
              <View style={styles.rankdetail}>
                <Text>3위</Text>
                <Text
                  style={[styles.rankname, typography.caption_c2_12_regular]}
                >
                  모빌리티
                </Text>
              </View>
            </View>
            <View style={{ paddingTop: 20 }}>
              <HotTopicList />
              <Text
                style={[
                  typography.subtitle_s2_16_semi_bold,
                  { paddingBottom: 16 },
                ]}
              >
                지금 뜨는 이야기
              </Text>
              <ScrollView horizontal={true}>
                <View>
                  <Text>11111111111</Text>
                </View>
                <View>
                  <Text>2</Text>
                </View>
                <View>
                  <Text>3</Text>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
        <HorizontalLine color={"#F4F5F7"} height={8} />
        <View style={styles.contents}>
          <Text
            style={[typography.subtitle_s2_16_semi_bold, { paddingBottom: 16 }]}
          >
            방금 올라온 글
          </Text>
          <View>
            <Text>게시글 1</Text>
          </View>
          <View>
            <Text>게시글 2</Text>
          </View>
          <View>
            <Text>게시글 3</Text>
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

  contents: {
    justifyContent: "center",

    padding: 20,
  },

  rankbox: {
    backgroundColor: "#F7F7F8",
    borderRadius: 12,
    flexDirection: "row",
    gap: 16,
    padding: 12,
  },
  rankdetail: {
    flexDirection: "row",
    gap: 8,
  },
  rankname: {
    backgroundColor: "#484F56",
    borderRadius: 10,
    paddingHorizontal: 8,
    color: "#FFF",
    textAlign: "center",
  },
});
