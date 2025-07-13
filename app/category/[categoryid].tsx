import IcArrowDown from "@/assets/images/ic_arrow_down.svg";
import IcComnt from "@/assets/images/ic_comnt.svg";
import IcOrderChange from "@/assets/images/ic_orderchange.svg";
import IcPoll from "@/assets/images/ic_poll.svg";
import BackIcon from "@/assets/images/icon_next_lg.svg";
import CategoryFilterModal from "@/components/ui/modal/categoryFilterModal";

import { Header as CategoryHeader } from "@/components/ui/Header";
import { HorizontalLine } from "@/components/ui/HorizontalLine";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  FlatList,
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

const dummyNews = [
  {
    id: "1",
    title: "삼성, 2028년부터 반도체 유리기판 쓴다",
    date: "2025.05.28",
    category: "semiconductor",
    sentiment: "-0.8",
    views: 21000,
  },
  {
    id: "2",
    title: "삼성전자, 차세대 AI 반도체 공개",
    date: "2025.05.27",
    category: "ai",
    sentiment: "-0.9",
    views: 50000,
  },
  {
    id: "3",
    title: "NVIDIA, GPT-5에 최적화된 GPU 출시",
    date: "2025.05.26",
    category: "ai",
    sentiment: "-1.2",
    views: 35000,
  },
  {
    id: "4",
    title: "AI 반도체 시장, 2030년 5배 성장 전망",
    date: "2025.05.25",
    category: "ai",
    sentiment: "-1.0",
    views: 12000,
  },
  {
    id: "5",
    title: "삼성, 유리기판 반도체 대량 생산 기술 확보",
    date: "2025.05.24",
    category: "semiconductor",
    sentiment: "-0.7",
    views: 27000,
  },
  {
    id: "6",
    title: "삼성, 유리기판 반도체 대량 생산 기술 확보",
    date: "2025.05.24",
    category: "semiconductor",
    sentiment: "-0.7",
    views: 27000,
  },
  {
    id: "7",
    title: "삼성, 유리기판 반도체 대량 생산 기술 확보",
    date: "2025.05.24",
    category: "semiconductor",
    sentiment: "-0.7",
    views: 27000,
  },
  {
    id: "8",
    title: "삼성, 유리기판 반도체 대량 생산 기술 확보",
    date: "2025.05.24",
    category: "semiconductor",
    sentiment: "-0.7",
    views: 27000,
  },
  {
    id: "9",
    title: "삼성, 유리기판 반도체 대량 생산 기술 확보",
    date: "2025.05.24",
    category: "semiconductor",
    sentiment: "-0.7",
    views: 27000,
  },
  {
    id: "10",
    title: "삼성, 유리기판 반도체 대량 생산 기술 확보",
    date: "2025.05.24",
    category: "it",
    sentiment: "-0.7",
    views: 27000,
  },
  {
    id: "11",
    title: "삼성, 유리기판 반도체 대량 생산 기술 확보",
    date: "2025.05.24",
    category: "it",
    sentiment: "-0.7",
    views: 27000,
  },
  {
    id: "12",
    title: "삼성, 유리기판 반도체 대량 생산 기술 확보",
    date: "2025.05.24",
    category: "it",
    sentiment: "-0.7",
    views: 27000,
  },
];

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

export default function CategoryScreen() {
  const [order, setOrder] = useState<OrderType>("latest");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { categoryid } = useLocalSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(
    typeof categoryid === "string" ? categoryid : "semiconductor"
  );

  const displayName =
    categoryDisplayNames[selectedCategory] ?? selectedCategory;

  const filteredNews = dummyNews.filter(
    (item) => item.category === selectedCategory
  );

  const sortedNews = [...filteredNews].sort((a, b) => {
    return order === "views"
      ? b.views - a.views
      : new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const getCurrentTimeString = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isChipVisible, setIsChipVisible] = useState(false);
  const renderItem = ({ item }: { item: (typeof dummyNews)[0] }) => {
    const isSelected = selectedId === item.id;

    return (
      <Pressable
        onPress={() =>
          setSelectedId((prev) => (prev === item.id ? null : item.id))
        }
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
          <Text style={styles.sentiment}>{item.sentiment}</Text>
        </View>

        <View style={styles.contentRow}>
          <View style={styles.textContent}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>매일 경제 | {item.date}</Text>

            <View style={styles.metaRow}>
              <Text style={styles.meta}>
                조회 {Math.floor(item.views / 10000)}만
              </Text>

              <View style={styles.iconWithText}>
                <IcComnt width={24} height={24} />
                <Text style={styles.meta}>234</Text>
              </View>

              <View style={styles.iconWithText}>
                <IcPoll width={24} height={24} />
                <Text style={styles.meta}>402</Text>
              </View>
            </View>
          </View>

          <View style={styles.imagePlaceholder} />
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
          <TouchableOpacity onPress={() => router.back()}>
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
        data={sortedNews}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
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
  centerContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
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
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 4,
    marginBottom: 13,
    marginTop: 16,
    gap: 0,
  },
  sortText: {
    fontSize: 12,
    color: "#484F56",
    marginRight: 2,
  },
  card: {
    minHeight: 120,
    minWidth: "100%",
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
    flexWrap: "wrap",
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
  imagePlaceholder: {
    width: 76,
    height: 76,
    backgroundColor: "#dcdcdc",
    borderRadius: 4,
  },
});
