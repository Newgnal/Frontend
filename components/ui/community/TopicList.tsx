import { togglePostLikeById } from "@/api/postApi";
import { useEffect, useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { HorizontalLine } from "../HorizontalLine";
import TopicDetail from "./TopicDetail";

type OrderType = "LATEST" | "POPULAR";

interface TopciListProps {
  order: OrderType;
  hasNews: boolean;
  data: any[];
}

export default function TopicList({ order, hasNews, data }: TopciListProps) {
  const [likes, setLikes] = useState<{ [postId: number]: number }>({});
  const [liked, setLiked] = useState<{ [postId: number]: boolean }>({});

  useEffect(() => {
    const initialLikes: { [postId: number]: number } = {};
    const initialLiked: { [postId: number]: boolean } = {};

    data.forEach((item) => {
      initialLikes[item.postId] = item.likeCount;
      initialLiked[item.postId] = item.isLiked || false; // API 응답의 isLiked로 초기화
    });

    setLikes(initialLikes);
    setLiked(initialLiked);
  }, [data]);

  const handleToggleLike = async (postId: number) => {
    try {
      const res = await togglePostLikeById(postId);

      // 좋아요 상태 업데이트
      setLiked((prev) => ({
        ...prev,
        [postId]: res.liked, // API 응답의 liked 값으로 업데이트
      }));

      // 좋아요 카운트 업데이트
      setLikes((prev) => ({
        ...prev,
        [postId]: res.liked ? (prev[postId] || 0) + 1 : (prev[postId] || 0) - 1,
      }));
    } catch (err) {
      Toast.show({ type: "error", text1: "좋아요 처리 실패" });
    }
  };

  return (
    <>
      {data.map((item, index) => {
        const postId = item.postId;
        const currentLikeCount = likes[postId] ?? item.likeCount;
        const currentLiked = liked[postId] ?? false;

        return (
          <View key={postId}>
            <TopicDetail
              item={{
                ...item,
                likeCount: currentLikeCount,
                isLiked: currentLiked,
              }}
              isList={true}
              hasNews={hasNews}
              liked={currentLiked}
              onTogglePostLike={() => handleToggleLike(postId)}
            />
            {index !== data.length - 1 && (
              <HorizontalLine style={{ marginBottom: 20 }} />
            )}
          </View>
        );
      })}
    </>
  );
}
