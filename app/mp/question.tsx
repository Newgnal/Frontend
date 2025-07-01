import VerDotIcon from "@/assets/images/ic_cmnt_etc_ver.svg";
import NextLgIcon from "@/assets/images/icon_next_lg.svg";
import { Header } from "@/components/ui/Header";
import { HorizontalLine } from "@/components/ui/HorizontalLine";
import { typography } from "@/styles/typography";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function QuestionScreen() {
  const router = useRouter();

  const [openedStates, setOpenedStates] = useState<boolean[]>([]);

  const questions = [
    {
      title: "닉네임을 변경하고 싶어요",
      content:
        "닉네임 변경은 [더보기 → 프로필] 에서 할 수 있습니다. 문의 설명문의 설명문의 설명문의 설명문의 설명문의 설명문의 설명문의 설명문의 설명문의 설명문의 설명문의 설명문의 설명.",
    },
    {
      title: "비밀번호를 잊어버렸어요",
      content:
        "비밀번호는 로그인 화면의 [비밀번호 찾기]를 통해 재설정 가능합니다.",
    },
    {
      title: "계정을 삭제하고 싶어요",
      content:
        "계정 삭제는 설정 > 계정 관리 > 계정 삭제에서 진행할 수 있습니다.",
    },
  ];

  // 초기 상태를 질문 수만큼 false로 초기화
  useState(() => {
    setOpenedStates(new Array(questions.length).fill(false));
  });

  const toggleQuestion = (index: number) => {
    setOpenedStates((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index]; // 해당 index만 토글
      return updated;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="자주 묻는 질문"
        leftSlot={
          <Pressable onPress={() => router.back()}>
            <NextLgIcon />
          </Pressable>
        }
        rightSlot={<VerDotIcon />}
      />

      <View>
        {questions.map((q, index) => (
          <View key={index}>
            <Pressable onPress={() => toggleQuestion(index)}>
              <View style={[styles.content, { flexDirection: "row", gap: 8 }]}>
                <Text style={[typography.subtitle_s3_15_semi_bold]}>Q.</Text>
                <Text style={[typography.subtitle_s3_15_semi_bold]}>
                  {q.title}
                </Text>
              </View>
            </Pressable>
            <HorizontalLine
              style={{ marginHorizontal: 20, backgroundColor: "#DEDEDE" }}
            />
            {openedStates[index] && (
              <>
                <Text
                  style={[
                    styles.content,
                    typography.body_b3_14_regular,
                    { color: "#717D89" },
                  ]}
                >
                  {q.content}
                </Text>
                <HorizontalLine
                  style={{ marginHorizontal: 20, backgroundColor: "#DEDEDE" }}
                />
              </>
            )}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  questionBox: {
    marginBottom: 20,
  },
  question: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  answer: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666",
  },
});
