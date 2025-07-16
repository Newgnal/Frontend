import DotIcon from "@/assets/images/ic_dot.svg";
import ViewIcon from "@/assets/images/ic_eyes.svg";
import HeartIcon from "@/assets/images/ic_hrt_emt.svg";
import CommentIcon from "@/assets/images/ic_message.svg";
import { typography } from "@/styles/typography";
import { convertThemaToKor } from "@/utils/convertThemaToKor";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { HorizontalLine } from "../HorizontalLine";

const SCREEN_WIDTH = Dimensions.get("window").width;
const PEEK_WIDTH = 32;
const PAGE_WIDTH = SCREEN_WIDTH - PEEK_WIDTH * 3;

// 3개씩 나누기 (페이지 당 3개 카드)
function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunked: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunked.push(arr.slice(i, i + size));
  }
  return chunked;
}

const HotTopicList = ({ data }: { data: any[] }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollRef = useRef(null);

  const pageChunks = chunkArray(data, 3);

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(offsetX / PAGE_WIDTH);
    setCurrentPage(pageIndex);
  };

  const router = useRouter();
  return (
    <>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled={false}
        snapToInterval={PAGE_WIDTH}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        contentContainerStyle={{ paddingRight: PEEK_WIDTH }}
      >
        {pageChunks.map((chunk, pageIndex) => (
          <View
            key={pageIndex}
            style={[
              styles.page,
              {
                width: PAGE_WIDTH,
                marginRight:
                  pageIndex !== pageChunks.length - 1 ? PEEK_WIDTH : 0,
              },
            ]}
          >
            {chunk.map((item, index) => {
              const globalIndex = pageIndex * 3 + index + 1; // 전체 카드 인덱스 (1부터 시작)

              return (
                <Pressable
                  key={item.postId}
                  style={styles.card}
                  onPress={() =>
                    router.push({
                      pathname: `/community/post/[id]` as const,
                      params: { id: String(item.postId) },
                    })
                  }
                >
                  <Text style={styles.id}>{globalIndex}</Text>
                  <View style={styles.textContainer}>
                    <View style={styles.tagCard}>
                      <Text style={styles.tag}>
                        {convertThemaToKor(item.thema)}
                      </Text>
                    </View>
                    <Text style={styles.titleText}>{item.postTitle}</Text>
                    <View style={styles.meta}>
                      <View style={styles.iconContainer}>
                        <HeartIcon />
                        <Text style={styles.itemText}>{item.likeCount}</Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <View style={styles.iconContainer}>
                          <ViewIcon />
                          <Text style={styles.itemText}>{item.viewCount}</Text>
                        </View>
                        <DotIcon
                          style={{ alignSelf: "center", marginLeft: 4 }}
                        />
                        <View style={styles.iconContainer}>
                          <CommentIcon />
                          <Text style={styles.itemText}>
                            {item.commentCount}
                          </Text>
                        </View>
                      </View>
                    </View>
                    {globalIndex % 3 !== 0 && <HorizontalLine />}
                  </View>
                </Pressable>
              );
            })}
          </View>
        ))}
      </ScrollView>

      <View style={styles.indicator}>
        {pageChunks.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, { opacity: currentPage === i ? 1 : 0.3 }]}
          />
        ))}
      </View>
    </>
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
    paddingRight: 24,
  },
  card: {
    marginBottom: 16,
    flexDirection: "row",
    gap: 12,
  },
  id: {
    ...typography.subtitle_s3_15_semi_bold,
    color: "#04E38F",
    paddingRight: 12,
  },
  tag: {
    fontFamily: "Pretendard",
    color: "#484F56",
    fontSize: 12,
    fontWeight: "400",
    fontStyle: "normal",
  },
  tagCard: {
    padding: 4,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    alignSelf: "flex-start",
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
  textContainer: {
    alignSelf: "center",
    gap: 8,
    width: "100%",
  },
  iconContainer: {
    flexDirection: "row",
  },
  itemText: {
    ...typography.caption_c2_12_regular,
    color: "#89939F",
    alignSelf: "center",
  },
});

export default HotTopicList;
