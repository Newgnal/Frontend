import IcEtc from "@/assets/images/ic_cmnt_etc.svg";
import IcComnt from "@/assets/images/ic_comnt.svg";
import IcHeader from "@/assets/images/ic_header.svg";
import IcPoll from "@/assets/images/ic_poll.svg";
import { typography } from "@/styles/typography";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  source: string;
  title: string;
  date: string;
  pollCount: number;
  commentCount: number;
  onBack: () => void;
  onOpenOption: () => void;
  onPressPoll: () => void;
  onPressComment: () => void;
};

const formatKoreanDate = (isoString: string) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const period = hours >= 12 ? "오후" : "오전";
  hours = hours % 12 === 0 ? 12 : hours % 12;

  return `${year}.${month}.${day}. ${period} ${hours}:${minutes}`;
};

export default function NewsHeader({
  source,
  title,
  date,
  pollCount,
  commentCount,
  onBack,
  onOpenOption,
  onPressPoll,
  onPressComment,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={{ marginRight: 12 }}>
            <IcHeader width={24} height={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onOpenOption}>
            <IcEtc width={24} height={24} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.source}>{source}</Text>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>입력 {formatKoreanDate(date)}</Text>

      <View style={styles.reactions}>
        <TouchableOpacity onPress={onPressPoll} style={styles.reactionItem}>
          <IcPoll width={24} height={24} style={{ marginRight: 4 }} />
          <Text style={styles.reactionText}>{pollCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressComment} style={styles.reactionItem}>
          <IcComnt width={24} height={24} style={{ marginRight: 4 }} />
          <Text style={styles.reactionText}>{commentCount}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingTop: 20 },
  source: {
    ...typography.label_l2_13_medium,
    color: "#717D89",
    marginTop: 31,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerIcons: { flexDirection: "row" },
  title: {
    ...typography.header_h2_24_bold,
    lineHeight: 36,
    marginTop: 12,
  },
  date: {
    ...typography.caption_c1_11_regular,
    color: "#717D89",
    marginTop: 8,
  },
  reactions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
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
  reactionText: {
    fontSize: 12,
    color: "#89939F",
  },
});
