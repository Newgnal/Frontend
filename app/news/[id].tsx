import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getNewsById } from "@/api/useNewsApi";
import { postVote } from "@/api/useVoteApi";
import { NewsItem } from "@/types/news";
import { VoteType } from "@/types/vote";

import CommentSection from "@/app/news/CommentSection";
import NewsContent from "@/app/news/NewsContent";
import NewsHeader from "@/app/news/NewsHeader";
import VoteSection from "@/app/news/PollSection";

import CommentOptionModal from "@/components/ui/modal/CommentOptionModal";
import OptionSelectModal from "@/components/ui/modal/OptionSelectModal";
import ReportOptionModal from "@/components/ui/modal/ReportConfirmModal";

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

  const scrollRef = useRef<ScrollView>(null);
  const pollRef = useRef<View>(null);
  const commentRef = useRef<View>(null);

  const VOTE_KEY = `vote-${id}`;

  useEffect(() => {
    const fetchNews = async () => {
      const res = await getNewsById(id as string);

      setNews(res);
    };
    if (id) fetchNews();
  }, [id]);

  useEffect(() => {
    if (!news?.content) return;

    const plain = news.content;
    const formatted = `<p>${plain.replace(/\n/g, "<br/>")}</p>`;

    setHtmlContent(formatted);
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
    if (id) loadVoteStatus();
  }, [id]);

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
      const response = await postVote({
        newsId: Number(id),
        voteType,
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
    } catch (error) {
      console.error("투표 실패", error);
    }
  };

  const toggleLike = (commentId: string) => {
    setLikedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const pollLabels = [
    "강한 부정",
    "약한 부정",
    "중립",
    "약한 긍정",
    "강한 긍정",
  ];
  const opinionTheme: Record<
    string,
    {
      dotColor: string;
      labelColor: string;
      barColor: string;
      tagBgColor: string;
      tagTextColor: string;
    }
  > = {
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
  const opinionBgColors: Record<string, string> = {
    "강한 부정": "#FFF1E6",
    "약한 부정": "#FFF7E8",
    중립: "#E4E6E7",
    "약한 긍정": "#E0FFF3",
    "강한 긍정": "#D6FFEF",
  };
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
        opinion: "강한 긍정",
      },
    ],
  }));

  if (!news) return <Text>뉴스를 찾을 수 없습니다</Text>;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView ref={scrollRef}>
        <NewsHeader
          title={news.title}
          date={news.date}
          pollCount={pollResults.reduce((acc, val) => acc + val, 0)}
          commentCount={comments.length}
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
          comments={comments}
          likedComments={likedComments}
          onToggleLike={toggleLike}
          opinionTheme={opinionTheme}
          opinionBgColors={opinionBgColors}
          onOpenOption={() => setCommentOptionModalVisible(true)}
        />
      </ScrollView>

      <OptionSelectModal
        isVisible={isOptionModalVisible}
        onClose={() => setOptionModalVisible(false)}
        onFeedbackPress={() => console.log("피드백 보내기 클릭됨")}
      />
      <CommentOptionModal
        isVisible={isCommentOptionModalVisible}
        onClose={() => setCommentOptionModalVisible(false)}
        onEdit={() => console.log("댓글 수정")}
        onDelete={() => console.log("댓글 삭제")}
      />
      <ReportOptionModal
        isVisible={isReportModalVisible}
        onClose={() => setReportModalVisible(false)}
        onReport={() => console.log("신고하기")}
      />
    </SafeAreaView>
  );
}
