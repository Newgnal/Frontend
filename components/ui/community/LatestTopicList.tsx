import DotIcon from "@/assets/images/ic_dot.svg";
import EmptyProfileIcon from "@/assets/images/ic_ellipse.svg";
import ViewIcon from "@/assets/images/ic_eyes.svg";
import HeartIcon from "@/assets/images/ic_hrt_emt.svg";
import MessageIcon from "@/assets/images/ic_message.svg";
import { typography } from "@/styles/typography";
import { StyleSheet, Text, View } from "react-native";
import { HorizontalLine } from "../HorizontalLine";

const dummyData = [
  {
    id: 1,
    username: "테이비",
    time: "16시간 전",
    category: "반도체/AI",
    title: "반도체에 대해 어떻게 생각하세요?",
    content:
      "유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다. 유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다.",
    likes: 10,
    views: 10,
    comments: 10,
  },
  {
    id: 2,
    username: "홍길동",
    time: "2시간 전",
    category: "스타트업",
    title: "요즘 스타트업 근무 환경 어때요?",
    content:
      "요즘 스타트업들은 유연한 환경을 지향하고 있지만, 현실은 조금 다를 수도 있어요.",
    likes: 8,
    views: 25,
    comments: 3,
  },
  {
    id: 3,
    username: "테이비",
    time: "16시간 전",
    category: "반도체/AI",
    title: "반도체에 대해 어떻게 생각하세요?",
    content:
      "유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다. 유기농 야채들 맛을 아는 분들이 이 시대는 많지 않을겁니다.",
    likes: 10,
    views: 10,
    comments: 10,
  },
];

export default function LatestTopicList() {
  return (
    <>
      {dummyData.map((item, index) => (
        <View key={item.id}>
          <View>
            <View style={styles.header}>
              <View style={{ flexDirection: "row", gap: 7 }}>
                <View>
                  <EmptyProfileIcon />
                </View>
                <View>
                  <View>
                    <Text style={typography.label_l2_13_medium}>
                      {item.username}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={[
                        typography.caption_c2_12_regular,
                        { color: "#89939F" },
                      ]}
                    >
                      {item.time}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.category}>
                <Text
                  style={[
                    typography.caption_c2_12_regular,
                    { color: "#484F56", padding: 4 },
                  ]}
                >
                  {item.category}
                </Text>
              </View>
            </View>
            <View style={{ paddingTop: 8 }}>
              <Text
                style={[
                  typography.subtitle_s3_15_semi_bold,
                  { color: "#40454A" },
                ]}
              >
                {item.title}
              </Text>
              <Text
                style={[
                  typography.caption_c2_12_regular,
                  { paddingTop: 4, color: "#717D89" },
                ]}
              >
                {item.content}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <HeartIcon />
                <Text
                  style={[
                    typography.caption_c2_12_regular,
                    { color: "#89939F" },
                  ]}
                >
                  {item.likes}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <ViewIcon />
                <Text
                  style={[
                    typography.caption_c2_12_regular,
                    { color: "#89939F", paddingRight: 4 },
                  ]}
                >
                  {item.views}
                </Text>
                <DotIcon />
                <MessageIcon />
                <Text
                  style={[
                    typography.caption_c2_12_regular,
                    { color: "#89939F" },
                  ]}
                >
                  {item.comments}
                </Text>
              </View>
            </View>
          </View>
          {index !== dummyData.length - 1 && (
            <HorizontalLine style={{ marginBottom: 20 }} />
          )}
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  category: {
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
});
