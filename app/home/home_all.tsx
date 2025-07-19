import { getAllNews } from "@/api/useNewsApi";
import IcComnt from "@/assets/images/ic_comnt.svg";
import IcPoll from "@/assets/images/ic_poll.svg";
import { HorizontalLine } from "@/components/ui/HorizontalLine";
import { NewsItem } from "@/types/news";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { typography } from "../../styles/typography";

type OrderType = "latest" | "views";

interface HomeAllProps {
  order: OrderType;
}

export default function HomeAll({ order }: HomeAllProps) {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();

  const fetchNews = async (pageNum: number) => {
    try {
      setLoading(true);
      const data = await getAllNews(order, pageNum);
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setNewsList((prev) => [...prev, ...data]);
      }
    } catch (error) {
      console.error("뉴스 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setNewsList([]);
    setPage(0);
    setHasMore(true);
    fetchNews(0);
  }, [order]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchNews(nextPage);
    }
  };

  const renderItem = ({ item }: { item: NewsItem }) => {
    const isSelected = selectedId === item.id;

    return (
      <Pressable
        onPress={() => {
          setSelectedId((prev) => (prev === item.id ? null : item.id));
          router.push(`/news/${item.id}`);
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
          <Text style={styles.category}>{item.thema}</Text>
          <Text style={styles.sentiment}>
            {item.sentiment > 0 ? `+${item.sentiment}` : item.sentiment}
          </Text>
        </View>

        <View style={styles.contentRow}>
          <View style={styles.textContent}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>
              {item.source} | {item.date.split("T")[0]}
            </Text>
            <View style={styles.metaRow}>
              <Text style={[styles.meta, { marginBottom: 12 }]}>
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

          {item.imageUrl && (
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
          )}
        </View>

        <HorizontalLine />
      </Pressable>
    );
  };

  return (
    <FlatList
      data={newsList}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.6}
      ListFooterComponent={
        loading ? <ActivityIndicator size="small" color="#aaa" /> : null
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 80,
  },
  card: {
    height: 136,
    alignSelf: "stretch",
    justifyContent: "space-between",
    marginBottom: 16,
    width: "100%",
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
    alignSelf: "flex-start",
    marginTop: 8,
  },
  sentiment: {
    fontSize: 12,
    color: "#214DEF",
    backgroundColor: "#E7EDFF",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    textAlign: "center",
    letterSpacing: 0.072,
    fontWeight: "400",
    marginTop: 8,
  },
  contentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  textContent: {
    flex: 1,
    flexDirection: "column",
    gap: 8,
  },
  title: {
    ...typography.subtitle_s3_15_semi_bold,
  },
  subtitle: {
    ...typography.caption_c2_12_regular,
    color: "#888",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconWithText: {
    ...typography.caption_c2_12_regular,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 10,
  },
  meta: {
    fontSize: 12,
    color: "#777",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 4,
    backgroundColor: "#dcdcdc",
  },
});
