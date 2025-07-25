import { typography } from "@/styles/typography";
import { Image, StyleSheet, Text, View } from "react-native";

type NewsProps = {
  id: string;
  title: string;
  date: string;
  category: string;
  sentiment: string;
  source: string;
  imageUrl: string;
};

const formatSentiment = (value: number | string | undefined) => {
  if (value === undefined || value === null) return "";
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "";
  return `${num > 0 ? "+" : ""}${num}`;
};

export default function News({
  id,
  source,
  title,
  date,
  category,
  sentiment,
  imageUrl,
}: NewsProps) {
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
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <View style={styles.header}>
          <View style={styles.category}>
            <Text
              style={[
                typography.caption_c2_12_regular,
                { color: "#F4F5F7", lineHeight: 17 },
              ]}
            >
              {category}
            </Text>
          </View>
          <Text
            style={[
              styles.sentiment,
              {
                color: sentimentColor,
                backgroundColor: sentimentBgColor,
              },
            ]}
          >
            {formatSentiment(sentiment)}
          </Text>
        </View>

        <View style={styles.contentRow}>
          <View style={styles.textContent}>
            <Text style={styles.title}>{title}</Text>
            <View
              style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
            >
              <Text style={styles.subtitle}>{source}</Text>
              <Text style={styles.subtitle}>|</Text>
              <Text style={styles.subtitle}>{date}</Text>
            </View>
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
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F5F7",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },
  leftContent: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  category: {
    backgroundColor: "#89939F",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  sentiment: {
    ...typography.caption_c1_12_semi_bold,

    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
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
    ...typography.subtitle_s4_12_medium,
  },
  subtitle: {
    ...typography.caption_c1_11_regular,
    color: "#484F56",
  },
  imagePlaceholder: {
    width: 58,
    height: 58,
    backgroundColor: "#dcdcdc",
    borderRadius: 4,
    marginRight: 9,
    marginVertical: 4,
  },
});
