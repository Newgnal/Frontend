import IcArrowDown from "@/assets/images/ic_arrow_down.svg";
import IcComnt from "@/assets/images/ic_comnt.svg";
import IcPoll from "@/assets/images/ic_poll.svg";
import BackIcon from "@/assets/images/icon_next_lg.svg";
import { Header } from "@/components/ui/Header";
import HeaderIcons from "@/components/ui/HeaderIcon/HeaderIcons";
import { HorizontalLine } from "@/components/ui/HorizontalLine";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const dummyNews = [
  {
    id: "1",
    keyword: "삼성전자",
    title: "삼성, 2028년부터 반도체 유리기판 쓴다",
    date: "2025.05.28",
    sentiment: "-0.8",
    views: 21000,
  },
  {
    id: "2",
    keyword: "앤비디아",
    title: "삼성전자, 차세대 반도체 발표",
    date: "2025.05.27",
    sentiment: "-0.6",
    views: 18000,
  },
  {
    id: "3",
    keyword: "현대차",
    title: "현대차, 전기차 전략 공개",
    date: "2025.05.26",
    sentiment: "-0.5",
    views: 12000,
  },
];

export const options = {
  headerShown: false,
};

export default function KeywordNewsScreen() {
  const { keyword } = useLocalSearchParams<{ keyword: string }>();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const keywords = [...new Set(dummyNews.map((item) => item.keyword))];
  const filteredNews = dummyNews.filter((item) => item.keyword === keyword);

  const getCurrentTimeString = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const renderItem = ({ item }: { item: (typeof dummyNews)[0] }) => {
    const isSelected = selectedId === item.id;

    return (
      <Pressable
        onPress={() => setSelectedId(isSelected ? null : item.id)}
        style={[
          styles.card,
          {
            backgroundColor: isSelected ? "rgba(113, 125, 137, 0.10)" : "#fff",
          },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.category}>#{item.keyword}</Text>
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
          <TouchableOpacity onPress={() => router.back()}>
            <BackIcon width={24} height={24} />
          </TouchableOpacity>
        }
        rightSlot={<HeaderIcons />}
      />

      <FlatList
        data={filteredNews}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 80 }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>메뉴</Text>
            <Text style={styles.modalSub}>
              보고 싶은 키워드를 선택해 주세요
            </Text>
            {keywords.map((word) => (
              <TouchableOpacity
                key={word}
                onPress={() => {
                  setIsModalVisible(false);
                  router.push({
                    pathname: "/keyword/[keyword]",
                    params: { keyword: word },
                  });
                }}
                style={styles.keywordItem}
              >
                <Text style={{ fontSize: 16 }}>{word}</Text>
                {word === keyword && <Text>✔️</Text>}
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
    borderBottomColor: "#eee",
  },
  centerSlot: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
