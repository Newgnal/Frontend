import NextLgIcon from "@/assets/images/icon_next_lg.svg";
import { HorizontalLine } from "@/components/ui/HorizontalLine";
import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

type MyPageRowProps = {
  label: string;
  containerStyle?: ViewStyle;
};

export function MyPageRow({ label, containerStyle }: MyPageRowProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <NextLgIcon style={{ transform: [{ rotate: "180deg" }] }} />
      </View>
      <HorizontalLine />
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
