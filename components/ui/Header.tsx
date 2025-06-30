import { typography } from "@/styles/typography";
import { StyleSheet, Text, View } from "react-native";
import { HorizontalLine } from "./HorizontalLine";

interface HeaderProps {
  title: string;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
}

export const Header = ({ title, leftSlot, rightSlot }: HeaderProps) => {
  return (
    <>
      <View style={styles.header}>
        <View style={styles.leftContainer}>
          {leftSlot ?? <View style={{ width: 30 }} />}
        </View>

        <Text style={[typography.title_t2_18_semi_bold]}>{title}</Text>

        <View style={styles.rightContainer}>
          {rightSlot ?? <View style={{ width: 30 }} />}
        </View>
      </View>
      <HorizontalLine />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 15,
    width: "100%",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
