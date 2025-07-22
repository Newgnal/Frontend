import IcComnt from "@/assets/images/ic_comnt.svg";
import IcPoll from "@/assets/images/ic_poll.svg";
import { HorizontalLine } from "@/components/ui/HorizontalLine";
import { typography } from "@/styles/typography";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  thema: string;
  date: string;
  sentiment: string;
  imageUrl: string;
  view: number;
  commentNum: string;
  voteNum: string;
  isSelected: boolean;
  onPress: () => void;
}

export default function NewsCard({
  title,
  id,
  date,
  thema,
  sentiment,
  imageUrl,
  view,
  source,
  voteNum,
  commentNum,
  isSelected,
  onPress,
}: NewsItem) {
  let sentimentColor = "#484F56";
  let sentimentBgColor = "#EDEEEF";

  if (Number(sentiment) > 0) {
    sentimentColor = "#E31B3E";
    sentimentBgColor = "#FFE4E5";
  } else if (Number(sentiment) < 0) {
    sentimentColor = "#497AFA";
    sentimentBgColor = "#E7EDFF";
  }
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: isSelected ? "rgba(113, 125, 137, 0.10)" : "#FFFFFF",
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.category}>{thema}</Text>
        <Text
          style={[
            styles.sentiment,
            {
              color: sentimentColor,
              backgroundColor: sentimentBgColor,
            },
          ]}
        >
          {sentiment}
        </Text>
      </View>

      <View style={styles.contentRow}>
        <View style={styles.textContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>
            {source} | {date}
          </Text>

          <View style={styles.metaRow}>
            <Text style={styles.meta}>조회 {Math.floor(view / 10000)}만</Text>
            <View style={styles.iconWithText}>
              <IcComnt width={24} height={24} />
              <Text style={styles.meta}>{commentNum}</Text>
            </View>
            <View style={styles.iconWithText}>
              <IcPoll width={24} height={24} />
              <Text style={styles.meta}>{voteNum}</Text>
            </View>
          </View>
        </View>

        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.imagePlaceholder}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
      </View>
      <HorizontalLine />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  listContent: {
    paddingTop: 0,
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  card: {
    minHeight: 120,
    width: "100%",
    paddingTop: 16,
    paddingBottom: 0,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  category: {
    fontSize: 12,
    color: "#484F56",
    backgroundColor: "#F4F5F7",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  sentiment: {
    fontSize: 12,
    color: "#214DEF",
    backgroundColor: "#E7EDFF",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontWeight: "400",
  },
  contentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  textContent: {
    flex: 1,
    flexDirection: "column",
    gap: 4,
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
    alignItems: "center",
    gap: 13,
  },
  iconWithText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  meta: {
    fontSize: 12,
    color: "#777",
  },
  imagePlaceholder: {
    width: 76,
    height: 76,
    backgroundColor: "#dcdcdc",
    borderRadius: 4,
  },
});
