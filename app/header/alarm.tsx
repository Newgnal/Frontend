import {
  getNotifications,
  markNotificationAsRead,
} from "@/api/homeNotificationApi";
import AlarmIcon from "@/assets/images/icon_alarmalert.svg";
import BackIcon from "@/assets/images/icon_next_lg.svg";
import SettingIcon from "@/assets/images/setting.svg";
import { useAuth } from "@/context/authContext";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type NotificationItem = {
  id: number;
  type: string;
  typeName: string;
  title: string;
  body: string;
  isRead: boolean;
  timeAgo: string;
  createdAt: string;
  readAt: string | null;
  relatedEntityId: number;
  status: string;
};

export default function AlarmScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (typeof userId === "number") {
          const res = await getNotifications(userId);
          console.log(res);
          setNotifications(res.data.notifications);
        }
      } catch (err) {
        console.error("알림 조회 실패:", err);
      }
    };
    fetchNotifications();
  }, [userId]);

  const handleMarkAsRead = async (id: number) => {
    if (typeof userId === "number") {
      try {
        await markNotificationAsRead(id, userId);
      } catch (err) {
        console.error("읽음 처리 실패:", err);
      }
    }
  };

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
      <View style={styles.divider} />
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={async () => {
              if (!item.isRead) {
                await handleMarkAsRead(item.id);
                setNotifications((prev) =>
                  prev.map((n) =>
                    n.id === item.id ? { ...n, isRead: true } : n
                  )
                );
              }
            }}
          >
            <View style={styles.notificationItem}>
              <View style={styles.textBlock}>
                <Text style={styles.subtitle}>📡 {item.title}</Text>
                <View style={styles.titleRow}>
                  <View style={styles.iconWrapper}>
                    {!item.isRead && <AlarmIcon width={24} height={24} />}
                  </View>
                  <Text
                    style={[styles.title, !item.isRead && styles.unreadTitle]}
                  >
                    {item.body}
                  </Text>
                </View>
              </View>
              <View style={styles.rightBlock}>
                <Text style={styles.time}>{item.timeAgo}</Text>
              </View>
            </View>
          </TouchableOpacity>
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
  divider: {
    height: 1,
    backgroundColor: "#EDEEEF",
    marginTop: 0,
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
    marginLeft: 35,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    width: 20,
    height: 20,
    marginRight: 0,
  },
  title: {
    fontSize: 15,
    color: "#000",
    marginTop: 8,
    marginLeft: 17,
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
