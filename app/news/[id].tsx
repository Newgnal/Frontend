import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// API
import {
  deleteComment,
  getComments,
  postComment,
  postReply,
  toggleLikeComment,
  updateComment,
} from "@/api/newscommentApi";
import { getNewsById } from "@/api/useNewsApi";
import { postVote } from "@/api/useVoteApi";

// Components
import CommentSection from "@/app/news/CommentSection";
import NewsContent from "@/app/news/NewsContent";
import NewsHeader from "@/app/news/NewsHeader";
import VoteSection from "@/app/news/PollSection";
import CommentOptionModal from "@/components/ui/modal/CommentOptionModal";
import OptionSelectModal from "@/components/ui/modal/OptionSelectModal";
import ReportOptionModal from "@/components/ui/modal/ReportConfirmModal";

// Types
import { NewsItem } from "@/types/news";
import { CommentItem } from "@/types/newscomment";
import { VoteType } from "@/types/vote";

type Comment = {
  id: number;
  user: string;
  time: string;
  content: string;
  opinion: string;
  replies: Comment[];
};

// ======== Constants ========
const pollLabels = ["강한 부정", "약한 부정", "중립", "약한 긍정", "강한 긍정"];

const opinionTheme = {
  "강한 부정": {
    dotColor: "#F99426",
    labelColor: "#F99426",
    barColor: "#F99426",
    tagBgColor: "#FFF3E0",
    tagTextColor: "#F99426",
  },
  "약한 부정": {
    dotColor: "#FCCE8B",
    labelColor: "#F99426",
    barColor: "#FCCE8B",
    tagBgColor: "#FFF3E0",
    tagTextColor: "#F99426",
  },
  중립: {
    dotColor: "#5E6974",
    labelColor: "#484F56",
    barColor: "#E4E6E7",
    tagBgColor: "#E4E6E7",
    tagTextColor: "#484F56",
  },
  "약한 긍정": {
    dotColor: "#73FFCB",
    labelColor: "#04E38F",
    barColor: "#B0FFE1",
    tagBgColor: "#E0FFF3",
    tagTextColor: "#00BD73",
  },
  "강한 긍정": {
    dotColor: "#04E38F",
    labelColor: "#04E38F",
    barColor: "#04E38F",
    tagBgColor: "#D6FFEF",
    tagTextColor: "#00BD73",
  },
};

const opinionBgColors = {
  "강한 부정": "#FFF1E6",
  "약한 부정": "#FFF7E8",
  중립: "#E4E6E7",
  "약한 긍정": "#E0FFF3",
  "강한 긍정": "#D6FFEF",
};

// ======== Util ========
const mapVoteTypeToLabel = (voteType: string) => {
  switch (voteType) {
    case "STRONGLY_POSITIVE":
      return "강한 긍정";
    case "POSITIVE":
      return "약한 긍정";
    case "NEGATIVE":
      return "약한 부정";
    case "STRONGLY_NEGATIVE":
      return "강한 부정";
    default:
      return "중립";
  }
};

function nestComments(flat: CommentItem[]) {
  const commentMap: {
    [key: number]: CommentItem & { replies: CommentItem[] };
  } = {};
  const rootComments: CommentItem[] = [];

  flat.forEach((comment) => {
    commentMap[comment.commentId] = { ...comment, replies: [] };
  });

  flat.forEach((comment) => {
    if (comment.parentId) {
      commentMap[comment.parentId]?.replies.push(commentMap[comment.commentId]);
    } else {
      rootComments.push(commentMap[comment.commentId]);
    }
  });

  return rootComments;
}

const adaptComment = (item: CommentItem): Comment => ({
  id: Number(item.commentId),
  user: item.nickName,
  time: item.timeAgo,
  content: item.comment,
  opinion: mapVoteTypeToLabel(item.voteType),
  replies: (item.replies ?? []).map(adaptComment),
});

export default function NewsDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const safeId = Array.isArray(id) ? id[0] : id;
  const newsId = Number(safeId);
  const VOTE_KEY = `vote-${id}`;

  // ========== State ==========
  const [news, setNews] = useState<NewsItem | null>(null);
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const [hasVoted, setHasVoted] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState<number | null>(null);
  const [pollResults, setPollResults] = useState<number[]>([0, 0, 0, 0, 0]);
  const [isVoteLoaded, setIsVoteLoaded] = useState(false);

  const [comments, setComments] = useState<Comment[] | undefined>(undefined);
  const [commentInput, setCommentInput] = useState("");
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);
  const [expandedComments, setExpandedComments] = useState<{
    [id: number]: boolean;
  }>({});
  const [likedCounts, setLikedCounts] = useState<{ [key: number]: number }>({});
  const [likedCommentIds, setLikedCommentIds] = useState<{
    [key: number]: boolean;
  }>({});

  const [isOptionModalVisible, setOptionModalVisible] = useState(false);
  const [isCommentOptionModalVisible, setCommentOptionModalVisible] =
    useState(false);
  const [isReportModalVisible, setReportModalVisible] = useState(false);

  // ========== Ref ==========
  const scrollRef = useRef<ScrollView>(null);
  const pollRef = useRef<View>(null);
  const commentRef = useRef<View>(null);

  // ========== useEffect ==========
  useEffect(() => {
    getNewsById(safeId).then((res) => console.log("응답 view 수:", res?.view));
  }, [safeId]);

  useEffect(() => {
    const fetchNews = async () => {
      const res = await getNewsById(safeId);
      setNews(res);
    };
    fetchNews();
  }, [safeId]);

  useEffect(() => {
    if (!news?.contentUrl) return;
    fetch(news.contentUrl)
      .then((res) => res.text())
      .then(setHtmlContent)
      .catch((e) => console.error("본문 HTML 불러오기 실패", e));
  }, [news]);

  useEffect(() => {
    if (!news?.imageUrl) return;
    Image.getSize(news.imageUrl, (w, h) => {
      const screenWidth = Dimensions.get("window").width - 32;
      const ratio = screenWidth / w;
      setImageSize({ width: screenWidth, height: h * ratio });
    });
  }, [news?.imageUrl]);

  useEffect(() => {
    const loadVoteStatus = async () => {
      try {
        const storedVote = await AsyncStorage.getItem(VOTE_KEY);
        if (storedVote !== null) {
          const parsed = JSON.parse(storedVote);
          setHasVoted(true);
          setSelectedPoll(parsed.selectedPoll);
          setPollResults(parsed.pollResults);
        }
      } catch (e) {
        console.error("투표 상태 불러오기 실패", e);
      } finally {
        setIsVoteLoaded(true);
      }
    };
    loadVoteStatus();
  }, [VOTE_KEY]);

  useEffect(() => {
    if (!newsId || isNaN(newsId)) return;
    fetchComments();
  }, [newsId]);

  const fetchComments = async () => {
    try {
      const res = await getComments(newsId);
      console.log("댓글 API 전체 응답:", JSON.stringify(res.data, null, 2));

      const raw = res.data.data.comments || [];

      // 중첩 처리 함수 제거하고 바로 적응 함수만 적용
      const adapted = raw.map(adaptComment);
      setComments(adapted);
    } catch (e) {
      console.error("댓글 불러오기 실패", e);
    }
  };

  const handlePostComment = async (
    newsId: number,
    content: string,
    voteType: string = "NEUTRAL"
  ) => {
    try {
      await postComment(newsId, content, voteType);
      fetchComments();
      setCommentInput("");
    } catch (e) {
      console.error(" 댓글 등록 실패", e);
    }
  };

  const handleEditComment = async (commentId: number, newContent: string) => {
    try {
      await updateComment(commentId, { comment: newContent, newsId });
      fetchComments();
      setCommentInput("");
      setIsEditing(false);
      setSelectedCommentId(null);
      setCommentOptionModalVisible(false);
    } catch (e) {
      console.error(" 댓글 수정 실패", e);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      fetchComments();
      setCommentOptionModalVisible(false);
      setCommentInput("");
      setSelectedCommentId(null);
      setIsEditing(false);
    } catch (e) {
      console.error(" 댓글 삭제 실패", e);
    }
  };

  const handlePostReply = async (parentId: number, replyText: string) => {
    try {
      const payload = {
        parentId,
        comment: replyText,
        newsId,
        voteType: "NEUTRAL",
      };
      console.log("📨 postReply payload", payload);

      await postReply(payload);
      fetchComments();
    } catch (e) {
      console.error(" 답글 등록 실패", e);
    }
  };

  const toggleLike = async (commentId: number) => {
    try {
      const res = await toggleLikeComment(commentId);

      const { isLiked, likeCount } = res.data.data;
      console.log("res.data:", res.data);
      console.log("res.data.data:", res.data.data);

      console.log(" 서버 응답 isLiked:", isLiked, "likeCount:", likeCount);

      setLikedCommentIds((prev) => {
        const updated = { ...prev, [commentId]: isLiked };
        console.log(" setLikedCommentIds 결과:", updated);
        return updated;
      });

      setLikedCounts((prev) => {
        const updated = { ...prev, [commentId]: likeCount };
        console.log(" setLikedCounts 결과:", updated);
        return updated;
      });
    } catch (e) {
      console.error(" 좋아요 토글 실패", e);
    }
  };

  const handleVote = async (selectedIndex: number) => {
    const voteMap: VoteType[] = [
      "STRONGLY_NEGATIVE",
      "NEGATIVE",
      "NEUTRAL",
      "POSITIVE",
      "STRONGLY_POSITIVE",
    ];
    try {
      const response = await postVote({
        newsId,
        voteType: voteMap[selectedIndex],
      });
      const resultArray = [
        response.stronglyNegativeCount,
        response.negativeCount,
        response.neutralCount,
        response.positiveCount,
        response.stronglyPositiveCount,
      ];
      setPollResults(resultArray);
      setHasVoted(true);
      setSelectedPoll(selectedIndex);
      await AsyncStorage.setItem(
        VOTE_KEY,
        JSON.stringify({
          selectedPoll: selectedIndex,
          pollResults: resultArray,
        })
      );
    } catch (e) {
      console.error("투표 실패", e);
    }
  };

  // ========== UI ==========
  if (!news) return <Text>뉴스를 찾을 수 없습니다</Text>;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          ref={scrollRef}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <NewsHeader
            source={news.source}
            title={news.title}
            date={news.date}
            pollCount={pollResults.reduce((a, b) => a + b, 0)}
            commentCount={comments?.length || 0}
            onBack={() => router.back()}
            onOpenOption={() => setOptionModalVisible(true)}
            onPressPoll={() =>
              pollRef.current?.measure((_, __, ___, ____, ___px, py) => {
                scrollRef.current?.scrollTo({ y: py - 60, animated: true });
              })
            }
            onPressComment={() =>
              commentRef.current?.measure((_, __, ___, ____, ___px, py) => {
                scrollRef.current?.scrollTo({ y: py - 60, animated: true });
              })
            }
          />

          <NewsContent
            summary={news.summary}
            htmlContent={htmlContent}
            imageUrl={news.imageUrl}
            imageCaption={news.imageCaption}
            imageSize={imageSize}
          />

          <View ref={pollRef}>
            <VoteSection
              thema={news.thema}
              hasVoted={hasVoted}
              isVoteLoaded={isVoteLoaded}
              selectedPoll={selectedPoll}
              pollResults={pollResults}
              onVote={handleVote}
              pollLabels={pollLabels}
              opinionTheme={opinionTheme}
            />
          </View>

          <CommentSection
            ref={commentRef}
            comments={comments ?? []}
            commentInput={commentInput}
            setCommentInput={setCommentInput}
            onPostComment={handlePostComment}
            onOpenOption={() => setCommentOptionModalVisible(true)}
            onSelectComment={setSelectedCommentId}
            isEditing={isEditing}
            selectedCommentId={selectedCommentId}
            onEditComment={handleEditComment}
            setIsEditing={setIsEditing}
            newsId={newsId}
            onDeleteComment={handleDeleteComment}
            onPostReply={handlePostReply}
            onToggleLike={toggleLike}
            likedCounts={likedCounts}
            likedCommentIds={likedCommentIds}
            opinionTheme={opinionTheme}
            opinionBgColors={opinionBgColors}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <OptionSelectModal
        isVisible={isOptionModalVisible}
        onClose={() => setOptionModalVisible(false)}
        onFeedbackPress={() => console.log("피드백 보내기 클릭됨")}
      />
      <CommentOptionModal
        isVisible={isCommentOptionModalVisible}
        onClose={() => setCommentOptionModalVisible(false)}
        onEdit={() => {
          const target = comments?.find((c) => c.id === selectedCommentId);
          if (target) {
            setCommentInput(target.content);
            setIsEditing(true);
            setCommentOptionModalVisible(false);
            commentRef.current?.measure((_, __, ___, ____, ___px, py) => {
              scrollRef.current?.scrollTo({ y: py - 60, animated: true });
            });
          }
        }}
        onDelete={() => {
          if (selectedCommentId) handleDeleteComment(selectedCommentId);
        }}
      />
      <ReportOptionModal
        isVisible={isReportModalVisible}
        onClose={() => setReportModalVisible(false)}
        onReport={() => console.log("신고하기")}
      />
    </SafeAreaView>
  );
}
