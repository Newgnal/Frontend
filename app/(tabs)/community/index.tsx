import { getCommunityHomeData } from "@/api/communityHomeApi";
import PlusIcon from "@/assets/images/ic_add.svg";
import ArrowIcon from "@/assets/images/ic_arrow_down.svg";
import NextSmIcon from "@/assets/images/ic_next_sm_600.svg";
import FireIcon from "@/assets/images/mingcute_fire-fill.svg";
import HotTopicList from "@/components/ui/community/HotTopicList";
import TopicList from "@/components/ui/community/TopicList";
import { HorizontalLine } from "@/components/ui/HorizontalLine";
import CategoryFilterModal from "@/components/ui/modal/categoryFilterModal";
import { typography } from "@/styles/typography";
import { convertThemaToKor } from "@/utils/convertThemaToKor";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CommunityScreen() {
  const router = useRouter();
  const [topThemes, setTopThemes] = useState<string[]>([]);
  const [hotTopics, setHotTopics] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [isChipVisible, setIsChipVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCommunityHomeData();
        const themes = data.topThemes.map((t: any) => t.thema);
        setTopThemes(themes);
        setHotTopics(data.hotPosts);

        setRecentPosts(data.recentPosts);
      } catch (error) {
        console.error("홈 데이터 불러오기 실패", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.sideContainer}>
            <Pressable onPress={() => router.back()}>
              <View style={{ width: 30 }} />
            </Pressable>
          </View>

          <Pressable
            style={styles.titleContainer}
            onPress={() => setIsChipVisible(true)}
          >
            <Text style={[typography.title_t2_18_semi_bold]}>홈</Text>
            <ArrowIcon style={{ marginTop: 5 }} />
          </Pressable>

          <View
            style={[
              styles.sideContainer,
              { justifyContent: "flex-end", gap: 12 },
            ]}
          >
            <Pressable
              onPress={() => {
                setIsChipVisible(true);
              }}
            >
              <PlusIcon />
            </Pressable>
          </View>
        </View>

        <ScrollView contentContainerStyle={{ justifyContent: "center" }}>
          <View style={{ padding: 20 }}>
            <View style={{ flexDirection: "row", paddingBottom: 8 }}>
              <FireIcon />
              <Text style={typography.subtitle_s2_16_semi_bold}>인기 테마</Text>
            </View>
            <View style={styles.rankbox}>
              <View style={styles.rankdetail}>
                {topThemes.map((theme, index) => (
                  <View key={theme} style={styles.rankdetail}>
                    <Text>{index + 1}위</Text>
                    <Text
                      style={[
                        styles.rankname,
                        typography.caption_c2_12_regular,
                      ]}
                    >
                      {convertThemaToKor(theme)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={{ paddingTop: 20 }}>
              <Text
                style={[
                  typography.subtitle_s2_16_semi_bold,
                  { paddingBottom: 16 },
                ]}
              >
                지금 뜨는 이야기
              </Text>
            </View>
          </View>
          <View style={{ paddingLeft: 20, paddingBottom: 25 }}>
            <HotTopicList data={hotTopics} />
          </View>
          <HorizontalLine color={"#F4F5F7"} height={8} />
          <View style={{ paddingTop: 20, paddingHorizontal: 20 }}>
            <View
              style={{
                marginBottom: 16,

                paddingVertical: 4,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={[typography.subtitle_s2_16_semi_bold]}>
                방금 올라온 글
              </Text>
              <Pressable
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => {
                  router.push({
                    pathname: "/community/detail/[categoryid]",
                    params: { categoryid: "all" },
                  });
                }}
              >
                <Text
                  style={[
                    typography.caption_c2_12_regular,
                    { color: "#5E6974", alignSelf: "center" },
                  ]}
                >
                  더 보기
                </Text>
                <View style={{ paddingTop: 2 }}>
                  <NextSmIcon />
                </View>
              </Pressable>
            </View>
            <TopicList data={recentPosts} order="LATEST" hasNews={false} />
          </View>
          <HorizontalLine
            color={"#F4F5F7"}
            height={8}
            style={{ marginTop: 5 }}
          />
          <View style={styles.more}>
            <Text
              style={[
                typography.caption_c2_12_regular,
                { color: "#717D89", paddingBottom: 16 },
              ]}
            >
              더 많은 테마 이야기가 궁금하신가요?
            </Text>
            <Pressable
              style={{ backgroundColor: "#2E3439", borderRadius: 12 }}
              onPress={() => {
                setIsChipVisible(true);
              }}
            >
              <Text
                style={[
                  typography.subtitle_s3_15_semi_bold,
                  { padding: 16, color: "#F4F5F7" },
                ]}
              >
                궁금한 테마 보러가기
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
      {isChipVisible && (
        <CategoryFilterModal
          isVisible={isChipVisible}
          onClose={() => setIsChipVisible(false)}
          selectedKey={selectedCategory}
          onSelect={(key) => {
            setIsChipVisible(false);
            setSelectedCategory(key);
            if (key === "all") {
              router.push(`/(tabs)/community/detail/all` as any);
            } else {
              router.push(`/(tabs)/community/detail/${key}` as any);
            }
          }}
          isPost={true}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
  more: {
    paddingHorizontal: 36,
    paddingVertical: 24,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: "100%",
  },
  sideContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  titleContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: -1,
    flexDirection: "row",
    justifyContent: "center",
  },
});
