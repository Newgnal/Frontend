import { typography } from "@/styles/typography";
import { StyleSheet, Text, View } from "react-native";

export default function CategoryInfoBox({
  category,
  change,
  color,
}: {
  category: string;
  change: string;
  color: string;
}) {
  const isPositive = change.startsWith("+");
  const boxBackgroundColor = isPositive ? "#FFE4E5" : "#E9EFFF";
  const textColor = isPositive ? "#E31B3E" : "#497AFA";

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
