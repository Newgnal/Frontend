import CategoryModal from "@/app/CategoryModal";
import PlusIcon from "@/assets/images/ic_add.svg";
import ArrowIcon from "@/assets/images/ic_arrow_down.svg";
import OrderChangeIcon from "@/assets/images/ic_orderchange.svg";
import NextLgIcon from "@/assets/images/icon_next_lg.svg";
import TopicList from "@/components/ui/community/TopicList";

import { typography } from "@/styles/typography";

import { getPostByThema, getPostList } from "@/api/postApi";
import { HorizontalLine } from "@/components/ui/HorizontalLine";
import CategoryFilterModal from "@/components/ui/modal/categoryFilterModal";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Post = {
  postId: number;
  postTitle: string;
  postContent: string;
  createdAt: string;
  updatedAt?: string;
  likeCount: number;
  viewCount: number;
  commentCount: number;
  nickname: string;
  thema: string;
  articleUrl: string;
  hasVote: string;
  imageUrl: string;
};
const categoryDisplayNames: Record<string, string> = {
  all: "전체",
  semiconductor: "반도체/AI",
  it: "IT/인터넷",
  finance: "금융/보험",
  defense: "방산/항공우주",
  green: "2차전지/친환경E",
  mobility: "모빌리티",
  realestate: "부동산/리츠",
  bond: "채권/금리",
  health: "헬스케어/바이오",
  forex: "환율/외환",
  commodity: "원자재/귀금속",
  etc: "기타",
};
const categoryCodeMap: Record<string, string> = {
  semiconductor: "SEMICONDUCTOR_AI",
  it: "IT_INTERNET",
  finance: "FINANCE_INSURANCE",
  defense: "DEFENSE_AEROSPACE",
  green: "SECONDARY_BATTERY_ENVIRONMENT",
  mobility: "MOBILITY",
  realestate: "REAL_ESTATE_REIT",
  bond: "BOND_INTEREST",
  health: "HEALTHCARE_BIO",
  forex: "EXCHANGE_RATE",
  commodity: "RAW_MATERIAL_METALS",
  etc: "ETC",
};

export default function ComDetailScreen() {
  const router = useRouter();
  const [order, setOrder] = useState<"LATEST" | "POPULAR">("LATEST");
  const [isVisible, setIsVisible] = useState(false);
  const [isChipVisible, setIsChipVisible] = useState(false);
  const { categoryid } = useLocalSearchParams();
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const isValidCategory =
    typeof categoryid === "string" && categoryCodeMap[categoryid];

  const [selectedCategory, setSelectedCategory] = useState(
    isValidCategory ? categoryid : "all"
  );

  const [postList, setPostList] = useState<Post[]>([]);

  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      try {
        let result;
        if (selectedCategory === "all") {
          // 전체 게시글 조회
          result = await getPostList({ sortType: order, page, size: 10 });
        } else {
          // 카테고리별 게시글 조회
          const themaCode = categoryCodeMap[selectedCategory];
          result = await getPostByThema({
            thema: themaCode,
            page,
            size: 10,
            sortType: order,
          });
          //   console.log("응답 결과:", result);
          result = result.data.content ?? [];
          // console.log(result);
        }
        setPostList((prev) => {
          const existingIds = new Set(prev.map((p) => p.postId));
          const newPosts = result.filter(
            (p: Post) => !existingIds.has(p.postId)
          );
          return [...prev, ...newPosts];
        });
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
        setPostList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [order, selectedCategory, page]);

  useEffect(() => {
    setPage(0);
    setPostList([]);
    setHasMore(true);
  }, [selectedCategory, order]);

  const handleCategorySelect = (category: string) => {
    setIsVisible(false);
    router.push({
      pathname: "/(tabs)/community/writeForm",
      params: { category },
    });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.sideContainer}>
            <Pressable onPress={() => router.back()}>
              <NextLgIcon />
            </Pressable>
          </View>

          <Pressable
            style={styles.titleContainer}
            onPress={() => setIsChipVisible(true)}
          >
            <Text style={[typography.title_t2_18_semi_bold]}>
              {categoryDisplayNames[selectedCategory] ?? "전체"}
            </Text>
            <ArrowIcon style={{ marginTop: 5 }} />
          </Pressable>

          <View
            style={[
              styles.sideContainer,
              { justifyContent: "flex-end", gap: 12 },
            ]}
          >
            <Pressable onPress={() => setIsVisible(true)}>
              <PlusIcon />
            </Pressable>
          </View>
        </View>
        <HorizontalLine />

        <TouchableOpacity
          onPress={() =>
            setOrder((prev) => (prev === "LATEST" ? "POPULAR" : "LATEST"))
          }
          style={{
            paddingBottom: 4,
            paddingHorizontal: 20,
            paddingTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Text
            style={[typography.caption_c2_12_regular, { color: "#484F56" }]}
          >
            {order === "LATEST" ? "최신순" : "조회순"}
          </Text>
          <OrderChangeIcon />
        </TouchableOpacity>

        <ScrollView
          onScroll={({ nativeEvent }) => {
            const paddingToBottom = 100;
            const isBottomReached =
              nativeEvent.layoutMeasurement.height +
                nativeEvent.contentOffset.y >=
              nativeEvent.contentSize.height - paddingToBottom;

            if (isBottomReached && hasMore && !loading) {
              setPage((prev) => prev + 1);
            }
          }}
          scrollEventThrottle={400}
          contentContainerStyle={{ justifyContent: "center" }}
        >
          <View style={{ paddingHorizontal: 20 }}>
            <TopicList data={postList} order={order} hasNews={true} />
          </View>
        </ScrollView>
      </SafeAreaView>
      <CategoryModal
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        onSelect={handleCategorySelect}
      />
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
