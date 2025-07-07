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
          <Text style={typography.title_t2_18_semi_bold}>{title}</Text>
        </View>

        <View
          style={[
            styles.sideContainer,
            { justifyContent: "flex-end", gap: 12 },
          ]}
        >
          {rightSlot ?? <View style={{ width: 24 }} />}
        </View>
      </View>
      <HorizontalLine />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: "100%",
  },
  sideContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  titleContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: -1,
  },
});
