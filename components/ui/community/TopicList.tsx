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
  return (
    <>
      {data.map((item, index) => (
        <View key={item.postId}>
          <TopicDetail item={item} isList={true} hasNews={hasNews} />
          {index !== data.length - 1 && (
            <HorizontalLine style={{ marginBottom: 20 }} />
          )}
        </View>
      ))}
    </>
  );
}
