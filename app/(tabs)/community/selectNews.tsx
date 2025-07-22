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
  thema: string;
  sentiment: string;
  source: string;
  imageUrl: string;
  voteNum: string;
  view: number;
  commentNum: string;
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
        // const dummyData = [
        //   {
        //     id: 1,
        //     title: "삼성전자, AI 반도체 시장 진출",
        //     date: "2025-07-15",
        //     thema: "반도체/AI",
        //     sentiment: "+1.2",
        //     likeCount: "120",
        //     source: "매일경제",
        //     voteNum: "45",
        //     view: 900,
        //     commentNum: "22",
        //   },
        //   {
        //     id: 2,
        //     title: "테슬라, 자율주행 기술 개선 발표",
        //     date: "2025-07-14",
        //     thema: "모빌리티",
        //     sentiment: "-0.5",
        //     likeCount: "95",
        //     source: "조선일보",
        //     voteNum: "30",
        //     view: 670,
        //     commentNum: "15",
        //   },
        // ];
        const data = await getAllNews("latest", page);
        const mappedNews = data.map((item: any) => ({
          id: String(item.id),
          title: item.title,
          source: item.source,
          thema: item.thema,
          date: item.date,
          sentiment: String(Math.round(item.sentiment * 100) / 100),
          imageUrl: item.imageUrl,
          view: item.view,
          commentNum: String(item.commentNum),
          voteNum: String(item.voteNum),
        }));
        setNewsList((prev) =>
          page === 0 ? mappedNews : [...prev, ...mappedNews]
        );
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
        newsSource: news.source,
        newsCategory: news.thema,
        newsImageUrl: news.imageUrl,
        source: news.source,
        sentiment: news.sentiment,
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
          // editArticleUrl: news.url, -> Id로 수정
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
