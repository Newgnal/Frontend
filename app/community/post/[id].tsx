import {
  deleteCommentById,
  reportCommentById,
  toggleCommentLikeById,
  writeComment,
} from "@/api/commentPostApi";

import {
  deletePostById,
  getPostById,
  reportPostById,
  togglePostLikeById,
} from "@/api/postApi";
import {
  deleteReplyById,
  reportReplyById,
  toggleReplyLikeById,
  writeReply,
} from "@/api/replyPostApi";
import { getNewsById } from "@/api/useNewsApi";
import { votePost } from "@/api/votePostApi";
import IcComntEtc from "@/assets/images/ic_cmnt_etc (1).svg";
import EtcVerIcon from "@/assets/images/ic_cmnt_etc_ver.svg";
import HoldIcon from "@/assets/images/ic_com_poll.svg";
import BuyIcon from "@/assets/images/ic_com_poll_buy.svg";
import SelectedBuyIcon from "@/assets/images/ic_com_poll_buy_selected.svg";
import SelectedHoldIcon from "@/assets/images/ic_com_poll_hold_selected.svg";
import SellIcon from "@/assets/images/ic_com_poll_sell.svg";
import SelectedSellIcon from "@/assets/images/ic_com_poll_sell_selected.svg";
import ShareIcon from "@/assets/images/ic_header.svg";
import IcHeart from "@/assets/images/ic_hrt.svg";
import HeartFilledIcon from "@/assets/images/ic_hrt_filled.svg";
import IcSend from "@/assets/images/ic_send.svg";
import NextLgIcon from "@/assets/images/icon_next_lg.svg";
import IcComment from "@/assets/images/material-symbols-light_reply-rounded.svg";
import { PollSection } from "@/components/ui/community/PollSection";
import TopicDetail from "@/components/ui/community/TopicDetail";
import { Header } from "@/components/ui/Header";
import { HorizontalLine } from "@/components/ui/HorizontalLine";
import PostModal from "@/components/ui/modal/PostModal";
import ReportOptionModal from "@/components/ui/modal/ReportConfirmModal";
import { useAuth } from "@/context/authContext";
import { typography } from "@/styles/typography";
import { convertThemaToKor } from "@/utils/convertThemaToKor";
import { formatDate } from "@/utils/formatDate";
import { getTimeAgo } from "@/utils/getTimeAgo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
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

// ----------------- 인터페이스 ---------------------

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
  newsId?: string;
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
  editNewsSource?: string;
  editNewsSentiment?: string;
  editNewsCategory?: string;
  editNewsImageUrl?: string;
  editNewsTitle?: string;
  editNewsDate?: string;
  isLiked?: boolean; // 현재 사용자가 게시물에 좋아요를 눌렀는지 여부
}

interface Comment {
  commentId: number;
  commentContent: string;
  likeCount: number;
  voteType: "BUY" | "SELL" | "HOLD" | null | undefined;
  nickname: string;
  createdAt: string;
  replies?: Reply[];
}

export default function PostScreen() {
  const { id } = useLocalSearchParams();
  const numericPostId = Number(id);

  const router = useRouter();

  // ----------------- 상태 관리 ---------------------

  const [post, setPost] = useState<Post | null>(null);
  const [news, setNews] = useState<any | null>(null);
  // const [vote, setVote] = useState<any | null>(null); // 사용되지 않아 주석 처리
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasEnteredPost, setHasEnteredPost] = useState(false); // useRef로 변경 고려

  const [likedPost, setLikedPost] = useState<boolean>(false);

  const [likedComments, setLikedComments] = useState<{
    [key: string]: boolean;
  }>({});

  const [isVisible, setIsVisible] = useState(false);

  const [commentText, setCommentText] = useState(""); // 입력창 상태
  const [replyTargetId, setReplyTargetId] = useState<null | number>(null);

  const [reportTargetReplyId, setReportTargetReplyId] = useState<number | null>(
    null
  );
  const [reportTargetCommentId, setReportTargetCommentId] = useState<
    number | null
  >(null);

  const [modalType, setModalType] = useState<
    | "post"
    | "report"
    | "reply"
    | "replyReport"
    | "comment"
    | "commentReport"
    | null
  >(null);

  const { nickName: myNickname } = useAuth();

  const convertEngToKorVoteType = (
    engType: "BUY" | "SELL" | "HOLD" | null | undefined
  ) => {
    switch (engType) {
      case "BUY":
        return "매수";
      case "SELL":
        return "매도";
      case "HOLD":
        return "보유";
      default:
        return "";
    }
  };

  // ----------------- 투표 관련 변수 -------------------

  const [vote, setVote] = useState<any>(null);
  const [selectedPoll, setSelectedPoll] = useState<
    "BUY" | "HOLD" | "SELL" | null
  >(null);

  const [hasVoted, setHasVoted] = useState(false); // 게시글이 투표 갖고있는지 여부
  const [userVoted, setUserVoted] = useState(false); // 사용자 투표 여부
  const pollLabels = ["매도", "보유", "매수"];

  // const pollResults = vote
  //   ? {
  //       SELL: vote.sellCount ?? 0,
  //       HOLD: vote.holdCount ?? 0,
  //       BUY: vote.buyCount ?? 0,
  //     }
  //   : {
  //       SELL: 25,
  //       HOLD: 35,
  //       BUY: 35,
  //     };
  const pollResults = useMemo(() => {
    return vote
      ? {
          SELL: vote.sellCount ?? 0,
          HOLD: vote.holdCount ?? 0,
          BUY: vote.buyCount ?? 0,
        }
      : {
          SELL: 25,
          HOLD: 40,
          BUY: 35,
        };
  }, [vote]);

  const pollTotalCount = pollResults.SELL + pollResults.HOLD + pollResults.BUY;

  // ----------------- 투표 스타일 ---------------------

  const opinionTheme: Record<
    string,
    {
      dotColor: string;
      labelColor: string;
      barColor: string;
      bgColor: string;
      textColor: string;
      selectedIcon: () => React.ReactNode;
      unselectedIcon: () => React.ReactNode;
    }
  > = {
    매도: {
      dotColor: "#4880EE",
      labelColor: "#4880EE",
      barColor: "#4880EE",
      bgColor: "#EDF3FF",
      textColor: "#3366CC",
      selectedIcon: () => <SelectedSellIcon width={20} height={20} />,
      unselectedIcon: () => <SellIcon width={20} height={20} />,
    },
    보유: {
      dotColor: "#9CA3AF",
      labelColor: "#6B7280",
      barColor: "#9CA3AF",
      bgColor: "#F3F4F6",
      textColor: "#000000ff",
      selectedIcon: () => (
        <SelectedHoldIcon
          width={20}
          height={20}
          fill="#000000ff"
          stroke="#000000ff"
        />
      ),
      unselectedIcon: () => (
        <HoldIcon width={20} height={20} fill="#9CA3AF" stroke="#9CA3AF" />
      ),
    },
    매수: {
      dotColor: "#EF4444",
      labelColor: "#EF4444",
      barColor: "#EF4444",
      bgColor: "#FFE4E5",
      textColor: "#B91C1C",
      selectedIcon: () => (
        <SelectedBuyIcon
          width={20}
          height={20}
          fill="#B91C1C"
          stroke="#B91C1C"
        />
      ),
      unselectedIcon: () => (
        <BuyIcon width={20} height={20} fill="#9CA3AF" stroke="#9CA3AF" />
      ),
    },
  };

  const opinionBgColors: Record<string, string> = {
    매도: "#EDF3FF",
    보유: "#F3F4F6",
    매수: "#FEE2E2",
  };

  const pollBgColor = "#F4F5F7";

  // 초기 Fetch

  useEffect(() => {
    if (!numericPostId || isNaN(numericPostId)) return;

    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await getPostById(numericPostId);

        setPost(res.data.post);
        setComments(res.data.comments);

        setVote(res.data.vote);
        if (res.data.vote) {
          setHasVoted(true);
          setSelectedPoll(res.data.vote.voteType);
          setUserVoted(res.data.vote.voteType !== null);
        }

        if (res.data.post.newsId) {
          try {
            const newsRes = await getNewsById(res.data.post.newsId);
            setNews(newsRes);
          } catch (e) {
            console.warn("뉴스 정보 불러오기 실패", e);
          }
        }

        console.log("post", post);
        console.log("comment", comments);
        console.log("vote", vote);
        console.log("vote.holdCount", vote?.holdCount);
        console.log("typeof", typeof vote?.holdCount);
        console.log("userVoted", userVoted);
        // setHasVoted(res.data.vote?.isVoted || false);
        // if (res.data.vote?.myVoteType) { // API 응답에 내 투표 타입 필드가 있을 경우에 이 코드 사용
        //         setSelectedPoll(res.data.vote.myVoteType);
        //       }

        // 화면에 표시될 조회수만 1 증가
        if (!hasEnteredPost) {
          setPost((prevPost) => {
            if (prevPost) {
              return {
                ...prevPost,
                viewCount: prevPost.viewCount + 1,
              };
            }
            return null;
          });
          setHasEnteredPost(true);
        }

        // setLikedPost(res.data.post.isLiked || false);
        setLikedPost(false);
      } catch (err) {
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
  }, [numericPostId, hasEnteredPost]);

  // ----------------- 핸들러 함수 ---------------------

  const handlePostLike = async () => {
    if (!post?.postId) return;
    try {
      const res = await togglePostLikeById(post.postId);

      // post의 likeCount 업데이트
      // 좋아요 증가 UI상으로만 반영(백엔드에 해당 로직 부재)
      setPost((prevPost) => {
        if (!prevPost) return null;

        const isCurrentlyLiked = likedPost;
        const newLikeCount = isCurrentlyLiked
          ? Math.max(prevPost.likeCount - 1, 0)
          : prevPost.likeCount + 1;

        return {
          ...prevPost,
          likeCount: newLikeCount,
        };
      });

      // likedPost 상태 업데이트
      // setLikedPost(res.liked);
      setLikedPost((prevLiked) => !prevLiked);
    } catch (err) {
      Toast.show({ type: "error", text1: "게시글 좋아요 실패" });
    }
  };

  const handlePostUpdate = () => {
    if (!post) return;
    router.push({
      pathname: "/(tabs)/community/writeForm",
      params: {
        postId: post.postId.toString(),
        editTitle: post.postTitle,
        editContent: post.postContent,
        editNewsId: post.newsId,
        editThema: convertThemaToKor(post.thema),
        editVoteEnabled: post.hasVote.toString(),
        editNewsSource: news.source,
        editNewsSentiment: String(Math.round(news.sentiment * 100) / 100),
        editNewsCategory: news.thema,
        editNewsImageUrl: news.imageUrl,
        editNewsTitle: news.title,
        editNewsDate: formatDate(news.date),
        mode: "edit",
      },
    });
    console.log(post.newsId);
  };

  const handlePostDelete = async () => {
    try {
      await deletePostById(numericPostId);
      Toast.show({ type: "success", text1: "글이 삭제되었어요" });
      router.replace("/(tabs)/community"); // 삭제 후 목록으로 이동
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "삭제 실패",
        text2: "다시 시도해주세요",
      });
    }
  };
  const numericCommentId = Number(reportTargetCommentId);
  const handleCommentDelete = async () => {
    try {
      await deleteCommentById(numericCommentId);
      Toast.show({ type: "success", text1: "글이 삭제되었어요" });
      refreshComments(); // 댓글 삭제 후 댓글 목록 갱신
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "삭제 실패",
        text2: "다시 시도해주세요",
      });
    }
  };

  const numericReplyId = Number(reportTargetReplyId);
  const handleReplyDelete = async () => {
    try {
      await deleteReplyById(numericReplyId);
      Toast.show({ type: "success", text1: "글이 삭제되었어요" });
      refreshComments(); // 대댓글 삭제 후 댓글 목록 갱신
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "삭제 실패",
        text2: "다시 시도해주세요",
      });
    }
  };

  const handlePostReport = async () => {
    if (!post?.postId) return;
    try {
      const res = await reportPostById(post.postId);

      if (!res.reported) {
        Toast.show({
          type: "success",
          text1: "신고가 접수되었어요",
        });
      } else {
        Toast.show({
          type: "info",
          text1: "이미 신고된 게시글이에요",
        });
      }
    } catch (error) {
      console.error("신고 실패:", error);
      Toast.show({
        type: "error",
        text1: "신고 실패",
        text2: "다시 시도해주세요",
      });
    } finally {
      setIsVisible(false);
    }
  };

  const handleCommentReport = async () => {
    if (reportTargetCommentId == null) return;
    try {
      const res = await reportCommentById(reportTargetCommentId);
      if (!res.reported) {
        Toast.show({
          type: "success",
          text1: "댓글이 신고되었어요",
        });
      } else {
        Toast.show({
          type: "info",
          text1: "이미 신고된 댓글이에요",
        });
      }
    } catch (err) {
      console.error("댓글 신고 실패", err);
      Toast.show({
        type: "error",
        text1: "신고 실패",
        text2: "다시 시도해주세요",
      });
    } finally {
      setIsVisible(false);
      setReportTargetCommentId(null);
    }
  };

  const handleReplyReport = async () => {
    if (reportTargetReplyId == null) return;
    try {
      const res = await reportReplyById(reportTargetReplyId);
      if (!res.reported) {
        Toast.show({
          type: "success",
          text1: "대댓글이 신고되었어요",
        });
      } else {
        Toast.show({
          type: "info",
          text1: "이미 신고된 대댓글이에요",
        });
      }
    } catch (err) {
      console.error("대댓글 신고 실패", err);
      Toast.show({
        type: "error",
        text1: "신고 실패",
        text2: "다시 시도해주세요",
      });
    } finally {
      setIsVisible(false);
      setReportTargetReplyId(null);
    }
  };

  const handleCommentLike = async (commentId: number) => {
    try {
      const res = await toggleCommentLikeById(commentId);
      // console.log(commentId);

      const isCurrentlyLiked = likedComments[`comment-${commentId}`] ?? false;

      setLikedComments((prev) => ({
        ...prev,
        [`comment-${commentId}`]: !isCurrentlyLiked,
      }));

      // likeCount 업데이트
      setComments((prev) =>
        prev.map((c) =>
          c.commentId === commentId
            ? {
                ...c,
                likeCount: isCurrentlyLiked
                  ? Math.max(0, c.likeCount - 1)
                  : c.likeCount + 1,
              }
            : c
        )
      );
    } catch (err) {
      Toast.show({ type: "error", text1: "댓글 좋아요 실패" });
      console.log("댓글 좋아요 실패", err);

      console.log(commentId);
      console.log(typeof commentId);
      // console.log("에러 응답:", err.response?.data);
    }
  };

  const handleReplyLike = async (replyId: number) => {
    try {
      const res = await toggleReplyLikeById(replyId);
      const isCurrentlyLiked = likedComments[`reply-${replyId}`] ?? false;

      setLikedComments((prev) => ({
        ...prev,
        [`reply-${replyId}`]: !isCurrentlyLiked,
      }));

      // 대댓글의 likeCount 업데이트
      setComments((prev) =>
        prev.map((comment) => ({
          ...comment,
          replies: comment.replies?.map((reply) =>
            reply.replyId === replyId
              ? {
                  ...reply,
                  likeCount: isCurrentlyLiked
                    ? Math.max(0, reply.likeCount - 1)
                    : reply.likeCount + 1,
                }
              : reply
          ),
        }))
      );
    } catch (err) {
      Toast.show({ type: "error", text1: "대댓글 좋아요 실패" });
      console.log(replyId);
      console.log(typeof replyId);
    }
  };

  const handleSubmit = async () => {
    if (!commentText.trim()) return;

    try {
      if (replyTargetId) {
        await writeReply(replyTargetId, { replyContent: commentText });
      } else {
        await writeComment(numericPostId, { comment: commentText });
      }
      setPost((prevPost) => {
        if (!prevPost) return null;
        return {
          ...prevPost,
          commentCount: prevPost.commentCount + 1,
        };
      });

      setCommentText("");
      setReplyTargetId(null);
      refreshComments();
    } catch (err) {
      Toast.show({ type: "error", text1: "작성 실패" });
    }
  };

  const refreshComments = async () => {
    try {
      const res = await getPostById(numericPostId);
      setComments(res.data.comments);
    } catch (e) {
      Toast.show({ type: "error", text1: "댓글을 불러오지 못했어요" });
    }
  };

  const handleVote = async (voteType: "BUY" | "HOLD" | "SELL") => {
    try {
      const updatedVote = await votePost({ postId: numericPostId, voteType });
      setVote(updatedVote);
      console.log(vote);

      setSelectedPoll(voteType);
      const newVotePost = await getPostById(numericPostId);
      setVote(newVotePost.data.vote);
      setUserVoted(true);
      console.log("투표 타입:", voteType);

      console.log("API 응답:", updatedVote);
      console.log("selectedPoll:", selectedPoll);

      console.log("hasVoted:", hasVoted);
    } catch (err) {
      Toast.show({ type: "error", text1: "투표 실패" });
      console.log(err);
    }
  };

  // ----------------- UI 렌더링 ---------------------

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
                  if (post.nickname === myNickname) {
                    setModalType("post");
                  } else {
                    setModalType("report");
                  }
                  setIsVisible(true);
                }}
              >
                <EtcVerIcon />
              </Pressable>
            </>
          }
        />
        {/* ------------------ 게시글 ------------------- */}
        <ScrollView>
          <View style={styles.content}>
            <TopicDetail
              isList={false}
              hasNews
              liked={likedPost}
              onTogglePostLike={handlePostLike}
              item={{
                postId: post.postId,
                newsId: post.newsId,
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

          {/* ------------------ 투표 --------------------- */}
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
                  userVoted={userVoted}
                  onSelectPoll={handleVote}
                />
              </View>
              <HorizontalLine height={8} />
            </>
          )}
          {/* -------------------- 댓글 -------------------- */}
          <View style={styles.content}>
            <View style={styles.commentSection}>
              <View style={styles.commentContainer}>
                <Text style={styles.commentText}>댓글</Text>
                <Text style={styles.commentCount}>{post.commentCount}</Text>
              </View>

              {comments.map((comment) => {
                const korVoteType =
                  comment.voteType ?? convertEngToKorVoteType(comment.voteType);
                return (
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
                        {comment.voteType && opinionTheme[korVoteType] ? (
                          <View
                            style={[
                              styles.positiveTag,
                              {
                                backgroundColor:
                                  opinionBgColors[korVoteType] || pollBgColor,
                              },
                            ]}
                          >
                            <Text
                              style={{
                                color: opinionTheme[korVoteType].textColor,
                                fontSize: 12,
                                fontWeight: "400",
                                fontFamily: "Pretendard",
                                lineHeight: 14,
                              }}
                            >
                              {comment.voteType && korVoteType}
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
                          <TouchableOpacity
                            onPress={() => {
                              handleCommentLike(comment.commentId);
                            }}
                          >
                            {likedComments[`comment-${comment.commentId}`] ? (
                              <HeartFilledIcon />
                            ) : (
                              <IcHeart />
                            )}
                          </TouchableOpacity>
                          <Text style={styles.commentActionText}>
                            {comment.likeCount}
                          </Text>
                        </View>
                        <View style={styles.iconWithText}>
                          <IcComment width={24} height={24} />
                          <TouchableOpacity
                            onPress={() => setReplyTargetId(comment.commentId)}
                          >
                            <Text style={styles.commentActionText}>
                              답글 달기
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={{ marginLeft: "auto" }}
                        onPress={() => {
                          setReportTargetCommentId(comment.commentId);
                          if (comment.nickname === myNickname) {
                            setModalType("comment");
                          } else {
                            setModalType("commentReport");
                          }
                          setIsVisible(true);
                        }}
                      >
                        <IcComntEtc width={20} height={20} />
                      </TouchableOpacity>
                    </View>

                    {/* -------------------- 대댓글 -------------------- */}
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
                        {comment.replies.map((reply: Reply) => {
                          const korVoteType =
                            reply.voteType ??
                            convertEngToKorVoteType(reply.voteType);

                          return (
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
                                {reply.voteType &&
                                opinionTheme[reply.voteType] ? (
                                  <View
                                    style={[
                                      styles.positiveTag,
                                      {
                                        backgroundColor:
                                          opinionBgColors[korVoteType] ||
                                          pollBgColor,
                                      },
                                    ]}
                                  >
                                    <Text
                                      style={{
                                        color:
                                          opinionTheme[korVoteType].textColor,
                                        fontSize: 12,
                                        fontWeight: "400",
                                        fontFamily: "Pretendard",
                                        lineHeight: 14,
                                      }}
                                    >
                                      {reply.voteType && korVoteType}
                                    </Text>
                                  </View>
                                ) : null}
                              </View>
                              <Text
                                style={[
                                  styles.commentContent,
                                  { paddingLeft: 40 },
                                ]}
                              >
                                {reply.replyContent}
                              </Text>

                              <View style={styles.commentActions}>
                                <View
                                  style={[
                                    styles.iconWithText,
                                    { paddingLeft: 36 },
                                  ]}
                                >
                                  <TouchableOpacity
                                    onPress={() =>
                                      handleReplyLike(reply.replyId)
                                    }
                                  >
                                    {likedComments[`reply-${reply.replyId}`] ? (
                                      <HeartFilledIcon />
                                    ) : (
                                      <IcHeart />
                                    )}
                                  </TouchableOpacity>

                                  <Text style={styles.commentActionText}>
                                    {reply.likeCount}
                                  </Text>
                                </View>
                                <TouchableOpacity
                                  style={{ marginLeft: "auto" }}
                                  onPress={() => {
                                    setReportTargetReplyId(reply.replyId);
                                    if (reply.nickname === myNickname) {
                                      setModalType("reply");
                                    } else {
                                      setModalType("replyReport");
                                    }
                                    setIsVisible(true);
                                  }}
                                >
                                  <IcComntEtc width={20} height={20} />
                                </TouchableOpacity>
                              </View>
                            </View>
                          );
                        })}
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>

        <View style={styles.commentInputContainer}>
          <View style={styles.commentInputBox}>
            <View style={styles.avatarCircle} />
            <TextInput
              style={styles.textInput}
              placeholder={
                replyTargetId ? "답글을 입력하세요..." : "댓글을 입력하세요..."
              }
              placeholderTextColor="#9CA3AF"
              value={commentText}
              onChangeText={setCommentText}
            />
            <TouchableOpacity onPress={handleSubmit}>
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
          modalType="post"
        />
      )}
      {modalType === "report" && (
        <ReportOptionModal
          isVisible={isVisible}
          onClose={() => setIsVisible(false)}
          onReport={handlePostReport}
        />
      )}

      {modalType === "reply" && (
        <PostModal
          isVisible={isVisible}
          onClose={() => setIsVisible(false)}
          onSelect={(action) => {
            if (action === "delete") {
              handleReplyDelete();
            }
            setIsVisible(false);
          }}
          modalType="reply"
        />
      )}

      {modalType === "replyReport" && (
        <ReportOptionModal
          isVisible={isVisible}
          onClose={() => setIsVisible(false)}
          onReport={handleReplyReport}
        />
      )}

      {modalType === "comment" && (
        <PostModal
          isVisible={isVisible}
          onClose={() => setIsVisible(false)}
          onSelect={(action) => {
            if (action === "delete") {
              handleCommentDelete();
            }
            setIsVisible(false);
          }}
          modalType="comment"
        />
      )}
      {modalType === "commentReport" && (
        <ReportOptionModal
          isVisible={isVisible}
          onClose={() => setIsVisible(false)}
          onReport={handleCommentReport}
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
