import { deletePostById, getPostById, reportPostById } from "@/api/postApi";
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
import ReportOptionModal from "@/components/ui/modal/ReportConfirmModal";
import { typography } from "@/styles/typography";
import { convertThemaToKor } from "@/utils/convertThemaToKor";
import { getTimeAgo } from "@/utils/getTimeAgo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
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

interface Reply {
  replyId: number;
  replyContent: string;
  nickname: string;
  createdAt: string;
  voteType?: "BUY" | "SELL" | "HOLD";
  likeCount: number;
}

interface Post {
  postId: number;
  postTitle: string;
  postContent: string;
  articleUrl: string;
  likeCount: number;
  thema: string;
  nickname: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  hasVote: boolean;
  viewCount: number;
  commentCount: number;
}

interface Comment {
  commentId: number;
  commentContent: string;
  likeCount: number;
  voteType?: "BUY" | "SELL" | "HOLD";
  nickname: string;
  createdAt: string;
  replies?: Reply[];
}

export default function PostScreen() {
  const { id } = useLocalSearchParams();
  const numericPostId = Number(id);

  const router = useRouter();

  // console.log("받은 postId:", id);

  const [post, setPost] = useState<Post | null>(null);
  const [vote, setVote] = useState<any | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedPoll, setSelectedPoll] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [likedComments, setLikedComments] = useState<{
    [key: string]: boolean;
  }>({});
  const [isVisible, setIsVisible] = useState(false);
  const [modalType, setModalType] = useState<"post" | "report" | null>(null);
  const [commentText, setCommentText] = useState("");
  const pollLabels = ["매도", "보유", "매수"];
  const pollResults = [20, 20, 15]; // 각 항목 비율(%)
  const pollTotalCount = pollResults.reduce((acc, val) => acc + val, 0);

  // useAuth();
  useEffect(() => {
    if (!numericPostId || isNaN(numericPostId)) return;
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await getPostById(numericPostId);
        // console.log("getPostById 응답:", res);
        setPost(res.data.post);
        setVote(res.data.vote);
        setComments(res.data.comments);
      } catch (err) {
        // console.error("게시글 조회 실패:", err);
        Toast.show({
          type: "error",
          text1: "게시글 조회 실패",
          text2: "잠시 후 다시 시도해주세요",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [numericPostId]);

  const handlePostUpdate = () => {
    if (!post) return;
    // console.log("editHasVoted:", hasVoted);
    router.push({
      pathname: "/(tabs)/community/writeForm",
      params: {
        postId: post.postId.toString(),
        editTitle: post.postTitle,
        editContent: post.postContent,
        editArticleUrl: post.articleUrl,
        editThema: convertThemaToKor(post.thema),
        editVoteEnabled: post.hasVote.toString(),
        mode: "edit",
      },
    });
  };

  const handlePostDelete = async () => {
    try {
      await deletePostById(numericPostId);
      Toast.show({ type: "success", text1: "글이 삭제되었어요" });
      router.replace("/(tabs)/community");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "삭제 실패",
        text2: "다시 시도해주세요",
      });
    }
  };

  const handleReport = async () => {
    if (!post?.postId) return;
    try {
      await reportPostById(post.postId);
    } catch (error) {
      console.error("신고 실패:", error);
      Toast.show({
        type: "error",
        text1: "신고 실패",
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

  if (loading || !post) {
    return <Text>로딩 중...</Text>;
  }

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
                  //   if (post.nickname === myNickname) {
                  //     setModalType("post");
                  //   } else {
                  //     setModalType("report");
                  //   }
                  //   setIsVisible(true);
                  // }}
                  setModalType("report");
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
                postId: post.postId,
                nickname: post.nickname,
                createdAt: post.createdAt,
                thema: post.thema,
                postTitle: post.postTitle,
                postContent: post.postContent,
                likeCount: post.likeCount,
                viewCount: post.viewCount,
                commentCount: post.commentCount,
              }}
            />
          </View>

          <HorizontalLine height={8} />
          {post.hasVote && (
            <>
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
            </>
          )}
          <View style={styles.content}>
            <View style={styles.commentSection}>
              <View style={styles.commentContainer}>
                <Text style={styles.commentText}>댓글</Text>
                <Text style={styles.commentCount}>{post.commentCount}</Text>
              </View>

              {comments.map((comment) => (
                <View key={comment.commentId} style={styles.commentBox}>
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
                        <Text style={styles.commentUser}>
                          {comment.nickname}
                        </Text>
                        <Text style={styles.commentTime}>
                          {getTimeAgo(comment.createdAt)}
                        </Text>
                      </View>
                      {comment.voteType ? (
                        <View
                          style={[
                            styles.positiveTag,
                            {
                              backgroundColor:
                                opinionBgColors[comment.voteType] ||
                                pollBgColor,
                            },
                          ]}
                        >
                          <Text
                            style={{
                              color: opinionTheme[comment.voteType].textColor,
                              fontSize: 12,
                              fontWeight: "400",
                              fontFamily: "Pretendard",
                              lineHeight: 14,
                            }}
                          >
                            {comment.voteType}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  </View>

                  <Text style={[styles.commentContent, { paddingLeft: 40 }]}>
                    {comment.commentContent}
                  </Text>

                  <View style={[styles.commentActions, { paddingLeft: 40 }]}>
                    <View style={{ flexDirection: "row", gap: 8 }}>
                      <View style={styles.iconWithText}>
                        <IcHeart
                          width={24}
                          height={24}
                          stroke={
                            likedComments[comment.commentId]
                              ? "#FF5A5F"
                              : "#C4C4C4"
                          }
                        />
                        <Text style={styles.commentActionText}>
                          {/* {likedComments[comment.commentId] ? 11 : 10} */}
                          {likedComments[comment.commentId] ??
                            comment.likeCount}
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
                      {comment.replies.map((reply: Reply) => (
                        <View key={reply.replyId} style={styles.replyBox}>
                          <View style={styles.commentHeader}>
                            <View style={styles.commentUserIcon} />
                            <View>
                              <Text style={styles.commentUser}>
                                {reply.nickname}
                              </Text>
                              <Text style={styles.commentTime}>
                                {getTimeAgo(reply.createdAt)}
                              </Text>
                            </View>
                            {reply.voteType ? (
                              <View
                                style={[
                                  styles.positiveTag,
                                  {
                                    backgroundColor:
                                      opinionBgColors[reply.voteType] ||
                                      pollBgColor,
                                  },
                                ]}
                              >
                                <Text
                                  style={{
                                    color:
                                      opinionTheme[reply.voteType].textColor,
                                    fontSize: 12,
                                    fontWeight: "400",
                                    fontFamily: "Pretendard",
                                    lineHeight: 14,
                                  }}
                                >
                                  {reply.voteType}
                                </Text>
                              </View>
                            ) : null}
                          </View>

                          <Text
                            style={[styles.commentContent, { paddingLeft: 40 }]}
                          >
                            {reply.replyContent}
                          </Text>

                          <View style={styles.commentActions}>
                            <View
                              style={[styles.iconWithText, { paddingLeft: 36 }]}
                            >
                              <IcHeart
                                width={24}
                                height={24}
                                stroke={
                                  likedComments[comment.commentId]
                                    ? "#FF5A5F"
                                    : "#C4C4C4"
                                }
                              />

                              <Text style={styles.commentActionText}>
                                {likedComments[reply.replyId] ??
                                  reply.likeCount}
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
      {modalType === "post" && (
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
      )}
      {modalType === "report" && (
        <ReportOptionModal
          isVisible={isVisible}
          onClose={() => setIsVisible(false)}
          onReport={handleReport}
        />
      )}
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
  commentUser: { ...typography.label_l2_13_medium, color: "#0E0F15" },
  commentTime: { ...typography.label_l3_13_regular, color: "#40454A" },
  commentContent: {
    ...typography.body_b3_14_regular,
    color: "#0E0F15",
    marginTop: 4,
  },
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
