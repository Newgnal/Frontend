import VerDotIcon from "@/assets/images/ic_cmnt_etc_ver.svg";
import NextSmIcon from "@/assets/images/ic_next_sm_600.svg";
import NextLgIcon from "@/assets/images/icon_next_lg.svg";
import SettingIcon from "@/assets/images/setting.svg";
import { Header } from "@/components/ui/Header";
import { HorizontalLine } from "@/components/ui/HorizontalLine";
import { TimePickerBox } from "@/components/ui/mypage/TimePickerBox";
import { ToggleSwitch } from "@/components/ui/mypage/ToggleSwitch";
import { usePushTokenSetup } from "@/hooks/usePushTokenSetup";
import { typography } from "@/styles/typography";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  getNotificationSettings,
  setDoNotDisturb,
  updateNotificationType,
} from "@/api/personalNotification";

export default function AlarmScreen() {
  const [isNewsKeywordEnabled, setIsNewsKeywordEnabled] = useState(false);
  const [isCommentEnabled, setIsCommentEnabled] = useState(false);
  const [isLikeEnabled, setIsLikeEnabled] = useState(false);
  const [isVoteEndedEnabled, setIsVoteEndedEnabled] = useState(false);
  const [isReplyEnabled, setIsReplyEnabled] = useState(false);
  const [isNoticeEnabled, setIsNoticeEnabled] = useState(false);
  const [isMarketingPushEnabled, setIsMarketingPushEnabled] = useState(false);
  const router = useRouter();
  // const [newsTime, setNewsTime] = useState(() => {
  //   const date = new Date();
  //   date.setHours(8);
  //   date.setMinutes(0);
  //   return date;
  // });

  const [dndStart, setDndStart] = useState(() => {
    const date = new Date();
    date.setHours(9);
    date.setMinutes(0);
    return date;
  });

  const [dndEnd, setDndEnd] = useState(() => {
    const date = new Date();
    date.setHours(21);
    date.setMinutes(20);
    return date;
  });

  usePushTokenSetup(isNewsKeywordEnabled);

  useEffect(() => {
    const fetchNotificationSettings = async () => {
      try {
        const res = await getNotificationSettings();
        const data = res.data.data;

        setIsNewsKeywordEnabled(data.keywordNewsEnabled);
        setIsCommentEnabled(data.communityCommentEnabled);
        setIsLikeEnabled(data.communityLikeEnabled);
        setIsReplyEnabled(data.communityReplyEnabled);
        setIsNoticeEnabled(data.announcementEnabled);

        setIsDoNotDisturbEnabled(data.doNotDisturbEnabled);

        if (
          data.doNotDisturbEnabled &&
          data.doNotDisturbStartTime &&
          data.doNotDisturbEndTime
        ) {
          const start = new Date();
          start.setHours(data.doNotDisturbStartTime.hour);
          start.setMinutes(data.doNotDisturbStartTime.minute);
          setDndStart(start);

          const end = new Date();
          end.setHours(data.doNotDisturbEndTime.hour);
          end.setMinutes(data.doNotDisturbEndTime.minute);
          setDndEnd(end);
        }
      } catch (err) {
        console.error("알림 설정 조회 실패", err);
      }
    };

    fetchNotificationSettings();
  }, []);

  //방해금지
  const [isDoNotDisturbEnabled, setIsDoNotDisturbEnabled] = useState(false);

  useEffect(() => {
    const updateDoNotDisturb = async () => {
      const formatTime = (date: Date) =>
        `${date.getHours().toString().padStart(2, "0")}:${date
          .getMinutes()
          .toString()
          .padStart(2, "0")}:00`;

      try {
        console.log(" 방해 금지 시간 설정 요청", {
          enabled: isDoNotDisturbEnabled,
          start: formatTime(dndStart),
          end: formatTime(dndEnd),
        });

        await setDoNotDisturb(
          isDoNotDisturbEnabled,
          formatTime(dndStart),
          formatTime(dndEnd)
        );

        console.log(" 방해 금지 설정 완료");
      } catch (error) {
        console.error(" 방해 금지 설정 실패", error);
      }
    };

    updateDoNotDisturb();
  }, [isDoNotDisturbEnabled, dndStart, dndEnd]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header
          title="알림 설정"
          leftSlot={
            <Pressable onPress={() => router.back()}>
              <NextLgIcon />
            </Pressable>
          }
          rightSlot={
            <>
              <SettingIcon />
              <VerDotIcon />
            </>
          }
        />

        <View style={styles.contents}>
          <View style={styles.section}>
            <Text style={typography.subtitle_s2_16_semi_bold}>키워드 뉴스</Text>
            <View style={styles.option}>
              <View>
                <Text style={typography.body_b3_14_regular}>
                  '내 뉴그널' 등록 키워드 뉴스
                </Text>
                <Text
                  style={[
                    typography.caption_c1_11_regular,
                    { color: "#717D89" },
                  ]}
                >
                  관심 키워드가 포함된 뉴스가 올라오면 뉴그널이 알려드려요
                </Text>
              </View>
              <View>
                <ToggleSwitch
                  value={isNewsKeywordEnabled}
                  onToggle={async (value) => {
                    setIsNewsKeywordEnabled(value);
                    await updateNotificationType("KEYWORD_NEWS", value);
                    console.log("서버에 반영됨:", value);
                  }}
                />
              </View>
            </View>
            {/* <View style={styles.option}>
              <Text style={typography.body_b3_14_regular}>뉴스 알림 시간</Text>
              <TimePickerBox value={newsTime} onChange={setNewsTime} />
            </View> */}
            <View style={styles.option}>
              <Text style={typography.body_b3_14_regular}>방해 금지</Text>
              <ToggleSwitch
                value={isDoNotDisturbEnabled}
                onToggle={setIsDoNotDisturbEnabled}
              />
            </View>
            <View style={styles.option}>
              <Text style={typography.body_b3_14_regular}>방해 금지 시간</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <TimePickerBox value={dndStart} onChange={setDndStart} />
                <Text> ~ </Text>
                <TimePickerBox value={dndEnd} onChange={setDndEnd} />
              </View>
            </View>

            <HorizontalLine style={{ marginBottom: 20, marginTop: 12 }} />
            <View style={styles.section}>
              <Text style={typography.subtitle_s2_16_semi_bold}>커뮤니티</Text>
              <View style={styles.option}>
                <Text style={typography.body_b3_14_regular}>내 글에 댓글</Text>
                <ToggleSwitch
                  value={isCommentEnabled}
                  onToggle={async (value) => {
                    setIsCommentEnabled(value);
                    await updateNotificationType("COMMUNITY_COMMENT", value);
                  }}
                />
              </View>
              <View style={styles.option}>
                <Text style={typography.body_b3_14_regular}>
                  내 글에 좋아요
                </Text>
                <ToggleSwitch
                  value={isLikeEnabled}
                  onToggle={async (value) => {
                    setIsLikeEnabled(value);
                    await updateNotificationType("COMMUNITY_LIKE", value);
                  }}
                />
              </View>
              <View style={styles.option}>
                <Text style={typography.body_b3_14_regular}>
                  내 글 투표 마감
                </Text>
                <ToggleSwitch
                  value={isVoteEndedEnabled}
                  onToggle={setIsVoteEndedEnabled}
                />
              </View>
              <View style={styles.option}>
                <Text style={typography.body_b3_14_regular}>
                  답글 알림 받기
                </Text>
                <ToggleSwitch
                  value={isReplyEnabled}
                  onToggle={async (value) => {
                    setIsReplyEnabled(value);
                    await updateNotificationType("COMMUNITY_REPLY", value);
                  }}
                />
              </View>
            </View>
            <HorizontalLine style={{ marginBottom: 20, marginTop: 12 }} />
            <View style={styles.section}>
              <Text style={typography.subtitle_s2_16_semi_bold}>공지사항</Text>
              <View style={styles.option}>
                <Text style={typography.body_b3_14_regular}>공지사항</Text>
                <ToggleSwitch
                  value={isNoticeEnabled}
                  onToggle={async (value) => {
                    setIsNoticeEnabled(value);
                    await updateNotificationType("ANNOUNCEMENT", value);
                  }}
                />
              </View>
            </View>
            <HorizontalLine style={{ marginBottom: 20, marginTop: 12 }} />
            <View style={styles.section}>
              <Text style={typography.subtitle_s2_16_semi_bold}>
                이벤트 및 혜택 알림
              </Text>
              <View style={styles.option}>
                <Text style={typography.body_b3_14_regular}>앱 푸시</Text>
                <ToggleSwitch
                  value={isMarketingPushEnabled}
                  onToggle={setIsMarketingPushEnabled}
                />
              </View>
              <View style={[styles.option, { paddingVertical: 8 }]}>
                <Text style={typography.body_b3_14_regular}>
                  마케팅 정보 수신 동의
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={[
                      typography.body_b3_14_regular,
                      { color: "#5E6974" },
                    ]}
                  >
                    철회함
                  </Text>
                  <NextSmIcon />
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  contents: {
    justifyContent: "center",

    padding: 20,
  },
  section: {
    alignSelf: "flex-start",
    gap: 12,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
});

export const options = {
  headerShown: false,
  tabBarStyle: { display: "none" },
};
