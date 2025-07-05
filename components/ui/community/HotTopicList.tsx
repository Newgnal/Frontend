import { useRef, useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const PEEK_WIDTH = 32;
const PAGE_WIDTH = SCREEN_WIDTH - PEEK_WIDTH;

const data = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  tag: "반도체/AI",
  title: "반도체에 대해 어떻게 생각하세요?",
  likes: 10,
  views: 10,
  comments: 12,
}));

// 3개씩 나누기 (주 슬라이드 단위)
const chunkArray = (arr: any[], size: number) => {
  const chunked = [];
  for (let i = 0; i < arr.length; i += size) {
    chunked.push(arr.slice(i, i + size));
  }
  return chunked;
};

const HotTopicList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const mainChunks = chunkArray(data, 3); // 3개씩 잘라 페이지 구성

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(offsetX / PAGE_WIDTH);
    setCurrentPage(pageIndex);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>지금 뜨는 이야기</Text>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled={false}
        snapToInterval={PAGE_WIDTH}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 16 }}
        onMomentumScrollEnd={handleScrollEnd}
      >
        {mainChunks.map((mainItems, pageIndex) => {
          const peekItems = data.slice(
            (pageIndex + 1) * 3,
            (pageIndex + 2) * 3
          ); // 다음 3개 peek

          const allItems = [...mainItems, ...peekItems]; // 총 6개
          const rows = chunkArray(allItems, 2); // 2열 구성

          return (
            <View
              key={pageIndex}
              style={[
                styles.page,
                { width: PAGE_WIDTH, marginRight: PEEK_WIDTH },
              ]}
            >
              {rows.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {row.map((item) => (
                    <View key={item.id} style={styles.card}>
                      <Text style={styles.id}>{item.id}</Text>
                      <Text style={styles.tag}>{item.tag}</Text>
                      <Text style={styles.titleText}>{item.title}</Text>
                      <View style={styles.meta}>
                        <Text>❤️ {item.likes}</Text>
                        <Text>👁 {item.views}</Text>
                        <Text>💬 {item.comments}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          );
        })}
      </ScrollView>

      {/* 인디케이터 */}
      <View style={styles.indicator}>
        {mainChunks.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, { opacity: currentPage === i ? 1 : 0.3 }]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  page: {
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  card: {
    width: (PAGE_WIDTH - 16) / 2 - 8,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  id: {
    color: "green",
    fontWeight: "bold",
    marginBottom: 4,
  },
  tag: {
    fontSize: 12,
    color: "#666",
    marginBottom: 6,
  },
  titleText: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 12,
  },
  indicator: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#000",
    marginHorizontal: 4,
  },
});

export default HotTopicList;
