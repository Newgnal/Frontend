import { DimensionValue, StyleSheet, View, ViewStyle } from "react-native";

type HorizontalLineProps = {
  color?: string;
  height?: number;
  width?: DimensionValue;
  style?: ViewStyle;
};

export function HorizontalLine({
  color = "#EDEEEF",
  height = 1.5,
  width = "100%",
  style,
}: HorizontalLineProps) {
  return (
    <View
      style={[styles.base, { backgroundColor: color, height, width }, style]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: "stretch",
  },
});
