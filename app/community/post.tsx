import { deletePostbyId } from "@/api/postApi";
import IcComntEtc from "@/assets/images/ic_cmnt_etc (1).svg";
import EtcVerIcon from "@/assets/images/ic_cmnt_etc_ver.svg";
import HoldIcon from "@/assets/images/ic_com_poll.svg";
import BuyIcon from "@/assets/images/ic_com_poll_buy.svg";
import SellIcon from "@/assets/images/ic_com_poll_sell.svg";
import ShareIcon from "@/assets/images/ic_header.svg";
import IcHeart from "@/assets/images/ic_hrt.svg";
import IcSend from "@/assets/images/ic_send.svg";
import NextLgIcon from "@/assets/images/icon_next_lg.svg";
import IcComment from "@/assets/images/material-symbols-light_reply-rounded.svg";
import { PollSection } from "@/components/ui/community/PollSection";
import TopicDetail from "@/components/ui/community/TopicDetail";
import { Header } from "@/components/ui/Header";
import { HorizontalLine } from "@/components/ui/HorizontalLine";
import PostModal from "@/components/ui/modal/PostModal";
import { typography } from "@/styles/typography";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function PostScreen() {
  const router = useRouter();
  const [selectedPoll, setSelectedPoll] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [likedComments, setLikedComments] = useState<{
    [key: string]: boolean;
  }>({});
  const [isVisible, setIsVisible] = useState(false);
  const [commentText, setCommentText] = useState("");
  const pollLabels = ["매도", "보유", "매수"];
  const pollResults = [20, 20, 15]; // 각 항목 비율(%)
  const pollTotalCount = pollResults.reduce((acc, val) => acc + val, 0);

  const postId = 1;

  const handlePostUpdate = () => {
    router.push({
      pathname: "/(tabs)/community/writeForm",
      // params: {
      //   postId: post.id.toString(),
      //   editTitle: post.postTitle,
      //   editContent: post.postContent,
      //   editHasVoted: post.hasVote?.toString(),
      //   editArticleUrl: post.articleUrl,
      //   editThema: post.thema,
      //   category: post.categoryName,
      // },
    });
  };

  const handlePostDelete = async () => {
    try {
      await deletePostbyId(postId);
      Toast.show({ type: "success", text1: "글이 삭제되었어요" });
      router.replace("/(tabs)/community"); // 목록으로 이동
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "삭제 실패",
        text2: "다시 시도해주세요",
      });
    }
  };

  const opinionTheme: Record<
    string,
    {
      dotColor: string;
      labelColor: string;
      barColor: string;
      bgColor: string;
      textColor: string;
      icon: (color: string) => React.ReactNode;
    }
  > = {
    매도: {
      dotColor: "#4880EE",
      labelColor: "#4880EE",
      barColor: "#4880EE",
      bgColor: "#EDF3FF",
      textColor: "#3366CC",
      icon: (color: string) => (
        <SellIcon width={20} height={20} fill={color} stroke={color} />
      ),
    },
    보유: {
      dotColor: "#9CA3AF",
      labelColor: "#6B7280",
      barColor: "#9CA3AF",
      bgColor: "#F3F4F6",
      textColor: "#000000ff",
      icon: (color: string) => (
        <HoldIcon width={20} height={20} fill={color} stroke={color} />
      ),
    },
    매수: {
      dotColor: "#EF4444",
      labelColor: "#EF4444",
      barColor: "#EF4444",
      bgColor: "#FFE4E5",
      textColor: "#B91C1C",
      icon: (color: string) => (
        <BuyIcon width={20} height={20} fill={color} stroke={color} />
      ),
    },
  };

  const opinionBgColors: Record<string, string> = {
    매도: "#EDF3FF",
    보유: "#F3F4F6",
    매수: "#FEE2E2",
  };

  const pollBgColor = "#F4F5F7";

  const comments = Array.from({ length: 10 }, (_, i) => ({
    id: i.toString(),
    user: "테이비",
    time: "16시간 전",
    content:
      "유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다. 유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다.",
    opinion: "매수",
    replies: [
      {
        id: `${i}-r1`,
        user: "테이비",
        time: "16시간 전",
        content: "유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다",
        opinion: "매도",
      },
      {
        id: `${i}-r2`,
        user: "테이비",
        time: "16시간 전",
        content:
          "유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다. 유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다. 유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다.유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다",
        opinion: "매수",
      },
    ],
  }));
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <Header
          title=""
          leftSlot={<NextLgIcon onPress={() => router.back()} />}
          rightSlot={
            <>
              <ShareIcon />
              <Pressable
                onPress={() => {
                  setIsVisible(true);
                }}
              >
                <EtcVerIcon />
              </Pressable>
            </>
          }
        />
        <ScrollView>
          <View style={styles.content}>
            <TopicDetail
              isList={false}
              hasNews
              item={{
                username: "홍길동",
                time: "2시간 전",
                category: "스타트업",
                title: "요즘 스타트업 근무 환경 어때요?",
                content:
                  "유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다 유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다 유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다 유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다",
                likes: 8,
                views: 25,
                comments: 3,
              }}
            />
          </View>

          <HorizontalLine height={8} />

          <View style={styles.content}>
            <PollSection
              pollLabels={pollLabels}
              pollResults={pollResults}
              pollTotalCount={pollTotalCount}
              opinionTheme={opinionTheme}
              selectedPoll={selectedPoll}
              hasVoted={hasVoted}
              onSelectPoll={(idx) => {
                setSelectedPoll(idx);
                setHasVoted(true);
              }}
            />
          </View>

          <HorizontalLine height={8} />

          <View style={styles.content}>
            <View style={styles.commentSection}>
              <View style={styles.commentContainer}>
                <Text style={styles.commentText}>댓글</Text>
                <Text style={styles.commentCount}>{comments.length}</Text>
              </View>

              {comments.map((comment) => (
                <View key={comment.id} style={styles.commentBox}>
                  <View style={styles.commentHeader}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        flex: 1,
                      }}
                    >
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
                            color: opinionTheme[comment.opinion].textColor,
                            fontSize: 12,
                            fontWeight: "400",
                            fontFamily: "Pretendard",
                            lineHeight: 14,
                          }}
                        >
                          {comment.opinion}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <Text style={[styles.commentContent, { paddingLeft: 40 }]}>
                    {comment.content}
                  </Text>

                  <View style={[styles.commentActions, { paddingLeft: 40 }]}>
                    <View style={{ flexDirection: "row", gap: 12 }}>
                      <View style={styles.iconWithText}>
                        <IcHeart
                          width={24}
                          height={24}
                          stroke={
                            likedComments[comment.id] ? "#FF5A5F" : "#C4C4C4"
                          }
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
                    <TouchableOpacity style={{ marginLeft: "auto" }}>
                      <IcComntEtc width={20} height={20} />
                    </TouchableOpacity>
                  </View>

                  {comment.replies && comment.replies.length > 0 && (
                    <View
                      style={{
                        backgroundColor: "#F4F5F7",
                        borderRadius: 4,
                        paddingHorizontal: 16,
                        paddingTop: 16,
                        paddingBottom: 12,
                        marginTop: 12,
                      }}
                    >
                      {comment.replies.map((reply) => (
                        <View key={reply.id} style={styles.replyBox}>
                          <View style={styles.commentHeader}>
                            <View style={styles.commentUserIcon} />
                            <View>
                              <Text style={styles.commentUser}>
                                {reply.user}
                              </Text>
                              <Text style={styles.commentTime}>
                                {reply.time}
                              </Text>
                            </View>
                            <View
                              style={[
                                styles.positiveTag,
                                {
                                  backgroundColor:
                                    opinionBgColors[reply.opinion] ||
                                    pollBgColor,
                                },
                              ]}
                            >
                              <Text
                                style={{
                                  color: opinionTheme[reply.opinion].textColor,
                                  fontSize: 12,
                                  fontWeight: "400",
                                  fontFamily: "Pretendard",
                                  lineHeight: 14,
                                }}
                              >
                                {reply.opinion}
                              </Text>
                            </View>
                          </View>

                          <Text
                            style={[styles.commentContent, { paddingLeft: 40 }]}
                          >
                            {reply.content}
                          </Text>

                          <View style={styles.commentActions}>
                            <View
                              style={[styles.iconWithText, { paddingLeft: 36 }]}
                            >
                              <IcHeart
                                width={24}
                                height={24}
                                stroke={
                                  likedComments[comment.id]
                                    ? "#FF5A5F"
                                    : "#C4C4C4"
                                }
                              />

                              <Text style={styles.commentActionText}>
                                {likedComments[reply.id] ? 11 : 10}
                              </Text>
                            </View>
                            <TouchableOpacity style={{ marginLeft: "auto" }}>
                              <IcComntEtc width={20} height={20} />
                            </TouchableOpacity>
                          </View>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.commentInputContainer}>
          <View style={styles.commentInputBox}>
            <View style={styles.avatarCircle} />
            <TextInput
              style={styles.textInput}
              placeholder="댓글을 입력하세요"
              placeholderTextColor="#9CA3AF"
              value={commentText}
              onChangeText={setCommentText}
            />
            <TouchableOpacity>
              <IcSend width={20} height={20} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <PostModal
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        onSelect={(action) => {
          if (action === "update") {
            handlePostUpdate();
          } else if (action === "delete") {
            handlePostDelete();
          }
          setIsVisible(false);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 20 },

  commentSection: {
    marginTop: 8,
  },
  commentTitle: { fontSize: 15, fontWeight: "bold", marginBottom: 12 },
  commentBox: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#F0F0F0",
    marginBottom: 16,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ddd",
    marginRight: 8,
  },
  commentUser: { fontWeight: "bold", fontSize: 14 },
  commentTime: { fontSize: 12, color: "#999" },
  commentContent: { fontSize: 14, color: "#333", marginTop: 4 },
  commentActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 6,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  actionText: { fontSize: 12, color: "#6B7280" },
  commentInputContainer: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#fff",
  },
  commentInputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 999,
    paddingHorizontal: 12,
    gap: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 8,
    color: "#111",
  },

  iconWithText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 0,
  },

  commentActionText: {
    fontSize: 12,
    color: "#6B7280",
  },
  replyBox: {
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    paddingTop: 16,
    paddingBottom: 12,
    paddingHorizontal: 0,
    marginLeft: 0,
  },
  commentUserIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#dcdcdc",
    marginRight: 8,
  },
  commentContainer: {
    paddingBottom: 20,
    flexDirection: "row",
    gap: 8,
  },
  commentText: {
    ...typography.label_l2_13_medium,
  },
  commentCount: {
    ...typography.label_l1_14_regular,
  },
  positiveTag: {
    marginLeft: "auto",
    borderRadius: 4,
    padding: 4,
  },
});
