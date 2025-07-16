import { Pressable, StyleSheet, View } from "react-native";

interface ToggleSwitchProps {
  value: boolean;
  onToggle: (val: boolean) => void;
  containerHeight?: number;
  containerWidth?: number;
  circleHeight?: number;
  circleWidth?: number;
}

export function ToggleSwitch({
  value,
  onToggle,
  containerHeight = 32,
  containerWidth = 56,
  circleHeight = 24,
  circleWidth = 24,
}: ToggleSwitchProps) {
  const padding = 4;
  const translateX = value ? containerWidth - circleWidth - padding : padding;

  return (
    <Pressable
      style={[
        styles.container,
        {
          width: containerWidth,
          height: containerHeight,
          borderRadius: containerHeight / 2,
          backgroundColor: value ? "#5E6974" : "#E4E6E7",
          padding,
        },
      ]}
      onPress={() => onToggle(!value)}
    >
      <View
        style={{
          width: circleWidth,
          height: circleHeight,
          borderRadius: Math.max(circleWidth, circleHeight) / 2,
          backgroundColor: "#fff",
          position: "absolute",
          top: padding,
          transform: [{ translateX }],
        }}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
});
