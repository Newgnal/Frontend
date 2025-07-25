import IcComnt from "@/assets/images/ic_comnt.svg";
import IcPoll from "@/assets/images/ic_poll.svg";
import { HorizontalLine } from "@/components/ui/HorizontalLine";
import { typography } from "@/styles/typography";
import { NewsItem } from "@/types/news";
import { convertThemaToKor } from "@/utils/convertThemaToKor";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  item: NewsItem;
}

export default function NewsCard({ item }: Props) {
  const router = useRouter();
  const sentiment = parseFloat(item.sentiment.toFixed(2));

  let sentimentColor = "#484F56";
  let sentimentBgColor = "#EDEEEF";

  if (sentiment > 0) {
    sentimentColor = "#E31B3E";
    sentimentBgColor = "#FFE4E5";
  } else if (sentiment < 0) {
    sentimentColor = "#497AFA";
    sentimentBgColor = "#E7EDFF";
  }

  return (
    <Pressable
      onPress={() => router.push(`/news/${item.id}`)}
      style={styles.card}
    >
      <View style={styles.header}>
        <Text style={styles.category}> {convertThemaToKor(item.thema)}</Text>
        <Text
          style={[
            styles.sentiment,
            {
              color: sentimentColor,
              backgroundColor: sentimentBgColor,
            },
          ]}
        >
          {sentiment > 0 ? `+${sentiment}` : sentiment}
        </Text>
      </View>

      <View style={styles.contentRow}>
        <View style={styles.textContent}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>
            {item.source} | {item.date.split("T")[0]}
          </Text>

          <View style={styles.metaRow}>
            <Text style={[styles.meta, { marginTop: -2.5 }]}>
              조회 {Math.floor(item.view / 10000)}만
            </Text>
            <View style={styles.iconWithText}>
              <IcComnt width={24} height={24} />
              <Text style={styles.meta}>{item.commentNum ?? 0}</Text>
            </View>
            <View style={styles.iconWithText}>
              <IcPoll width={24} height={24} />
              <Text style={styles.meta}>{item.voteNum ?? 0}</Text>
            </View>
          </View>
        </View>

        {item.imageUrl && (
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
        )}
      </View>

      <View style={{ marginTop: 12 }}>
        <HorizontalLine />
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card: {
    marginBottom: 8,
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

    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
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
    ...typography.body_b1_16_medium,
  },
  subtitle: {
    ...typography.caption_c2_12_regular,
    color: "#888",
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
