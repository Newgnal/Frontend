import IcComnt from "@/assets/images/ic_comnt.svg";
import IcPoll from "@/assets/images/ic_poll.svg";
import { HorizontalLine } from "@/components/ui/HorizontalLine";
import { typography } from "@/styles/typography";
import { NewsItem } from "@/types/news";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  item: NewsItem;
}

export default function NewsCard({ item }: Props) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/news/${item.id}`)}
      style={styles.card}
    >
      <View style={styles.header}>
        <Text style={styles.category}>{item.thema}</Text>
        <Text style={styles.sentiment}>
          {item.sentiment > 0 ? `+${item.sentiment}` : item.sentiment}
        </Text>
      </View>

      <View style={styles.contentRow}>
        <View style={styles.textContent}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>
            {item.source} | {item.date.split("T")[0]}
          </Text>

          <View style={styles.metaRow}>
            <Text style={styles.meta}>
              조회 {Math.floor(item.view / 10000)}만
            </Text>
            <View style={styles.iconWithText}>
              <IcComnt width={16} height={16} />
              <Text style={styles.meta}>{item.commentNum ?? 0}</Text>
            </View>
            <View style={styles.iconWithText}>
              <IcPoll width={16} height={16} />
              <Text style={styles.meta}>{item.voteNum ?? 0}</Text>
            </View>
          </View>
        </View>

        {item.imageUrl && (
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
        )}
      </View>

      <HorizontalLine />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    paddingBottom: 12,
  },
  header: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  category: {
    ...typography.caption_c1_12_semi_bold,
    backgroundColor: "#F4F5F7",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  sentiment: {
    ...typography.caption_c1_12_semi_bold,
    backgroundColor: "#E7EDFF",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    color: "#214DEF",
  },
  contentRow: {
    flexDirection: "row",
    gap: 12,
  },
  textContent: {
    flex: 1,
    gap: 6,
  },
  title: {
    ...typography.body_b1_16_medium, // 16pt, medium
  },
  subtitle: {
    ...typography.caption_c2_12_regular,
    color: "#888", // 보조 색상 추가
  },
  metaRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  iconWithText: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  meta: {
    ...typography.caption_c2_12_regular,
    color: "#777",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 4,
    backgroundColor: "#ddd",
  },
});
