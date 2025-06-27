import { StyleSheet, Text, View } from "react-native";

export default function CategoryInfoBox({
  category,
  change,
}: {
  category: string;
  change: string;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.categoryText}>{category}</Text>
      <View style={styles.changeBox}>
        <Text style={styles.changeText}>{change}</Text>
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
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: "#FFE4E5",
  },
  changeText: {
    fontFamily: "Pretendard",
    fontSize: 13,
    fontWeight: "500",
    color: "#E31B3E",
    letterSpacing: 0.078,
  },
});
