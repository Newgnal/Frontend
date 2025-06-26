import AlarmIcon from "@/assets/images/ic_alarm.svg";
import SearchIcon from "@/assets/images/ic_search.svg";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function HeaderIcons() {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={() => console.log("검색 tapped")}
        style={styles.searchButton}
      >
        <SearchIcon width={24} height={24} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => console.log("알림 tapped")}
        style={styles.alarmButton}
      >
        <AlarmIcon width={24} height={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 14,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  searchButton: {
    marginRight: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  alarmButton: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});
