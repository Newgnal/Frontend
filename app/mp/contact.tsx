import VerDotIcon from "@/assets/images/ic_cmnt_etc_ver.svg";
import NextLgIcon from "@/assets/images/icon_next_lg.svg";
import { Header } from "@/components/ui/Header";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { typography } from "@/styles/typography";

export default function QuestionScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const isValid = email.trim() && title.trim() && content.trim();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="1:1 문의"
        leftSlot={
          <Pressable onPress={() => router.back()}>
            <NextLgIcon />
          </Pressable>
        }
        rightSlot={<VerDotIcon />}
      />

      <View style={styles.contents}>
        <View>
          <View>
            <Text style={typography.subtitle_s3_15_semi_bold}>
              답변 받을 이메일 주소
            </Text>
            <View style={styles.wrapper}>
              {email.length === 0 && (
                <Text
                  style={[typography.label_l1_14_regular, styles.placeholder]}
                >
                  이메일 주소
                </Text>
              )}
              <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input}
              />
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={typography.subtitle_s3_15_semi_bold}>제목</Text>
            <View style={styles.wrapper}>
              {title.length === 0 && (
                <Text
                  style={[typography.label_l1_14_regular, styles.placeholder]}
                >
                  제목을 입력해 주세요. (20자 이내)
                </Text>
              )}
              <TextInput
                value={title}
                onChangeText={setTitle}
                maxLength={20}
                style={styles.input}
              />
              <Text
                style={[styles.counterText, typography.caption_c1_11_regular]}
              >
                <Text style={styles.currentLength}>{title.length}</Text>
                <Text style={styles.totalLength}> / 20</Text>
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={typography.subtitle_s3_15_semi_bold}>문의 내용</Text>
            <View style={[styles.wrapper, { minHeight: 220 }]}>
              {content.length === 0 && (
                <Text
                  style={[typography.label_l1_14_regular, styles.placeholder]}
                >
                  문의 내용을 입력해 주세요.
                </Text>
              )}
              <TextInput
                value={content}
                onChangeText={setContent}
                maxLength={3000}
                style={styles.input}
              />
              <Text
                style={[styles.counterText, typography.caption_c1_11_regular]}
              >
                <Text style={styles.currentLength}>{content.length}</Text>
                <Text style={styles.totalLength}> / 3000</Text>
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: isValid ? "#2E3439" : "#F4F5F7",
            borderRadius: 12,
          }}
        >
          <Pressable style={[{ alignItems: "center", paddingVertical: 12.5 }]}>
            <Text
              style={[
                typography.subtitle_s3_15_semi_bold,
                {
                  color: isValid ? "#F4F5F7" : "#717D89",
                },
              ]}
            >
              등록하기
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contents: {
    padding: 20,
    justifyContent: "space-between",
    flex: 1,
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    color: "#000",
  },
  counterText: {
    flexDirection: "row",
    position: "absolute",
    right: 17,
    top: 15,

    color: "#A0A0A0",
  },
  currentLength: {
    color: "#3B82F6",
    fontWeight: "500",
  },
  totalLength: {
    color: "#89939F",
  },
  wrapper: {
    position: "relative",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 8,
    paddingRight: 60, // 글자 수 공간 확보
    paddingVertical: 2,
    marginTop: 8,
  },
  placeholder: {
    position: "absolute",
    left: 16,
    top: 12,
    color: "#89939F",
    paddingVertical: 2,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#2E3439",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
});

export const unstable_screenOptions = {
  tabBarStyle: {
    display: "none",
  },
};
