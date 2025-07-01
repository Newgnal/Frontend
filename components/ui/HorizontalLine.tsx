import { StyleSheet, View, ViewStyle } from "react-native";

type HorizontalLineProps = {
  color?: string;
  height?: number;
  style?: ViewStyle | ViewStyle[];
};

export function HorizontalLine({
  color = "#EDEEEF",
  height = 1.5,
  style,
}: HorizontalLineProps) {
  return (
    <View style={[styles.base, { backgroundColor: color, height }, style]} />
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: "stretch",
  },
});
