import { typography } from "@/styles/typography";
import { StyleSheet, Text, View } from "react-native";

type NewsProps = {
  id: string;
  title: string;
  date: string;
  category: string;
  sentiment: string;
  source: string;
};

export default function News({
  id,
  source,
  title,
  date,
  category,
  sentiment,
}: NewsProps) {
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
          <Text style={styles.sentiment}>{sentiment}</Text>
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
      <View style={styles.imagePlaceholder} />
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
    fontSize: 10,
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
