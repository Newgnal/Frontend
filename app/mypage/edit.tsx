import NextSmIcon from "@/assets/images/ic_next_sm_600.svg";
import PlusIcon from "@/assets/images/icn_plus.svg";
import ProfileIcon from "@/assets/images/icn_profile.svg";
import NextLgIcon from "@/assets/images/icon_next_lg.svg";
import { HorizontalLine } from "@/components/ui/HorizontalLine";
import { typography } from "@/styles/typography";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileEditScreen() {
  const router = useRouter();

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <NextLgIcon />
          </Pressable>
          <Text style={[typography.title_t2_18_semi_bold]}>내 정보</Text>
          <View style={{ width: 30 }} />
        </View>

        <HorizontalLine width="100%" style={{ marginBottom: 32 }} />

        <View style={styles.contents}>
          {/* 프로필 아이콘 감싸는 상대 위치 컨테이너 */}
          <View style={styles.profileWrapper}>
            <ProfileIcon />
            {/* Plus 아이콘을 오른쪽 아래에 겹쳐 배치 */}
            <PlusIcon style={styles.plusIcon} />
          </View>
        </View>
        <View style={{ width: "100%", paddingHorizontal: 20, paddingTop: 35 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={[
                typography.subtitle_s2_16_semi_bold,
                { paddingVertical: 12 },
              ]}
            >
              닉네임
            </Text>
            <View style={styles.rowRight}>
              <Text
                style={[typography.body_b3_14_regular, { color: "#5E6974" }]}
              >
                알림잇슈지킴이
              </Text>
              <NextSmIcon />
            </View>
          </View>
          <HorizontalLine />
        </View>

        <View style={{ width: "100%", paddingHorizontal: 20, paddingTop: 17 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={[
                typography.subtitle_s2_16_semi_bold,
                { paddingVertical: 12 },
              ]}
            >
              구독 정보
            </Text>
            <View style={styles.rowRight}>
              <View style={{ borderRadius: 4, backgroundColor: "#EDEEEF" }}>
                <Text
                  style={[
                    typography.body_b3_14_regular,
                    { color: "#484F56", padding: 4 },
                  ]}
                >
                  Basic
                </Text>
              </View>
              <NextSmIcon />
            </View>
          </View>
          <HorizontalLine />
        </View>

        <View style={{ width: "100%", paddingHorizontal: 20, paddingTop: 17 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={[
                typography.subtitle_s2_16_semi_bold,
                { paddingVertical: 12 },
              ]}
            >
              로그인 방식
            </Text>
            <Text style={typography.body_b2_15_medium}>카카오</Text>
          </View>
          <HorizontalLine />
        </View>

        <View style={{ width: "100%", paddingHorizontal: 20, paddingTop: 17 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={[
                typography.subtitle_s2_16_semi_bold,
                { paddingVertical: 12 },
              ]}
            >
              이메일
            </Text>
            <Text style={[typography.body_b3_14_regular, { color: "#5E6974" }]}>
              newgnal@gmail.com
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={{ backgroundColor: "#F4F5F7", borderRadius: 12 }}>
            <Text
              style={[
                typography.subtitle_s3_15_semi_bold,
                {
                  color: "#717D89",
                  textAlign: "center",
                  paddingVertical: 12.5,
                },
              ]}
            >
              로그아웃
            </Text>
          </View>
          <HorizontalLine style={{ marginVertical: 46 }} />
          <Text
            style={[
              typography.caption_c2_12_regular,
              {
                color: "#717D89",
                textAlign: "center",
                textDecorationLine: "underline",
              },
            ]}
          >
            회원 탈퇴
          </Text>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 15,
  },
  contents: {
    justifyContent: "center",
    alignItems: "center",
    // alignSelf: "center",
  },
  rowRight: {
    flexDirection: "row",
  },
  footer: {
    // alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 48,
  },
  profileWrapper: {
    position: "relative", // 기준점
  },

  plusIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});
