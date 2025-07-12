import { StyleSheet, View } from "react-native";
import { HorizontalLine } from "../HorizontalLine";
import TopicDetail from "./TopicDetail";

type OrderType = "latest" | "views";

interface TopciListProps {
  order: OrderType;
  hasNews: boolean;
}

const dummyData = [
  {
    id: 1,
    username: "가나다",
    time: "16시간 전",
    category: "반도체/AI",
    title: "반도체에 대해 어떻게 생각하세요?",
    content:
      "유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다. 유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다. 유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다. 유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다. 유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다. 유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다. 유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다. 유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다.",
    likes: 10,
    views: 10,
    comments: 10,
    date: "2025.05.30",
  },
  {
    id: 2,
    username: "홍길동",
    time: "2시간 전",
    category: "스타트업",
    title: "요즘 스타트업 근무 환경 어때요?",
    content:
      "요즘 스타트업들은 유연한 환경을 지향하고 있지만, 현실은 조금 다를 수도 있어요.",
    likes: 8,
    views: 25,
    comments: 3,
    date: "2025.05.26",
  },
  {
    id: 3,
    username: "테이비",
    time: "16시간 전",
    category: "반도체/AI",
    title: "반도체에 대해 어떻게 생각하세요?",
    content:
      "유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다. 유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다.",
    likes: 10,
    views: 30,
    comments: 35,
    date: "2025.05.24",
  },
];

// state가 홈이면 News 렌더링 안하고 전체면 News 렌더링하게 만들기
export default function TopicList({ order, hasNews }: TopciListProps) {
  const sortedData = [...dummyData].sort((a, b) => {
    if (order === "views") {
      return b.views - a.views;
    } else {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });
  return (
    <>
      {sortedData.map((item, index) => (
        <View key={item.id}>
          <TopicDetail item={item} isList={true} hasNews={hasNews} />
          {index !== dummyData.length - 1 && (
            <HorizontalLine style={{ marginBottom: 20 }} />
          )}
        </View>
      ))}
    </>
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
