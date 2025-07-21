import { getThemeNews } from "@/api/getThemeNews";
import IcArrowDown from "@/assets/images/ic_arrow_down.svg";
import IcComnt from "@/assets/images/ic_comnt.svg";
import IcOrderChange from "@/assets/images/ic_orderchange.svg";
import IcPoll from "@/assets/images/ic_poll.svg";
import BackIcon from "@/assets/images/icon_next_lg.svg";
import { Header as CategoryHeader } from "@/components/ui/Header";
import { HorizontalLine } from "@/components/ui/HorizontalLine";
import CategoryFilterModal from "@/components/ui/modal/categoryFilterModal";
import { NewsItem } from "@/types/news";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { typography } from "../../styles/typography";

export const options = {
  headerShown: false,
};

type OrderType = "latest" | "views";

const categoryDisplayNames: Record<string, string> = {
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

export default function CategoryScreen() {
  const [order, setOrder] = useState<OrderType>("latest");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { categoryid } = useLocalSearchParams();

  const isValidCategory =
    typeof categoryid === "string" && categoryCodeMap[categoryid];

  const [selectedCategory, setSelectedCategory] = useState(
    isValidCategory ? categoryid : "semiconductor"
  );

  const [isChipVisible, setIsChipVisible] = useState(false);
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const displayName =
    categoryDisplayNames[selectedCategory] ?? selectedCategory;

  const getCurrentTimeString = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const fetchMoreNews = async (pageNum: number) => {
    const code = categoryCodeMap[selectedCategory];
    if (!code) {
      console.warn("잘못된 카테고리 코드:", selectedCategory);
      return;
    }
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const res = await getThemeNews(code, order, pageNum);
      const newItems = res?.content || [];

      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setNewsList((prev) => [...prev, ...newItems]);
      }
    } catch (err) {
      console.error("카테고리 뉴스 로딩 실패", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setNewsList([]);
    setPage(0);
    setHasMore(true);
    fetchMoreNews(0);
  }, [selectedCategory, order]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMoreNews(nextPage);
    }
  };

  const renderItem = ({ item }: { item: NewsItem }) => {
    const isSelected = selectedId === item.id;
    return (
      <Pressable
        onPress={() => {
          router.push({
            pathname: "/news/[id]",
            params: { id: item.id },
          });
        }}
        style={[
          styles.card,
          {
            backgroundColor: isSelected
              ? "rgba(113, 125, 137, 0.10)"
              : "#FFFFFF",
          },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.category}>{displayName}</Text>
          <Text style={styles.sentiment}>
            {Number(item.sentiment).toFixed(1)}
          </Text>
        </View>

        <View style={styles.contentRow}>
          <View style={styles.textContent}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>
              {item.source || "매일 경제"} | {item.date.split("T")[0]}
            </Text>

            <View style={styles.metaRow}>
              <Text style={styles.meta}>
                조회 {Math.floor(item.view / 10000)}만
              </Text>

              <View style={styles.iconWithText}>
                <IcComnt width={24} height={24} />
                <Text style={styles.meta}>{item.commentNum ?? 0}</Text>
              </View>

              <View style={styles.iconWithText}>
                <IcPoll width={24} height={24} />
                <Text style={styles.meta}>{item.voteNum ?? 0}</Text>
              </View>
            </View>
          </View>

          {item.imageUrl ? (
            <Image source={{ uri: item.imageUrl }} style={styles.newsImage} />
          ) : (
            <View style={styles.imagePlaceholder} />
          )}
        </View>

        <HorizontalLine />
      </Pressable>
    );
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: "#fff", flex: 1 }}
      edges={["top", "left", "right", "bottom"]}
    >
      <CategoryHeader
        title={
          <View style={{ alignItems: "center" }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Text style={styles.topTitle}>{displayName}</Text>
              <TouchableOpacity onPress={() => setIsChipVisible(true)}>
                <IcArrowDown width={24} height={24} />
              </TouchableOpacity>
            </View>
            <Text style={styles.timeText}>{getCurrentTimeString()} 기준</Text>
          </View>
        }
        leftSlot={
          <TouchableOpacity
            onPress={() => {
              router.push("/home");
            }}
          >
            <BackIcon width={24} height={24} />
          </TouchableOpacity>
        }
        rightSlot={
          <TouchableOpacity
            onPress={() =>
              setOrder((prev) => (prev === "latest" ? "views" : "latest"))
            }
            style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
          >
            <Text style={{ fontSize: 12, color: "#484F56" }}>
              {order === "latest" ? "최신순" : "조회순"}
            </Text>
            <IcOrderChange width={24} height={24} />
          </TouchableOpacity>
        }
      />

      <FlatList
        data={newsList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{
          paddingTop: 0,
          paddingHorizontal: 20,
          paddingBottom: 80,
        }}
      />

      {isChipVisible && (
        <CategoryFilterModal
          isVisible={isChipVisible}
          onClose={() => setIsChipVisible(false)}
          selectedKey={selectedCategory}
          onSelect={(key) => {
            setIsChipVisible(false);
            setSelectedCategory(key);
            router.push(`/category/${key}`);
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
  },
  timeText: {
    fontSize: 11,
    color: "#888",
    marginTop: 2,
  },
  card: {
    minHeight: 120,
    justifyContent: "space-between",
    paddingTop: 16,
    paddingBottom: 0,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
    alignSelf: "stretch",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  category: {
    fontSize: 12,
    color: "#484F56",
    backgroundColor: "#F4F5F7",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  sentiment: {
    fontSize: 12,
    color: "#214DEF",
    backgroundColor: "#E7EDFF",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontWeight: "400",
  },
  contentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  textContent: {
    flex: 1,
    flexDirection: "column",
    gap: 4,
  },
  title: {
    ...typography.body_b1_16_medium,
  },
  subtitle: {
    ...typography.caption_c2_12_regular,
    color: "#888",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
  },
  iconWithText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  meta: {
    fontSize: 12,
    color: "#777",
  },
  newsImage: {
    width: 76,
    height: 76,
    borderRadius: 4,
    backgroundColor: "#dcdcdc",
  },
  imagePlaceholder: {
    width: 76,
    height: 76,
    backgroundColor: "#dcdcdc",
    borderRadius: 4,
  },
});
