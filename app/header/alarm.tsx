import AlarmIcon from "@/assets/images/icon_alarmalert.svg";
import BackIcon from "@/assets/images/icon_next_lg.svg";
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
    subtitle: "📡 [삼성전자] - 뉴그널이 감지한 새로운 뉴스",
    time: "1시간 전",
    isRead: false,
  },
  {
    id: "2",
    title: "삼성, 2028년부터 반도체 유리기판 쓴다",
    subtitle: "📡 [삼성전자] - 뉴그널이 감지한 새로운 뉴스",
    time: "1시간 전",
    isRead: false,
  },
  {
    id: "3",
    title: "삼성, 2028년부터 반도체 유리기판 쓴다",
    subtitle: "📡 [삼성전자] - 뉴그널이 감지한 새로운 뉴스",
    time: "1시간 전",
    isRead: true,
  },
  {
    id: "4",
    title: "삼성, 2028년부터 반도체 유리기판 쓴다",
    subtitle: "📡 [삼성전자] - 뉴그널이 감지한 새로운 뉴스",
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
          <BackIcon width={24} height={24} />
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
              <View style={styles.titleRow}>
                {!item.isRead && (
                  <AlarmIcon width={16} height={16} style={styles.readIcon} />
                )}
                <Text
                  style={[styles.title, !item.isRead && styles.unreadTitle]}
                >
                  {item.title}
                </Text>
              </View>
            </View>
            <View style={styles.rightBlock}>
              <Text style={styles.time}>{item.time}</Text>
              {!item.isRead}
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
    fontSize: 11,
    color: "#7A7A7A",
    marginBottom: 8,
    marginTop: 20,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 15,
    color: "#000",
    marginTop: 8,
  },
  unreadTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  readIcon: {
    marginRight: 4,
  },
  rightBlock: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  time: {
    fontSize: 12,
    color: "#7A7A7A",
  },

  separator: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginHorizontal: 20,
  },
});
