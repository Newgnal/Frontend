import {
  getNotifications,
  markNotificationAsRead,
} from "@/api/homeNotificationApi";
import AlarmIcon from "@/assets/images/icon_alarmalert.svg";
import BackIcon from "@/assets/images/icon_next_lg.svg";
import SettingIcon from "@/assets/images/setting.svg";
import { useAuth } from "@/context/authContext";
import { typography } from "@/styles/typography";
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
      <View style={styles.listContainer}>
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
                <View style={styles.iconWrapper}>
                  {!item.isRead && <AlarmIcon width={24} height={24} />}
                </View>
                <View style={styles.textBlock}>
                  <View style={styles.headerBlock}>
                    <Text style={styles.textTitle}>
                      <Text style={styles.highlight}>
                        📡 {item.title.match(/\[.*?\]/)?.[0] || ""}
                      </Text>
                      {item.title.replace(/\[.*?\]/, "")}
                    </Text>
                    <Text style={styles.time}>{item.timeAgo}</Text>
                  </View>
                  <View style={styles.titleRow}>
                    <Text
                      style={[
                        styles.textBody,
                        !item.isRead && styles.unreadTitle,
                      ]}
                    >
                      {item.body}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
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
    paddingTop: 15,
    paddingBottom: 15,
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
    alignItems: "center",
    // paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  textBlock: {
    flex: 1,
  },
  textTitle: {
    fontSize: 11,
    color: "#7A7A7A",
    fontWeight: 400,
  },
  highlight: {
    fontSize: 11,
    color: "#7A7A7A",
    fontWeight: 700,
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
  textBody: {
    ...typography.body_b2_15_medium,
    marginTop: 8,
  },
  unreadTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  readIcon: {
    marginRight: 4,
  },
  headerBlock: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  time: {
    fontSize: 11,
    fontWeight: 400,
    color: "#89939F",
  },

  separator: {
    height: 1,
    backgroundColor: "#EDEEEF",
  },
  listContainer: {
    paddingHorizontal: 20,
  },
});
