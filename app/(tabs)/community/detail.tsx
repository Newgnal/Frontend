import CategoryModal from "@/app/CategoryModal";
import PlusIcon from "@/assets/images/ic_add.svg";
import OrderChangeIcon from "@/assets/images/ic_orderchange.svg";
import SearchIcon from "@/assets/images/ic_search.svg";
import NextLgIcon from "@/assets/images/icon_next_lg.svg";
import TopicList from "@/components/ui/community/TopicList";
import { Header } from "@/components/ui/Header";
import { typography } from "@/styles/typography";

import { getPostList } from "@/api/postApi";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Post = {
  postId: number;
  postTitle: string;
  postContent: string;
  createdAt: string;
  updatedAt?: string;
  likeCount: number;
  viewCount: number;
  commentCount: number;
  nickname: string;
  thema: string;
  articleUrl: string;
  hasVote: string;
  imageUrl: string;
};

export default function ComDetailScreen() {
  const router = useRouter();
  const [order, setOrder] = useState<"LATEST" | "POPULAR">("LATEST");
  const [isVisible, setIsVisible] = useState(false);
  const [postList, setPostList] = useState<Post[]>([]);

  useEffect(() => {
    getPostList({ sortType: order })
      .then((res) => {
        setPostList(res ?? []);
      })
      .catch((err) => {
        console.error("게시글 목록 로딩 실패:", err);
        setPostList([]); // 에러 시에도 빈 배열로 fallback
      });
  }, [order]);

  const handleCategorySelect = (category: string) => {
    setIsVisible(false);
    router.push({
      pathname: "/(tabs)/community/writeForm",
      params: { category },
    });
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header
          title="전체"
          leftSlot={
            <Pressable onPress={() => router.back()}>
              <NextLgIcon />
            </Pressable>
          }
          rightSlot={
            <>
              <SearchIcon />
              <Pressable onPress={() => setIsVisible(true)}>
                <PlusIcon />
              </Pressable>
            </>
          }
        />

        <TouchableOpacity
          onPress={() =>
            setOrder((prev) => (prev === "LATEST" ? "POPULAR" : "LATEST"))
          }
          style={{
            paddingBottom: 4,
            paddingHorizontal: 20,
            paddingTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Text
            style={[typography.caption_c2_12_regular, { color: "#484F56" }]}
          >
            {order === "LATEST" ? "최신순" : "조회순"}
          </Text>
          <OrderChangeIcon />
        </TouchableOpacity>

        <ScrollView contentContainerStyle={{ justifyContent: "center" }}>
          <View style={{ paddingHorizontal: 20 }}>
            <TopicList data={postList} order={order} hasNews={true} />
          </View>
        </ScrollView>
      </SafeAreaView>
      <CategoryModal
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        onSelect={handleCategorySelect}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  rankbox: {
    backgroundColor: "#F7F7F8",
    borderRadius: 12,
    flexDirection: "row",
    gap: 16,
    padding: 12,
  },
  rankdetail: {
    flexDirection: "row",
    gap: 8,
  },
  rankname: {
    backgroundColor: "#484F56",
    borderRadius: 10,
    paddingHorizontal: 8,
    color: "#FFF",
    textAlign: "center",
  },
  more: {
    paddingHorizontal: 36,
    paddingVertical: 24,
    alignItems: "center",
  },
});
