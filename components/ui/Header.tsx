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
        <View style={styles.sideContainer}>
          {leftSlot ?? <View style={{ width: 30 }} />}
        </View>

        <View style={styles.titleContainer}>
          <Text style={[typography.title_t2_18_semi_bold]}>{title}</Text>
        </View>

        <View style={styles.sideContainer}>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: "100%",
  },
  sideContainer: {
    width: 60, // 아이콘 2개 들어가도 충분한 고정값
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 12,
  },
  titleContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
});
