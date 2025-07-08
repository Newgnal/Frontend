import IcGraySearch from "@/assets/images/ic_search.gray.svg";
import IcClose from "@/assets/images/icon_close.svg";
import NextLgIcon from "@/assets/images/icon_next_lg.svg";
import NewsCard from "@/components/NewsCard";
import { HorizontalLine } from "@/components/ui/HorizontalLine";
import { typography } from "@/styles/typography";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const dummyNews = [
  {
    id: "1",
    title: "삼성, 2028년부터 반도체 유리기판 쓴다",
    date: "2025.05.28",
    category: "반도체/AI",
    sentiment: "+0.8",
    views: 21000,
  },
  {
    id: "2",
    title: "삼성전자, 차세대 AI 반도체 공개",
    date: "2025.05.27",
    category: "반도체/AI",
    sentiment: "+0.9",
    views: 50000,
  },
  {
    id: "3",
    title: "NVIDIA, GPT-5에 최적화된 GPU 출시",
    date: "2025.05.26",
    category: "반도체/AI",
    sentiment: "+1.2",
    views: 35000,
  },
  {
    id: "4",
    title: "AI 반도체 시장, 2030년 5배 성장 전망",
    date: "2025.05.25",
    category: "반도체/AI",
    sentiment: "+1.0",
    views: 12000,
  },
  {
    id: "5",
    title: "삼성, 유리기판 반도체 대량 생산 기술 확보",
    date: "2025.05.24",
    category: "반도체/AI",
    sentiment: "+0.7",
    views: 27000,
  },
];

type NewsType = {
  id: string;
  title: string;
  date: string;
  category: string;
  sentiment: string;
  views: number;
  isSelected?: boolean;
  onPress?: () => void;
};

export default function SelectNewsScreen() {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const sortedNews = [...dummyNews].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleSelectNews = (news: (typeof dummyNews)[0]) => {
    router.push({
      pathname: "/(tabs)/community/writeForm",
      params: {
        id: news.id,
        title: news.title,
        date: news.date,
        category: news.category,
        sentiment: news.sentiment,
        views: String(news.views),
      },
    });
  };

  const renderItem = ({ item }: { item: NewsType }) => (
    <NewsCard
      {...item}
      isSelected={false}
      onPress={() => handleSelectNews(item)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <NextLgIcon />
        </Pressable>

        <View style={styles.searchBar}>
          <IcGraySearch width={20} height={20} />
          <TextInput
            style={styles.input}
            placeholder="추가할 뉴스를 검색해보세요"
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
          <Pressable onPress={() => setSearchText("")}>
            <IcClose width={18} height={18} />
          </Pressable>
        </View>
      </View>

      <HorizontalLine />
      <Text style={styles.time}>18:49 기준</Text>

      <FlatList
        data={sortedNews}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 7,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 38,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#000",
    paddingVertical: 0,
  },
  time: {
    ...typography.caption_c1_11_regular,
    paddingHorizontal: 20,
    paddingVertical: 7,
    marginTop: 10,
    color: "#89939F",
  },
});
