import IcComnt from "@/assets/images/ic_comnt.svg";
import IcOrderChange from "@/assets/images/ic_orderchange.svg";
import IcPoll from "@/assets/images/ic_poll.svg";
import { HorizontalLine } from "@/components/ui/HorizontalLine";
import { useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
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

type OrderType = "latest" | "views";

const dummyNews = [
  {
    id: "1",
    title: "삼성, 2028년부터 반도체 유리기판 쓴다",
    date: "2025.05.28",
    category: "반도체/AI",
    sentiment: "-0.8",
    views: 21000,
  },
  {
    id: "2",
    title: "삼성전자, 차세대 AI 반도체 공개",
    date: "2025.05.27",
    category: "반도체/AI",
    sentiment: "-0.9",
    views: 50000,
  },
  {
    id: "3",
    title: "NVIDIA, GPT-5에 최적화된 GPU 출시",
    date: "2025.05.26",
    category: "반도체/AI",
    sentiment: "-1.2",
    views: 35000,
  },
  {
    id: "4",
    title: "AI 반도체 시장, 2030년 5배 성장 전망",
    date: "2025.05.25",
    category: "반도체/AI",
    sentiment: "-1.0",
    views: 12000,
  },
  {
    id: "5",
    title: "삼성, 유리기판 반도체 대량 생산 기술 확보",
    date: "2025.05.24",
    category: "반도체/AI",
    sentiment: "-0.7",
    views: 27000,
  },
  {
    id: "6",
    title: "삼성, 유리기판 반도체 대량 생산 기술 확보",
    date: "2025.05.24",
    category: "반도체/AI",
    sentiment: "-0.7",
    views: 27000,
  },
];

export default function SemiconductorScreen() {
  const [order, setOrder] = useState<OrderType>("latest");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.centerContainer}>
          <Text style={styles.topTitle}>반도체/AI</Text>
          <Text style={styles.timeText}>18:49 기준</Text>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() =>
            setOrder((prev) => (prev === "latest" ? "views" : "latest"))
          }
        >
          <Text style={styles.sortText}>
            {order === "latest" ? "최신순" : "조회순"}
          </Text>
          <IcOrderChange width={24} height={24} />
        </TouchableOpacity>
      ),
      headerTitleAlign: "center",
      headerStyle: {
        height: 80,
      },
    });
  }, [navigation, order]);

  const sortedNews = [...dummyNews].sort((a, b) => {
    return order === "views"
      ? b.views - a.views
      : new Date(b.date).getTime() - new Date(a.date).getTime();
  });

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
          <Text style={styles.category}>{item.category}</Text>
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
      edges={["left", "right", "bottom"]}
    >
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
