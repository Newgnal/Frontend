import VoteIcon from "@/assets/images/ic_icon.svg";
import NewsIcon from "@/assets/images/ic_news.svg";
import NextSmIcon from "@/assets/images/ic_next_sm_600.svg";
import CloseIcon from "@/assets/images/ic_out.svg";
import NextLgIcon from "@/assets/images/icon_next_lg.svg";

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

export default function WriteFormScreen() {
  const router = useRouter();
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [voteEnabled, setVoteEnabled] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const {
    category,
    id: newsId,
    title: newsTitle,
    date,
    sentiment,
    views,
  } = useLocalSearchParams<{
    category?: string;
    id?: string;
    title?: string;
    date?: string;
    sentiment?: string;
    views?: string;
  }>();

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
    router.replace({
      pathname: "/(tabs)/community/writeForm",
      params: {
        category,
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
            title={category ?? ""}
            leftSlot={
              <Pressable onPress={() => router.back()}>
                <NextLgIcon />
              </Pressable>
            }
            rightSlot={
              <Text
                style={[
                  typography.label_l1_14_regular,
                  { color: title && content ? "#111" : "#89939F" },
                ]}
              >
                등록
              </Text>
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
              {newsId ? (
                <View
                  style={{
                    flexDirection: "row",
                    gap: 12,
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <News
                    id={newsId ?? 0}
                    title={newsTitle ?? ""}
                    date={date ?? ""}
                    category={category ?? ""}
                    sentiment={sentiment ?? ""}
                    views={Number(views) || 0}
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
                        router.push("/(tabs)/community/selectNews")
                      }
                    >
                      <Text style={styles.footerText}>뉴스 추가하기</Text>
                    </Pressable>
                  </View>

                  <Pressable
                    onPress={() => router.push("/(tabs)/community/selectNews")}
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
