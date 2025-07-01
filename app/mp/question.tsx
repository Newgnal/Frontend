import VerDotIcon from "@/assets/images/ic_cmnt_etc_ver.svg";
import NextLgIcon from "@/assets/images/icon_next_lg.svg";
import { Header } from "@/components/ui/Header";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function QuestionScreen() {
  const router = useRouter();

  const [openedIndex, setOpenedIndex] = useState<number | null>(null);

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

  const toggleQuestion = (index: number) => {
    setOpenedIndex((prev) => (prev === index ? null : index));
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

      <View style={styles.content}>
        {questions.map((q, index) => (
          <View key={index} style={styles.questionBox}>
            <Pressable onPress={() => toggleQuestion(index)}>
              <Text style={styles.question}>Q. {q.title}</Text>
            </Pressable>
            {openedIndex === index && (
              <Text style={styles.answer}>{q.content}</Text>
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
