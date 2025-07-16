import DotIcon from "@/assets/images/ic_dot.svg";
import EmptyProfileIcon from "@/assets/images/ic_ellipse.svg";
import ViewIcon from "@/assets/images/ic_eyes.svg";
import HeartIcon from "@/assets/images/ic_hrt_emt.svg";
import MessageIcon from "@/assets/images/ic_message.svg";
import { typography } from "@/styles/typography";
import { convertThemaToKor } from "@/utils/convertThemaToKor";
import { getTimeAgo } from "@/utils/getTimeAgo";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
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
  };
  isList?: boolean;
  hasNews?: boolean;
}

export default function TopicDetail({
  item,
  isList = false,
  hasNews = false,
}: TopicDetailProps) {
  const router = useRouter();
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
        onPress={() => router.push("/community/post")}
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
              ...(isList && { numberOfLines: 2 }),
            } as any,
          ]}
          numberOfLines={isList ? 2 : undefined}
        >
          {item.postContent}
        </Text>
      </Pressable>

      {hasNews && (
        <View style={{ marginTop: 12 }}>
          <News
            id="1"
            title="삼성, 2028년부터 반도체 유리기판 쓴다"
            date="2025.05.28"
            category="반도체/AI"
            sentiment="-0.8"
          />
        </View>
      )}

      <View style={styles.buttonContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <HeartIcon />
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
