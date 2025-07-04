import IcEtc from "@/assets/images/ic_cmnt_etc.svg";
import IcComnt from "@/assets/images/ic_comnt.svg";
import IcHeader from "@/assets/images/ic_header.svg";
import IcPoll from "@/assets/images/ic_poll.svg";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function NewsDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const comments = Array.from({ length: 10 }, (_, i) => ({
    id: i.toString(),
    user: "테이피",
    time: "16시간 전",
    content:
      "유기농 아빠를 맡은 아는 분들이 이 시대는 많지 않았습니다. 유기농 아빠를 맡은 아는 분들이 이 시대는 많지 않았습니다.",
  }));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={{ marginRight: 12 }}>
              <IcHeader width={24} height={24} />
            </TouchableOpacity>
            <TouchableOpacity>
              <IcEtc width={24} height={24} />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.newsTitle}>
          한살림 고구마 케이크서 ‘식중독균 검출’... 식약처, 회수 조치
        </Text>
        <Text style={styles.newsMeta}>입력 2025.06.20 오후 6:44</Text>

        <View style={styles.reactions}>
          <View style={styles.reactionItem}>
            <IcComnt width={16} height={16} style={{ marginRight: 4 }} />
            <Text style={styles.reactionText}>234</Text>
          </View>
          <View style={styles.reactionItem}>
            <IcPoll width={16} height={16} style={{ marginRight: 4 }} />
            <Text style={styles.reactionText}>402</Text>
          </View>
        </View>

        <View style={styles.summaryBox}>
          <Text style={styles.sectionLabel}>+ AI 요약</Text>
          <Text style={styles.summaryText}>
            요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약
          </Text>
        </View>

        {/* 본문 */}
        <Text style={styles.content}>
          식품의약품안전처(식약처)가 식품제조·가공업체 한살림우리밀(경기 고양시
          소재)이 제조한 ‘고구마케이크’에서 식중독균인 ‘리스테리아
          모노사이토제네스’가 검출돼 판매를 중단하고 회수 조치 중이라고 20일
          밝혔다.
        </Text>
        <Text style={styles.content}>
          회수 대상은 제조 일자가 ‘2025. 6. 12.’로 표시된 제품이다.
        </Text>
        <Text style={styles.content}>
          식약처는 안심시장이 해당 제품을 신속히 회수 조치하도록 했으며, 해당
          제품을 구입한 소비자에게 섭취를 중단하고 구입처에 반품해 달라고
          당부하고 있다.
        </Text>

        <View style={styles.imageBox}></View>
        <Text style={styles.imageLabel}>
          한살림/식약관리원이 확인한 ‘고구마케이크’ 1판. 식약처제공
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerIcons: {
    flexDirection: "row",
  },
  newsTitle: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 36,
    fontFamily: "Pretendard",
    marginTop: 20,
  },
  newsMeta: {
    fontSize: 12,
    color: "#888",
    marginTop: 6,
  },

  sectionLabel: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 14,
  },
  content: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 22,
    color: "#222",
  },
  imageBox: {
    marginTop: 20,
    backgroundColor: "#eaeaea",
    height: 140,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  imageLabel: {
    fontSize: 12,
    color: "#666",
    padding: 10,
  },
  reactions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  reactionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 999,
    backgroundColor: "#fff",
  },
  summaryBox: {
    borderLeftWidth: 2,
    borderLeftColor: "#D0D0D0",
    paddingLeft: 12,
    marginTop: 16,
  },
  summaryText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#444",
  },
  reactionText: {
    fontSize: 14,
    color: "#6B7280",
  },
});
