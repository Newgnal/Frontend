import { getAllNews } from "@/api/useNewsApi";
import IcGraySearch from "@/assets/images/ic_search.gray.svg";
import IcClose from "@/assets/images/icon_close.svg";
import NextLgIcon from "@/assets/images/icon_next_lg.svg";
import NewsCard from "@/components/NewsCard";
import { HorizontalLine } from "@/components/ui/HorizontalLine";
import { typography } from "@/styles/typography";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type NewsItem = {
  id: string;
  title: string;
  date: string;
  category: string;
  sentiment: string;
  url: string;
  isSelected?: boolean;
  onPress?: () => void;
};

export default function SelectNewsScreen() {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const data = await getAllNews("latest", page);
        setNewsList((prev) => (page === 0 ? data : [...prev, ...data]));
      } catch (err) {
        console.error("뉴스 로딩 실패:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, [page]);

  const { formTitle, content, category, hasVoted, postId } =
    useLocalSearchParams<{
      formTitle?: string;
      content?: string;
      category?: string;
      hasVoted?: string;
      postId?: string;
    }>();
  const isEdit = !!postId;

  const handleSelectNews = (news: NewsItem) => {
    router.push({
      pathname: "/(tabs)/community/writeForm",
      params: {
        // 뉴스 정보
        id: news.id,
        title: news.title,
        date: news.date,
        newsCategory: news.category,
        sentiment: news.sentiment,
        url: news.url,
        formTitle: formTitle ?? "",
        content: content ?? "",
        category: category ?? "",
        hasVoted: hasVoted === "true" ? "true" : "false",

        // 수정 중일 경우 기존 글 수정 정보 유지
        ...(isEdit && {
          postId,
          editTitle: formTitle ?? "",
          editContent: content ?? "",
          editHasVoted: hasVoted === "true" ? "true" : "false",
          editArticleUrl: news.url,
          editThema: category ?? "",
        }),
      },
    });
  };

  const renderItem = ({ item }: { item: NewsItem }) => (
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
        data={newsList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        onEndReached={() => setPage((prev) => prev + 1)}
        onEndReachedThreshold={0.5}
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
