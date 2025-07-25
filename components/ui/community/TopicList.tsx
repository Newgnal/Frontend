import { getPostById, togglePostLikeById } from "@/api/postApi";
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
      initialLiked[item.postId] = item.liked || false;
    });

    setLikes(initialLikes);
    setLiked(initialLiked);
  }, [data]);

  const handleToggleLike = async (postId: number) => {
    // const isCurrentlyLiked = liked[postId] ?? false;

    // // 좋아요 상태 업데이트
    // setLiked((prev) => ({
    //   ...prev,
    //   [postId]: !isCurrentlyLiked,
    // }));

    // // 좋아요 카운트 업데이트
    // setLikes((prev) => ({
    //   ...prev,
    //   [postId]: isCurrentlyLiked
    //     ? Math.max((prev[postId] || 1) - 1, 0)
    //     : (prev[postId] || 0) + 1,
    // }));
    try {
      await togglePostLikeById(postId);
      const res = await getPostById(postId);
      const updatedPost = res.data.post;
      setLikes((prev) => ({
        ...prev,
        [postId]: updatedPost.likeCount,
      }));

      setLiked((prev) => ({
        ...prev,
        [postId]: updatedPost.liked,
      }));
    } catch (err) {
      Toast.show({ type: "error", text1: "좋아요 처리 실패" });
      console.log("좋아요 처리 실패", err);
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
                liked: currentLiked,
              }}
              isList={true}
              hasNews={hasNews}
              // liked={currentLiked}
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
