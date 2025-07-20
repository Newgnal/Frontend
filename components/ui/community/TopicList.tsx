import { useState } from "react";
import { View } from "react-native";
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

  return (
    <>
      {data.map((item, index) => {
        const postId = item.postId;
        const currentLikeCount = likes[postId] ?? item.likeCount;
        const currentLiked = liked[postId] ?? false;

        return (
          <View key={postId}>
            <TopicDetail
              item={{ ...item, likeCount: currentLikeCount }}
              isList={true}
              hasNews={hasNews}
              liked={currentLiked}
              setLiked={(val) =>
                setLiked((prev) => ({ ...prev, [postId]: val }))
              }
              updatePost={(val) =>
                setLikes((prev) => ({
                  ...prev,
                  [postId]:
                    typeof val === "function"
                      ? val(prev[postId] ?? item.likeCount)
                      : val,
                }))
              }
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
