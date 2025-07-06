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
    fontFamily: "Pretendard",
    fontSize: 20,
    fontWeight: "700",
    color: "#0E0F15",
    lineHeight: 30,
  },
  changeBox: {
    marginLeft: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  changeText: {
    fontFamily: "Pretendard",
    fontSize: 13,
    fontWeight: "500",
    letterSpacing: 0.078,
  },
});
