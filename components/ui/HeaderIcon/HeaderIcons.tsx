import AlarmIcon from "@/assets/images/ic_alarm.svg";
import SearchIcon from "@/assets/images/ic_search.svg";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function HeaderIcons() {
  const router = useRouter();
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={() => router.push("/search")}
        style={styles.searchButton}
      >
        <SearchIcon width={24} height={24} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/alarm")}
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
