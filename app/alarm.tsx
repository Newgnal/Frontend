import SettingIcon from "@/assets/images/setting.svg";
import { useRouter } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const notifications = [
  {
    id: "1",
    title: "삼성, 2028년부터 반도체 유리기판 쓴다",
    subtitle: "설정한 키워드 - 누적읽기 집계된 새로운 뉴스",
    time: "1시간 전",
    isRead: false,
  },
  {
    id: "2",
    title: "삼성, 2028년부터 반도체 유리기판 쓴다",
    subtitle: "설정한 키워드 - 누적읽기 집계된 새로운 뉴스",
    time: "1시간 전",
    isRead: true,
  },
  {
    id: "3",
    title: "삼성, 2028년부터 반도체 유리기판 쓴다",
    subtitle: "설정한 키워드 - 누적읽기 집계된 새로운 뉴스",
    time: "1시간 전",
    isRead: true,
  },
];

export default function AlarmScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>알림</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => router.push("/mp/alarm")}>
            <SettingIcon width={24} height={24} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <View style={styles.textBlock}>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
              <Text style={[styles.title, !item.isRead && styles.unreadTitle]}>
                {item.title}
              </Text>
            </View>
            <View style={styles.rightBlock}>
              <Text style={styles.time}>{item.time}</Text>
              {!item.isRead && <View style={styles.unreadDot} />}
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    justifyContent: "space-between",
  },
  backArrow: {
    fontSize: 22,
    color: "#333",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    position: "absolute",
    left: 50,
    right: 50,
    textAlign: "center",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconSpacing: {
    marginRight: 16,
  },
  notificationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  textBlock: {
    flex: 1,
    marginRight: 12,
  },
  subtitle: {
    fontSize: 12,
    color: "#7A7A7A",
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    color: "#000",
  },
  unreadTitle: {
    fontWeight: "bold",
  },
  rightBlock: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  time: {
    fontSize: 12,
    color: "#7A7A7A",
  },
  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#27C200",
    marginTop: 6,
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginHorizontal: 20,
  },
});
