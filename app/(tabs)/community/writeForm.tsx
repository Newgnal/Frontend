import VoteIcon from "@/assets/images/ic_icon.svg";
import NewsIcon from "@/assets/images/ic_news.svg";
import NextSmIcon from "@/assets/images/ic_next_sm_600.svg";
import CloseIcon from "@/assets/images/ic_out.svg";
import NextLgIcon from "@/assets/images/icon_next_lg.svg";

import { createPost, updatePost } from "@/api/postApi";
import News from "@/components/ui/community/News";
import { Header } from "@/components/ui/Header";
import { HorizontalLine } from "@/components/ui/HorizontalLine";
import { ToggleSwitch } from "@/components/ui/mypage/ToggleSwitch";
import { typography } from "@/styles/typography";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function WriteFormScreen() {
  const router = useRouter();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const {
    postId,
    editTitle,
    editContent,
    editVoteEnabled,
    editNewsId,
    editThema,

    id,
    title: newsTitle,
    newsCategory,
    newsSource,
    date: newsDate,
    sentiment: newsSentiment,
    formTitle: initialTitle,
    content: initialContent,
    category: initialThema,
    voteEnabled: initialVoteEnabled,
  } = useLocalSearchParams<{
    postId?: string;
    editTitle?: string;
    editContent?: string;
    editVoteEnabled?: string;
    editNewsId?: string;
    editThema?: string;
    category?: string;
    newsSource?: string;
    newsCategory?: string;
    id?: string;
    title?: string;
    date?: string;
    sentiment?: string;
    views?: string;
    url?: string;
    content?: string;
    formTitle?: string;
    voteEnabled?: string;
  }>();

  const isEdit = !!postId;

  const [title, setTitle] = useState(
    isEdit ? editTitle ?? "" : initialTitle ?? ""
  );
  const [content, setContent] = useState(
    isEdit ? editContent ?? "" : initialContent ?? ""
  );
  const [voteEnabled, setVoteEnabled] = useState(
    isEdit ? editVoteEnabled === "true" : initialVoteEnabled === "true"
  );

  const [thema, setThema] = useState(
    isEdit ? editThema ?? "UNKNOWN" : initialThema ?? "UNKNOWN"
  );

  const [newsId, setNewsId] = useState(isEdit ? editNewsId ?? "" : id ?? "");

  const categoryMap: { [key: string]: string } = {
    "반도체/AI": "SEMICONDUCTOR_AI",
    "IT/인터넷": "IT_INTERNET",
    "금융/보험": "FINANCE_INSURANCE",
    모빌리티: "MOBILITY",
    "방산/항공우주": "DEFENSE_AEROSPACE",
    "2차전지/친환경E": "SECOND_BATTERY_ENVIRONMENT",
    "부동산/리츠": "REAL_ESTATE_REIT",
    "채권/금리": "BOND_INTEREST",
    "헬스케어/바이오": "HEALTHCARE_BIO",
    "환율/외환": "EXCHANGE_RATE",
    "원자재/귀금속": "RAW_MATERIAL_METALS",
    기타: "ETC",
  };

  const handleSubmit = async () => {
    if (!title || !content) return;
    try {
      if (isEdit) {
        await updatePost(Number(postId), {
          postTitle: title,
          postContent: content,
          newsId: newsId ? Number(newsId) : 10000,
          thema: categoryMap[thema] ?? "UNKNOWN",
          hasVote: voteEnabled,
        });
        Toast.show({ type: "success", text1: "글이 수정되었어요" });
      } else {
        const parsedNewsId = parseInt(newsId ?? "", 10);
        await createPost({
          postTitle: title,
          postContent: content,
          newsId: !isNaN(parsedNewsId) ? parsedNewsId : 10000,
          thema: categoryMap[thema] ?? "UNKNOWN",
          hasVote: voteEnabled,
        });
        Toast.show({ type: "success", text1: "글이 등록되었어요" });
      }
      // 등록 후 이동 (예: 커뮤니티 메인으로)
      router.replace("/(tabs)/community");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "등록 실패",
        text2: "다시 시도해주세요.",
      });
      console.log("글 등록 실패", error);
    }
  };

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleRemoveNews = () => {
    setNewsId("");
    router.replace({
      pathname: "/(tabs)/community/writeForm",
      params: {
        category: thema,
        formTitle: title,
        content,
        newsId: newsId ?? "",
        voteEnabled: voteEnabled.toString(),
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.container}
        >
          <Header
            title={thema ?? ""}
            leftSlot={
              <Pressable onPress={() => router.back()}>
                <NextLgIcon />
              </Pressable>
            }
            rightSlot={
              <Pressable onPress={handleSubmit} disabled={!title || !content}>
                <Text
                  style={[
                    typography.label_l1_14_regular,
                    { color: title && content ? "#111" : "#89939F" },
                  ]}
                >
                  {isEdit ? "수정" : "등록"}
                </Text>
              </Pressable>
            }
          />

          <View style={styles.contents}>
            <TextInput
              placeholder="제목을 입력해 주세요"
              placeholderTextColor="#89939F"
              style={[typography.subtitle_s1_18_semi_bold, { padding: 0 }]}
              value={title}
              onChangeText={setTitle}
            />

            <HorizontalLine style={{ marginVertical: 12 }} />

            <TextInput
              placeholder="내용을 입력해 주세요"
              placeholderTextColor="#89939F"
              multiline
              style={[
                typography.body_b2_15_medium,
                {
                  padding: 0,
                  minHeight: 150,
                  textAlignVertical: "top",
                },
              ]}
              value={content}
              onChangeText={setContent}
            />
          </View>

          <View style={[styles.footer, { marginBottom: keyboardHeight }]}>
            <HorizontalLine />
            <View style={styles.footerRow}>
              {newsId !== "" ? (
                <View
                  style={{
                    flexDirection: "row",
                    gap: 12,
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <News
                    id={newsId ?? ""}
                    title={newsTitle ?? ""}
                    date={newsDate ?? ""}
                    category={newsCategory ?? ""}
                    sentiment={newsSentiment ?? ""}
                    source={newsSource ?? ""}
                  />
                  <Pressable
                    onPress={handleRemoveNews}
                    style={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      zIndex: 1,
                    }}
                  >
                    <CloseIcon width={16} height={16} />
                  </Pressable>
                </View>
              ) : (
                <>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 12,
                      alignItems: "center",
                    }}
                  >
                    <NewsIcon />
                    <Pressable
                      onPress={() =>
                        router.push({
                          pathname: "/(tabs)/community/selectNews",
                          params: {
                            category: thema,
                            formTitle: title,
                            content,
                            newsId: "",
                            voteEnabled: voteEnabled.toString(),
                            ...(postId && { postId }),
                          },
                        })
                      }
                    >
                      <Text style={styles.footerText}>뉴스 추가하기</Text>
                    </Pressable>
                  </View>

                  <Pressable
                    onPress={() =>
                      router.push({
                        pathname: "/(tabs)/community/selectNews",
                        params: {
                          category: initialThema,
                          formTitle: title,
                          content,
                        },
                      })
                    }
                  >
                    <NextSmIcon />
                  </Pressable>
                </>
              )}
            </View>

            <HorizontalLine />
            <View style={styles.footerRow}>
              <View
                style={{ flexDirection: "row", gap: 12, alignItems: "center" }}
              >
                <VoteIcon />
                <Text style={styles.footerText}>투자 의견 투표하기</Text>
              </View>
              <ToggleSwitch
                containerHeight={28}
                containerWidth={54}
                circleHeight={20}
                circleWidth={20}
                value={voteEnabled}
                onToggle={(val) => setVoteEnabled(val)}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contents: {
    padding: 20,
    flex: 1,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  footerText: {
    color: "#89939F",
    ...typography.body_b2_15_medium,
  },
});
