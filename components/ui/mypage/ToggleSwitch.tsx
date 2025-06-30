import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

export function ToggleSwitch() {
  const [isOn, setIsOn] = useState(false);

  const toggle = () => setIsOn((prev) => !prev);

  return (
    <Pressable
      style={[
        styles.container,
        { backgroundColor: isOn ? "#5E6974" : "#E4E6E7" }, // 비활성색: 이미지 기준
      ]}
      onPress={toggle}
    >
      <View
        style={[
          styles.circle,
          {
            transform: [{ translateX: isOn ? 27 : 4 }], // 위치 이동
          },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 56,
    height: 32,
    borderRadius: 999,
    justifyContent: "center",
    padding: 4,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 13,
    backgroundColor: "#fff",
    position: "absolute",
    top: 4,
  },
});
