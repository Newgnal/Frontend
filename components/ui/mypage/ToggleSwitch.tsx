import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface ToggleSwitchProps {
  containerHeight?: number;
  containerWidth?: number;
  circleHeight?: number;
  circleWidth?: number;
}

export function ToggleSwitch({
  containerHeight = 32,
  containerWidth = 56,
  circleHeight = 24,
  circleWidth = 24,
}: ToggleSwitchProps) {
  const [isOn, setIsOn] = useState(false);
  const toggle = () => setIsOn((prev) => !prev);

  const padding = 4;
  const translateX = isOn ? containerWidth - circleWidth - padding : padding;

  return (
    <Pressable
      style={[
        styles.container,
        {
          width: containerWidth,
          height: containerHeight,
          borderRadius: containerHeight / 2,
          backgroundColor: isOn ? "#5E6974" : "#E4E6E7",
          padding,
        },
      ]}
      onPress={toggle}
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
