import { notificationEvent } from "@/utils/notificationEvent";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
type NotiPayload = {
  title: string | null;
  body: string | null;
};
export default function ForegroundNotification() {
  const [visible, setVisible] = useState(true);
  const router = useRouter();
  //   const [detailMode, setDetailMode] = useState(false);
  const [payload, setPayload] = useState<NotiPayload | null>(null);
  const translateY = useRef(new Animated.Value(-200)).current;

  // 임시 테스트용 더미 데이터
  //   const payload = {
  //     title: "삼성, 2028년부터 반도체 유리기판 쏜다",
  //     body: "ai뉴스요약ai뉴스요약ai뉴스요약ai뉴스요약ai뉴스요약ai뉴스요약",
  //   };

  //   notificationType: "삼성전자",
  //   relatedEntityId: 123,
  //   sentiment: "0.36",
  //   data: {
  //     postId: 123,
  //     sender: "삼성전자",
  //     category: "반도체/AI",
  //     sentiment: "0.36",
  //   },
  useEffect(() => {
    const handler = (payload: NotiPayload) => {
      setPayload(payload);
      setVisible(true);

      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.delay(4000),
        Animated.timing(translateY, {
          toValue: -120,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setVisible(false);
        // setDetailMode(false); // 상세모드도 초기화
      });
    };

    notificationEvent.on("foregroundNotification", handler);

    return () => {
      notificationEvent.off("foregroundNotification", handler);
    };
  }, [translateY]);

  //   let sentimentNum = 0;
  //   let sentimentText = "0.00";
  //   let sentimentColor = "#40454A";

  //   if (payload) {
  //     sentimentNum = parseFloat(payload.sentiment ?? "0");
  //     sentimentText =
  //       sentimentNum > 0
  //         ? `+${sentimentNum.toFixed(2)}`
  //         : sentimentNum < 0
  //         ? sentimentNum.toFixed(2)
  //         : "0.00";

  //     sentimentColor =
  //       sentimentNum > 0 ? "#F63D55" : sentimentNum < 0 ? "#214DEF" : "#40454A";
  //   }

  const onPress = () => {
    //   if (payload?.data?.postId) {
    //     router.push(`/community/post/${payload.data.postId}`);
    //   }
    setVisible(false);
  };

  if (!visible) return null;
  if (payload) {
    return (
      <Animated.View
        style={[styles.container, { transform: [{ translateY }] }]}
      >
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <View style={styles.subContainer}>
            <Image
              source={require("@/assets/images/push_logo.png")}
              style={{ width: 32, height: 32 }}
            />
            <View style={styles.textContainer}>
              <View style={styles.textHeader}>
                <View style={styles.textBox}>
                  <Text style={styles.newgnal}>Newgnal</Text>
                  <Text style={styles.now}>지금</Text>
                </View>
                {/* <Pressable onPress={() => setDetailMode(false)}>
                  <DownIcon />
                </Pressable> */}
              </View>
              <View style={styles.textBody}>
                <Text style={styles.sender} numberOfLines={2}>
                  {payload.title}
                </Text>
                {/* <Text style={[styles.sentiment, { color: sentimentColor }]}>
                  {" "}
                  [{sentimentText}]
                </Text> */}
              </View>
              <View>
                <Text style={styles.body}>{payload.body}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 16,
    right: 16,
    zIndex: 9999,
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 18,
    backgroundColor: "#F4F5F7",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
  textContainer: {
    flex: 1,
    gap: 6,
  },
  textHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textBox: { flexDirection: "row", alignItems: "center" },
  description: {
    fontSize: 14,
    fontWeight: 400,
    color: "#0E0F15",
  },
  newgnal: {
    color: "#717D89",
    fontSize: 12,
    fontWeight: 400,
  },
  now: {
    marginLeft: 8,
    color: "#717D89",
    fontSize: 12,
    fontWeight: 400,
  },
  subContainer: {
    flexDirection: "row",
    gap: 15,
  },
  sender: {
    fontSize: 14,
    fontWeight: 700,
    color: "#0E0F15",
  },
  title: {
    color: "#40454A",
    fontSize: 13,
    lineHeight: 18,
  },
  sentiment: {
    color: "#F63D55",
    fontWeight: 400,
    fontSize: 13,
  },
  textBody: {
    flexDirection: "row",
    alignItems: "center",
  },
  body: {
    color: "#40454A",
    fontSize: 13,
    fontWeight: 400,
  },
});
