import { getNewsById } from "@/api/useNewsApi";
import DotIcon from "@/assets/images/ic_dot.svg";
import EmptyProfileIcon from "@/assets/images/ic_ellipse.svg";
import ViewIcon from "@/assets/images/ic_eyes.svg";
import HeartIcon from "@/assets/images/ic_hrt_emt.svg";
import HeartFilledIcon from "@/assets/images/ic_hrt_filled.svg";
import MessageIcon from "@/assets/images/ic_message.svg";
import { typography } from "@/styles/typography";
import { convertThemaToKor } from "@/utils/convertThemaToKor";
import { getTimeAgo } from "@/utils/getTimeAgo";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import News from "./News";

interface TopicDetailProps {
  item: {
    nickname: string;
    createdAt: string;
    thema: string;
    postTitle: string;
    postContent: string;
    likeCount: number;
    viewCount: number;
    commentCount: number;
    updatedAt?: string;
    postId: number;
    newsId?: string;
  };
  isList?: boolean;
  hasNews?: boolean;
  liked: boolean;
  onTogglePostLike: () => void;
  // setLiked: (val: boolean) => void;
  // updatePost: (likeCount: number | ((prev: number) => number)) => void;
}

interface NewsData {
  id: string;
  title: string;
  date: string;
  category: string;
  sentiment: string;
  source: string;
}
const formatDate = (iso: string) => {
  const date = new Date(iso);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}.${String(date.getDate()).padStart(2, "0")}`;
};

export default function TopicDetail({
  item,
  isList = false,
  hasNews = false,
  liked,
  onTogglePostLike,
}: TopicDetailProps) {
  const router = useRouter();
  const [newsData, setNewsData] = useState<NewsData | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      if (!item.newsId) return;

      try {
        const res = await getNewsById(item.newsId);
        if (!res) return;
        const { id, title, source, thema, date, sentiment } = res;
        setNewsData({
          id: String(id),
          title,
          source,
          category: convertThemaToKor(thema),
          date: formatDate(date),
          sentiment: String(sentiment),
        });
      } catch (err) {
        console.warn("뉴스 불러오기 실패:", err);
      }
    };

    fetchNews();
  }, [item.newsId]);
  return (
    <View>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", gap: 7 }}>
          <EmptyProfileIcon />
          <View>
            <Text style={typography.label_l2_13_medium}>{item.nickname}</Text>
            <Text
              style={[typography.caption_c2_12_regular, { color: "#89939F" }]}
            >
              {getTimeAgo(item.updatedAt, item.createdAt)}
            </Text>
          </View>
        </View>
        <View style={styles.category}>
          <Text
            style={[
              typography.caption_c2_12_regular,
              { color: "#484F56", padding: 4 },
            ]}
          >
            {convertThemaToKor(item.thema)}
          </Text>
        </View>
      </View>

      <Pressable
        style={{ paddingTop: 8 }}
        onPress={() =>
          router.push({
            pathname: "/community/post/[id]",
            params: { id: String(item.postId) },
          })
        }
      >
        <Text
          style={[typography.subtitle_s3_15_semi_bold, { color: "#40454A" }]}
        >
          {item.postTitle}
        </Text>
        <Text
          style={[
            typography.caption_c2_12_regular,
            {
              paddingTop: 4,
              color: "#717D89",
            } as any,
          ]}
          numberOfLines={isList ? 2 : undefined}
        >
          {item.postContent}
        </Text>
      </Pressable>

      {newsData && (
        <Pressable
          style={{ marginTop: 12 }}
          onPress={() => router.push(`/news/${newsData.id}`)}
        >
          <News
            id={newsData.id}
            title={newsData.title}
            date={newsData.date}
            category={newsData.category}
            sentiment={newsData.sentiment}
            source={newsData.source}
          />
        </Pressable>
      )}

      <View style={styles.buttonContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={onTogglePostLike}>
            {liked ? <HeartFilledIcon /> : <HeartIcon />}
          </TouchableOpacity>
          <Text
            style={[
              typography.caption_c2_12_regular,
              { color: "#89939F", marginLeft: 4 },
            ]}
          >
            {item.likeCount}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ViewIcon />
          <Text
            style={[
              typography.caption_c2_12_regular,
              { color: "#89939F", paddingRight: 4 },
            ]}
          >
            {item.viewCount}
          </Text>
          <DotIcon />
          <MessageIcon />
          <Text
            style={[typography.caption_c2_12_regular, { color: "#89939F" }]}
          >
            {item.commentCount}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  category: {
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
});
