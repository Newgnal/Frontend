import IcEtc from "@/assets/images/ic_cmnt_etc.svg";
import IcComnt from "@/assets/images/ic_comnt.svg";
import IcHeader from "@/assets/images/ic_header.svg";
import IcPoll from "@/assets/images/ic_poll.svg";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  title: string;
  date: string;
  pollCount: number;
  commentCount: number;
  onBack: () => void;
  onOpenOption: () => void;
  onPressPoll: () => void;
  onPressComment: () => void;
};

export default function NewsHeader({
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

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>입력 {date}</Text>

      <View style={styles.reactions}>
        <TouchableOpacity onPress={onPressPoll} style={styles.reactionItem}>
          <IcPoll width={16} height={16} style={{ marginRight: 4 }} />
          <Text style={styles.reactionText}>{pollCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressComment} style={styles.reactionItem}>
          <IcComnt width={16} height={16} style={{ marginRight: 4 }} />
          <Text style={styles.reactionText}>{commentCount}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingTop: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerIcons: { flexDirection: "row" },
  title: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 36,
    fontFamily: "Pretendard",
    marginTop: 20,
  },
  date: {
    fontSize: 12,
    color: "#888",
    marginTop: 6,
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
  reactionText: {
    fontSize: 14,
    color: "#6B7280",
  },
});
