import NextLgIcon from "@/assets/images/icon_next_lg.svg";
import { HorizontalLine } from "@/components/ui/HorizontalLine";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

type MyPageRowProps = {
  label: string;
  containerStyle?: ViewStyle;
  onPress?: (event: GestureResponderEvent) => void;
};

export function MyPageRow({ label, containerStyle, onPress }: MyPageRowProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Pressable onPress={onPress} style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <NextLgIcon style={{ transform: [{ rotate: "180deg" }] }} />
      </Pressable>
      <HorizontalLine style={{ backgroundColor: "#E4E6E7" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    paddingVertical: 18,
  },
});
