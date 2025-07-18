import { typography } from "@/styles/typography";
import { StyleSheet, Text, View } from "react-native";

export default function CategoryInfoBox({
  category,
  change,
  color,
}: {
  category: string;
  change: string;
  color?: string;
}) {
  const boxBackgroundColor = color === "#497AFA" ? "#E9EFFF" : "#FFE4E5";
  const textColor = color === "#497AFA" ? "#497AFA" : "#E31B3E";

  return (
    <View style={styles.container}>
      <Text style={styles.categoryText}>{category}</Text>
      <View style={[styles.changeBox, { backgroundColor: boxBackgroundColor }]}>
        <Text style={[styles.changeText, { color: textColor }]}>{change}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 4,
    gap: 4,
  },
  categoryText: {
    ...typography.header_h3_20_bold,
    lineHeight: 30,
  },
  changeBox: {
    marginLeft: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    justifyContent: "center",
  },
  changeText: {
    ...typography.label_l2_13_medium,
    letterSpacing: 0.6,
  },
});
