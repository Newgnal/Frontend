import IcEtc from "@/assets/images/ic_cmnt_etc.svg";
import IcComnt from "@/assets/images/ic_comnt.svg";
import IcHeader from "@/assets/images/ic_header.svg";
import IcHeart from "@/assets/images/ic_hrt.svg";
import IcPoll from "@/assets/images/ic_poll.svg";
import IcComment from "@/assets/images/material-symbols-light_reply-rounded.svg";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewsDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [selectedPoll, setSelectedPoll] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [likedComments, setLikedComments] = useState<{
    [key: string]: boolean;
  }>({});
  const toggleLike = (commentId: string) => {
    setLikedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const dummyNewsData = [
    {
      id: "1",
      title: "한살림 고구마 케이크서 식중독균 검출",
      content:
        "식품의약품안전처(식약처)가 식품제조·가공업체 한살림우리밀제과가 제조하고, 유통전문판매업체 한살림사업연합이 판매한 '고구마케이크 1호'에서 중독균인 황색포도상구균이 검출돼 판매를 중단하고 회수 조치한다고 20일 밝혔다.\n\n회수 대상은 제조 일자가 '2025. 6. 12.'로 표시된 제품이다.\n\n식약처는 안성시청이 해당 제품을 신속히 회수 조치하도록 했으며, 해당 제품을 구매한 소비자에게 섭취를 중단하고 구입처에 반품해 달라고 당부했다고 알렸다.\n\n식품 관련 불법 행위를 목격한 경우 불량식품 신고 전화(☎ 1399)로 신고하거나 스마트폰 '내손안' 애플리케이션을 이용해 신고할 수 있다.",
      date: "2025.06.20",
    },
    {
      id: "2",
      title: "삼성전자, AI 반도체 공개",
      content: "삼성전자가 차세대 AI 반도체를 공개했다.",
      date: "2025.06.21",
    },
  ];

  const pollLabels = [
    "강한 부정",
    "약한 부정",
    "중립",
    "약한 긍정",
    "강한 긍정",
  ];
  const pollResults = [15, 20, 50, 30, 15];
  const opinionColors: Record<string, string> = {
    "강한 부정": "#F99426",
    "약한 부정": "#FCCE8B",
    중립: "#E4E6E7",
    "약한 긍정": "#B0FFE1",
    "강한 긍정": "#04E38F",
  };
  const pollBgColor = "#F4F5F7";

  const comments = Array.from({ length: 10 }, (_, i) => ({
    id: i.toString(),
    user: "테이비",
    time: "16시간 전",
    content:
      "유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다. 유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다.",
    opinion: "강한 긍정",
    replies: [
      {
        id: `${i}-r1`,
        user: "테이비",
        time: "16시간 전",
        content: "유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다",
        opinion: "강한 긍정",
      },
      {
        id: `${i}-r2`,
        user: "테이비",
        time: "16시간 전",
        content:
          "유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다. 유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다. 유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다.유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다",
        opinion: "약한 긍정",
      },
      {
        id: `${i}-r3`,
        user: "테이비",
        time: "16시간 전",
        content: "솔직히 맛 차이 잘 모르겠던데요?",
        opinion: "중립",
      },
    ],
  }));

  const opinionBgColors: Record<string, string> = {
    "강한 부정": "#FFF1E6",
    "약한 부정": "#FFF7E8",
    중립: "#F6F7F8",
    "약한 긍정": "#E5FFF7",
    "강한 긍정": "#D6FFEF",
  };
  const pollTotalCount = pollResults.reduce((acc, val) => acc + val, 0);
  const news = dummyNewsData.find((n) => n.id === id);
  if (!news) return <Text>뉴스를 찾을 수 없습니다</Text>;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={{ marginRight: 12 }}>
              <IcHeader width={24} height={24} />
            </TouchableOpacity>
            <TouchableOpacity>
              <IcEtc width={24} height={24} />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.newsTitle}>
          한살림 고구마 케이크서 ‘식중독균 검출’... 식약처, 회수 조치
        </Text>
        <Text style={styles.newsMeta}>입력 2025.06.20 오후 6:44</Text>

        <View style={styles.reactions}>
          <View style={styles.reactionItem}>
            <IcComnt width={16} height={16} style={{ marginRight: 4 }} />
            <Text style={styles.reactionText}>234</Text>
          </View>
          <View style={styles.reactionItem}>
            <IcPoll width={16} height={16} style={{ marginRight: 4 }} />
            <Text style={styles.reactionText}>402</Text>
          </View>
        </View>

        <View style={styles.summaryBox}>
          <Text style={styles.sectionLabel}>+ AI 요약</Text>
          <Text style={styles.summaryText}>
            요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약
          </Text>
        </View>

        <Text style={styles.content}>{news.content}</Text>

        <View style={styles.imageBox}></View>
        <Text style={styles.imageLabel}>
          한살림/식약관리원이 확인한 ‘고구마케이크’ 1판. 식약처제공
        </Text>

        <View
          style={{
            height: 8,
            width: 411,
            backgroundColor: "#F4F5F7",
            marginTop: 20,
            marginBottom: 20,
          }}
        />

        <View style={styles.pollBox}>
          <View style={styles.pollContainer}>
            <Text style={styles.pollQuestion}>
              이 뉴스가 [반도체/AI]에 어떤 영향을 줄까요?
            </Text>

            <View style={styles.pollOptions}>
              {pollLabels.map((label, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => {
                    setSelectedPoll(idx);
                    setHasVoted(true);
                  }}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "transparent",
                  }}
                >
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor:
                        selectedPoll === idx ? opinionColors[label] : "#CBD5E1",
                      transform: selectedPoll === idx ? [{ scale: 2.5 }] : [],
                    }}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 8,
                paddingHorizontal: 4,
              }}
            >
              {pollLabels.map((label, idx) => (
                <Text
                  key={idx}
                  style={[
                    styles.pollLabel,
                    selectedPoll === idx && {
                      fontWeight: "bold",
                      color: opinionColors[label],
                    },
                  ]}
                >
                  {label}
                </Text>
              ))}
            </View>
          </View>

          {hasVoted && (
            <View style={{ marginTop: 20 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  다른 사용자들의 의견
                </Text>
                <Text
                  style={{ fontWeight: "400", fontSize: 12, color: "#666" }}
                >
                  답변 {pollTotalCount}
                </Text>
              </View>
              {pollLabels.map((label, idx) => (
                <View
                  key={idx}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 6,
                  }}
                >
                  <Text
                    style={{
                      width: 70,
                      fontSize: 12,
                      fontWeight: "400",
                      color: "#484F56",
                    }}
                  >
                    {label}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      height: 6,
                      backgroundColor: "#F3F4F6",
                      borderRadius: 4,
                      marginHorizontal: 8,
                    }}
                  >
                    <View
                      style={{
                        height: 6,
                        borderRadius: 4,
                        backgroundColor: opinionColors[label],
                        width: `${pollResults[idx]}%`,
                      }}
                    />
                  </View>
                  <Text style={{ width: 30, fontSize: 12 }}>
                    {pollResults[idx]}%
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View
          style={{
            height: 8,
            width: 411,
            backgroundColor: "#F4F5F7",
            marginTop: 20,
            marginBottom: 20,
          }}
        />

        <View style={styles.commentSection}>
          <Text style={styles.commentCount}>댓글 {comments.length}</Text>

          {comments.map((comment) => (
            <View key={comment.id} style={styles.commentBox}>
              <View style={styles.commentHeader}>
                <View style={styles.commentUserIcon} />
                <View>
                  <Text style={styles.commentUser}>{comment.user}</Text>
                  <Text style={styles.commentTime}>{comment.time}</Text>
                </View>
                <View
                  style={[
                    styles.positiveTag,
                    {
                      backgroundColor:
                        opinionBgColors[comment.opinion] || pollBgColor,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: opinionColors[comment.opinion],
                      fontSize: 10,
                      fontWeight: "bold",
                    }}
                  >
                    {comment.opinion}
                  </Text>
                </View>
              </View>

              <Text style={styles.commentContent}>{comment.content}</Text>

              <View style={styles.commentActions}>
                <View style={styles.iconWithText}>
                  <IcHeart
                    width={24}
                    height={24}
                    stroke={likedComments[comment.id] ? "#FF5A5F" : "#C4C4C4"}
                  />
                  <Text style={styles.commentActionText}>
                    {likedComments[comment.id] ? 11 : 10}
                  </Text>
                </View>
                <View style={styles.iconWithText}>
                  <IcComment width={24} height={24} />
                  <Text style={styles.commentActionText}>답글 달기</Text>
                </View>
              </View>

              {comment.replies &&
                comment.replies.length > 0 &&
                comment.replies.map((reply) => (
                  <View key={reply.id} style={styles.replyBox}>
                    <View style={styles.commentHeader}>
                      <View style={styles.commentUserIcon} />
                      <View>
                        <Text style={styles.commentUser}>{reply.user}</Text>
                        <Text style={styles.commentTime}>{reply.time}</Text>
                      </View>
                      <View
                        style={[
                          styles.positiveTag,
                          {
                            backgroundColor:
                              opinionBgColors[reply.opinion] || pollBgColor,
                          },
                        ]}
                      >
                        <Text
                          style={{
                            color: opinionColors[reply.opinion],
                            fontSize: 10,
                            fontWeight: "bold",
                          }}
                        >
                          {reply.opinion}
                        </Text>
                      </View>
                    </View>

                    <Text style={[styles.commentContent, { paddingLeft: 40 }]}>
                      {reply.content}
                    </Text>

                    <View style={styles.commentActions}>
                      <View style={[styles.iconWithText, { paddingLeft: 36 }]}>
                        <IcHeart
                          width={24}
                          height={24}
                          stroke={
                            likedComments[comment.id] ? "#FF5A5F" : "#C4C4C4"
                          }
                        />
                        <Text style={styles.commentActionText}>
                          {likedComments[reply.id] ? 11 : 10}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff", flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerIcons: { flexDirection: "row" },
  newsTitle: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 36,
    fontFamily: "Pretendard",
    marginTop: 20,
  },
  newsMeta: { fontSize: 12, color: "#888", marginTop: 6 },
  sectionLabel: { marginTop: 20, fontWeight: "bold", fontSize: 14 },
  content: { marginTop: 8, fontSize: 14, lineHeight: 22, color: "#222" },
  imageBox: {
    marginTop: 20,
    backgroundColor: "#eaeaea",
    height: 140,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  imageLabel: { fontSize: 12, color: "#666", padding: 10 },
  reactions: { flexDirection: "row", gap: 12, marginTop: 12 },
  reactionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 999,
    backgroundColor: "#fff",
  },
  summaryBox: {
    borderLeftWidth: 2,
    borderLeftColor: "#D0D0D0",
    paddingLeft: 12,
    marginTop: 16,
  },
  summaryText: { fontSize: 14, lineHeight: 22, color: "#444" },
  reactionText: { fontSize: 14, color: "#6B7280" },
  pollBox: {
    padding: 20,
    borderRadius: 12,
    marginTop: 24,
  },
  pollContainer: {
    backgroundColor: "#F4F5F7",
    width: 372,
    height: 145,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 24,
    alignSelf: "center",
    justifyContent: "space-between",
  },
  pollQuestion: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  pollOptions: {
    backgroundColor: "#FFFFFF",
    height: 24,
    borderRadius: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  pollOption: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: 4,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#CBD5E1",
  },
  pollLabel: { fontSize: 10, color: "#4B5563", textAlign: "center" },
  commentSection: {
    marginTop: 32,
    paddingTop: 16,
  },
  commentCount: {
    fontSize: 13,
    fontWeight: "500",
    fontFamily: "Pretendard",
    color: "#40454A",
    lineHeight: 13,
  },
  commentBox: {
    marginBottom: 24,
    paddingBottom: 16,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  commentUserIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#dcdcdc",
    marginRight: 8,
  },
  commentUser: { fontWeight: "bold", fontSize: 14 },
  commentTime: { fontSize: 12, color: "#888" },
  positiveTag: {
    marginLeft: "auto",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  commentContent: { fontSize: 14, color: "#333", lineHeight: 20 },
  commentActions: {
    flexDirection: "row",
    marginTop: 8,
    alignItems: "center",
    gap: 12,
  },
  commentLike: {
    fontSize: 12,
    color: "#6B7280",
  },
  commentReply: {
    fontSize: 12,
    color: "#6B7280",
    textDecorationLine: "underline",
  },

  iconWithText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  commentActionText: {
    fontSize: 12,
    color: "#6B7280",
  },
  replyContainer: {
    marginTop: 12,
    paddingLeft: 12,

    gap: 12,
  },
  replyBox: {
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    paddingTop: 16,
    paddingBottom: 12,
    paddingHorizontal: 16,
    marginLeft: 0,
  },
});
