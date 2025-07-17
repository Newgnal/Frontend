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
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  deleteComment,
  getComments,
  postComment,
  updateComment,
} from "@/api/newscommentApi";
import { getNewsById } from "@/api/useNewsApi";
import { NewsItem } from "@/types/news";
import { CommentItem } from "@/types/newscomment";
import { VoteType } from "@/types/vote";

import CommentSection from "@/app/news/CommentSection";
import NewsContent from "@/app/news/NewsContent";
import NewsHeader from "@/app/news/NewsHeader";
import VoteSection from "@/app/news/PollSection";

import { postVote } from "@/api/useVoteApi";
import CommentOptionModal from "@/components/ui/modal/CommentOptionModal";
import OptionSelectModal from "@/components/ui/modal/OptionSelectModal";
import ReportOptionModal from "@/components/ui/modal/ReportConfirmModal";
type Reply = {
  id: string;
  user: string;
  time: string;
  content: string;
  opinion: string;
};

type Comment = {
  id: string;
  user: string;
  time: string;
  content: string;
  opinion: string;
  replies: Reply[];
};

export default function NewsDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [news, setNews] = useState<NewsItem | null>(null);
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const { width } = useWindowDimensions();
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const [hasVoted, setHasVoted] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState<number | null>(null);
  const [pollResults, setPollResults] = useState<number[]>([0, 0, 0, 0, 0]);
  const [isVoteLoaded, setIsVoteLoaded] = useState(false);

  const [likedComments, setLikedComments] = useState<{
    [key: string]: boolean;
  }>({});
  const [isOptionModalVisible, setOptionModalVisible] = useState(false);
  const [isCommentOptionModalVisible, setCommentOptionModalVisible] =
    useState(false);
  const [isReportModalVisible, setReportModalVisible] = useState(false);

  const [comments, setComments] = useState<Comment[] | undefined>(undefined);
  const [commentInput, setCommentInput] = useState("");
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);

  const scrollRef = useRef<ScrollView>(null);
  const pollRef = useRef<View>(null);
  const commentRef = useRef<View>(null);

  const VOTE_KEY = `vote-${id}`;

  useEffect(() => {
    if (!id) return;
    const fetchNews = async () => {
      const res = await getNewsById(id as string);
      setNews(res);
    };
    fetchNews();
  }, [id]);

  useEffect(() => {
    if (!news?.contentUrl) return;
    const fetchContentHtml = async () => {
      try {
        const res = await fetch(news.contentUrl);
        const html = await res.text();
        setHtmlContent(html);
      } catch (e) {
        console.error("본문 HTML 불러오기 실패", e);
      }
    };
    fetchContentHtml();
  }, [news]);

  useEffect(() => {
    if (!news?.imageUrl) return;
    Image.getSize(news.imageUrl, (w, h) => {
      const screenWidth = Dimensions.get("window").width - 32;
      const ratio = screenWidth / w;
      setImageSize({
        width: screenWidth,
        height: h * ratio,
      });
    });
  }, [news?.imageUrl]);

  useEffect(() => {
    if (!id) return;
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
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const fetchComments = async () => {
      try {
        const res = await getComments(Number(id));
        const commentArray = res.data?.data?.comments ?? [];
        const adapted = commentArray.map(adaptComment);
        setComments(adapted);
      } catch (e) {
        console.error("댓글 불러오기 실패", e);
      }
    };
    fetchComments();
  }, [id]);

  const adaptComment = (item: CommentItem): Comment => ({
    id: item.commentId.toString(),
    user: item.nickName,
    time: item.timeAgo,
    content: item.comment,
    opinion: mapVoteTypeToLabel(item.voteType),
    replies: [],
  });

  const handlePostComment = async () => {
    try {
      if (!id) return;
      const numericId = Number(Array.isArray(id) ? id[0] : id);
      if (isNaN(numericId)) return;

      await postComment(numericId, commentInput);
      const res = await getComments(numericId);
      const commentArray = res.data?.data?.comments ?? [];
      const adapted = commentArray.map(adaptComment);

      setComments(adapted);
      setCommentInput("");
    } catch (e) {
      console.error("댓글 작성 실패", e);
    }
  };

  const handleEditComment = async (
    commentId: string,
    newContent: string,
    newsId: number
  ) => {
    try {
      if (!newContent || newContent.trim() === "") {
        console.error("댓글 내용이 비어 있음");
        return;
      }

      if (!newsId || isNaN(newsId)) {
        console.error("유효하지 않은 뉴스 ID", newsId);
        return;
      }

      await updateComment(Number(commentId), {
        comment: newContent,
        newsId: newsId,
      });

      const refreshed = await getComments(newsId);
      const commentArray = refreshed.data?.data?.comments ?? [];
      const adapted = commentArray.map(adaptComment);
      setComments(adapted);
      setIsEditing(false);
      setCommentInput("");
      setSelectedCommentId(null);
      setCommentOptionModalVisible(false);
    } catch (e) {
      console.error(" 댓글 수정 실패", e);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    const currentNewsId = news?.newsId ?? Number(id);
    if (!currentNewsId) {
      return;
    }

    try {
      await deleteComment(Number(commentId));

      const res = await getComments(currentNewsId);
      const commentArray = res.data?.data?.comments ?? [];
      const adapted = commentArray.map(adaptComment);
      setComments(adapted);

      setCommentOptionModalVisible(false);
      setSelectedCommentId(null);
      setIsEditing(false);
      setCommentInput("");
    } catch (e) {}
  };

  const mapVoteTypeToLabel = (voteType: string) => {
    switch (voteType) {
      case "STRONGLY_POSITIVE":
        return "강한 긍정";
      case "POSITIVE":
        return "약한 긍정";
      case "NEUTRAL":
        return "중립";
      case "NEGATIVE":
        return "약한 부정";
      case "STRONGLY_NEGATIVE":
        return "강한 부정";
      default:
        return "중립";
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
    const voteType = voteMap[selectedIndex];

    try {
      const response = await postVote({ newsId: Number(id), voteType });
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
    } catch (error) {
      console.error("투표 실패", error);
    }
  };

  const toggleLike = (commentId: string) => {
    setLikedComments((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const pollLabels = [
    "강한 부정",
    "약한 부정",
    "중립",
    "약한 긍정",
    "강한 긍정",
  ];
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
            title={news.title}
            date={news.date}
            pollCount={pollResults.reduce((acc, val) => acc + val, 0)}
            commentCount={(comments ?? []).length}
            onBack={() => router.back()}
            onOpenOption={() => setOptionModalVisible(true)}
            onPressPoll={() =>
              pollRef.current?.measure((_, __, ___, ____, px, py) => {
                scrollRef.current?.scrollTo({ y: py - 60, animated: true });
              })
            }
            onPressComment={() =>
              commentRef.current?.measure((_, __, ___, ____, px, py) => {
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
            comments={comments ?? []}
            likedComments={likedComments}
            onToggleLike={toggleLike}
            opinionTheme={opinionTheme}
            opinionBgColors={opinionBgColors}
            ref={commentRef}
            commentInput={commentInput}
            setCommentInput={setCommentInput}
            onPostComment={handlePostComment}
            onOpenOption={() => setCommentOptionModalVisible(true)}
            onSelectComment={(commentId) => setSelectedCommentId(commentId)}
            isEditing={isEditing}
            selectedCommentId={selectedCommentId}
            onEditComment={handleEditComment}
            setIsEditing={setIsEditing}
            newsId={Number(id)}
            onDeleteComment={handleDeleteComment}
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
          if (selectedCommentId !== null) {
            const commentToEdit = comments?.find(
              (c) => c.id === selectedCommentId.toString()
            );
            if (commentToEdit) {
              setCommentInput(commentToEdit.content);
              setIsEditing(true);
              setCommentOptionModalVisible(false);
              commentRef.current?.measure((_, __, ___, ____, px, py) => {
                scrollRef.current?.scrollTo({ y: py - 60, animated: true });
              });
            }
          }
        }}
        onDelete={() => {
          if (selectedCommentId !== null) {
            handleDeleteComment(selectedCommentId);
          }
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
