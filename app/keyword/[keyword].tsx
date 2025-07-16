import { getKeywordNews, getKeywords } from "@/api/useKeywordApi";
import AlarmIcon from "@/assets/images/ic_alarm.svg";
import IcArrowDown from "@/assets/images/ic_arrow_down.svg";
import Iccheck from "@/assets/images/ic_check_default.svg";
import IcSelected from "@/assets/images/ic_check_selected.svg";
import IcComnt from "@/assets/images/ic_comnt.svg";
import IcPoll from "@/assets/images/ic_poll.svg";
import SearchIcon from "@/assets/images/ic_search.svg";
import BackIcon from "@/assets/images/icon_next_lg.svg";
import { Header } from "@/components/ui/Header";
import { HorizontalLine } from "@/components/ui/HorizontalLine";
import { KeywordNewsResponse, NewsItem, ServerKeyword } from "@/types/keyword";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const options = {
  headerShown: false,
};

export default function KeywordNewsScreen() {
  const { keyword } = useLocalSearchParams<{ keyword: string }>();
  const [keywords, setKeywords] = useState<ServerKeyword[]>([]);
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const keywordList = await getKeywords();

        const convertedList: ServerKeyword[] = keywordList.map((k) => ({
          id: k.keywordId,
          keyword: k.keywordName,
          createdAt: "",
          userId: 0,
        }));

        setKeywords(convertedList);

        const matched = convertedList.find((k) => k.keyword === keyword);
        if (!matched) return;

        const newsRes: KeywordNewsResponse = await getKeywordNews(matched.id);
        setNewsList(newsRes.newsData.content);
      } catch (err) {
        console.error("키워드 뉴스 로드 실패:", err);
      }
    };
    fetchData();
  }, [keyword]);

  const getCurrentTimeString = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const renderItem = ({ item }: { item: NewsItem }) => {
    const isSelected = selectedId === String(item.id);

    return (
      <Pressable
        onPress={() => setSelectedId(isSelected ? null : String(item.id))}
        style={[
          styles.card,
          {
            backgroundColor: isSelected ? "rgba(113, 125, 137, 0.10)" : "#fff",
          },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.category}>#{item.thema || "기타"}</Text>
          <Text style={styles.sentiment}>{item.sentiment}</Text>
        </View>

        <View style={styles.contentRow}>
          <View style={styles.textContent}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>
              {item.source} | {item.date}
            </Text>

            <View style={styles.metaRow}>
              <Text style={styles.meta}>
                조회 {Math.floor(item.view / 10000)}만
              </Text>
              <View style={styles.iconWithText}>
                <IcComnt width={24} height={24} />
                <Text style={styles.meta}>{item.commentNum}</Text>
              </View>
              <View style={styles.iconWithText}>
                <IcPoll width={24} height={24} />
                <Text style={styles.meta}>{item.voteNum}</Text>
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header
        title={
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => setIsModalVisible(true)}
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Text style={styles.topTitle}>{keyword}</Text>
              <IcArrowDown width={20} height={20} />
            </TouchableOpacity>
            <Text style={styles.timeText}>{getCurrentTimeString()} 기준</Text>
          </View>
        }
        leftSlot={
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/mynewgnal/keywordlist")}
          >
            <BackIcon width={24} height={24} />
          </TouchableOpacity>
        }
        rightSlot={
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <TouchableOpacity onPress={() => router.push("/header/search")}>
              <SearchIcon width={24} height={24} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/header/alarm")}>
              <AlarmIcon width={24} height={24} />
            </TouchableOpacity>
          </View>
        }
      />

      <FlatList
        data={newsList}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 80 }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>메뉴</Text>
                <Text style={styles.modalSub}>
                  보고 싶은 키워드를 선택해 주세요
                </Text>
                {keywords.map((word) => (
                  <TouchableOpacity
                    key={word.id}
                    onPress={() => {
                      setIsModalVisible(false);
                      router.push({
                        pathname: "/keyword/[keyword]",
                        params: { keyword: word.keyword },
                      });
                    }}
                    style={styles.keywordItem}
                  >
                    <Text style={{ fontSize: 16 }}>{word.keyword}</Text>
                    {word.keyword === keyword ? (
                      <IcSelected width={20} height={20} />
                    ) : (
                      <Iccheck width={20} height={20} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topTitle: { fontSize: 18, fontWeight: "700", color: "#000" },
  timeText: { fontSize: 11, color: "#888", marginTop: 2 },
  card: { paddingVertical: 16, gap: 8, borderRadius: 8, marginBottom: 8 },
  header: { flexDirection: "row", gap: 8, alignItems: "center" },
  category: {
    fontSize: 12,
    backgroundColor: "#F4F5F7",
    color: "#484F56",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  sentiment: {
    fontSize: 12,
    backgroundColor: "#E7EDFF",
    color: "#214DEF",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  contentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  textContent: { flex: 1, gap: 4 },
  title: { fontSize: 16, fontWeight: "500" },
  subtitle: { fontSize: 12, color: "#888" },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 13 },
  iconWithText: { flexDirection: "row", alignItems: "center", gap: 4 },
  meta: { fontSize: 12, color: "#777" },
  imagePlaceholder: {
    width: 76,
    height: 76,
    backgroundColor: "#dcdcdc",
    borderRadius: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 4 },
  modalSub: { fontSize: 13, color: "#717D89", marginBottom: 24 },
  keywordItem: {
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#2E3439",
  },
});
