import Icadd from "@/assets/images/Group (1).svg";
import IcAlarm from "@/assets/images/ic_alarm (1).svg";
import IcAlarmOff from "@/assets/images/ic_alarm (2).svg";
import Icfix from "@/assets/images/ic_fix.svg";
import IcNext from "@/assets/images/ic_next_sm.svg";
import AddKeywordModal from "@/components/ui/newgnal/AddKeywordModal";
import axiosInstance from "@/lib/axiosInstance";
import { useKeywordStore } from "@/store/keywordStore";
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
import Toast from "react-native-toast-message";

import { PopularKeyword } from "@/types/keyword";

export default function MyNewgnalScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const { keywords, toggleAlert, setKeywords } = useKeywordStore();
  const [recentlyAddedKeyword, setRecentlyAddedKeyword] = useState<
    string | null
  >(null);
  const router = useRouter();
  const [popularKeywords, setPopularKeywords] = useState<PopularKeyword[]>([]);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await axiosInstance.get("/newsroom/v1/popular-keywords", {
          params: { count: 5 },
        });
        const data = res.data?.data;
        if (Array.isArray(data)) {
          setPopularKeywords(data);
        }
      } catch (e) {}
    };

    fetchPopular();
  }, []);

  const handleAddKeyword = () => {
    if (keywords.length >= 3) {
      Toast.show({
        type: "warning",
        text1: "키워드는 3개까지만 등록돼요",
      });
    } else {
      setModalVisible(true);
    }
  };

  useEffect(() => {
    if (!isModalVisible && recentlyAddedKeyword) {
      Toast.show({
        type: "success",
        text1: " 키워드가 등록되었어요",
        position: "top",
      });
      setRecentlyAddedKeyword(null);
    }
  }, [isModalVisible, recentlyAddedKeyword]);

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>내 뉴그널</Text>
            <View style={styles.headerIcons}>
              <TouchableOpacity
                onPress={() => router.push("/newgnal/EditKeywordScreen")}
              >
                <Icfix width={24} height={24} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAddKeyword}>
                <Icadd width={24} height={24} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>실시간 인기 키워드</Text>
          {popularKeywords.length > 0 ? (
            popularKeywords.map((item, idx) => (
              <View key={idx} style={styles.keywordBox}>
                <View style={styles.keywordTag}>
                  <Text style={styles.keywordText}>{item.keyword}</Text>
                </View>
                <View style={styles.keywordContent}>
                  {item.representativeNews ? (
                    <>
                      <Text style={styles.newsTitle}>
                        {item.representativeNews.title}
                      </Text>
                      <Text style={styles.newsMeta}>
                        {item.representativeNews.source} |{" "}
                        {item.representativeNews.timeAgo}
                      </Text>
                    </>
                  ) : (
                    <Text style={styles.newsMeta}>
                      대표 뉴스가 아직 없습니다.
                    </Text>
                  )}
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.newsMeta}>
              오늘의 인기 키워드가 아직 없습니다.
            </Text>
          )}

          <Text style={styles.sectionTitle}>키워드 뉴스</Text>
          <FlatList
            data={keywords}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 40 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.keywordItem}
                onPress={() =>
                  router.push({
                    pathname: "/keyword/[keyword]",
                    params: { keyword: item.name },
                  })
                }
              >
                <View style={styles.keywordLeft}>
                  <Text style={styles.keywordHash}># {item.name}</Text>
                  {item.hasNewNews && (
                    <View style={styles.alertBadge}>
                      <Text style={styles.alertText}>2</Text>
                    </View>
                  )}
                </View>
                <View style={styles.keywordRight}>
                  <View style={styles.iconWithCount}>
                    <TouchableOpacity
                      onPress={() => {
                        const isCurrentlyOn = item.alertOn;
                        toggleAlert(item.id);
                        Toast.show({
                          type: "success",
                          text1: isCurrentlyOn
                            ? "알림이 해제됐어요"
                            : "관련 뉴스가 뜨면 알려드릴게요!",
                          position: "top",
                        });
                      }}
                    >
                      {item.alertOn ? (
                        <IcAlarm
                          width={32}
                          height={32}
                          style={{ marginTop: -15 }}
                        />
                      ) : (
                        <IcAlarmOff
                          width={32}
                          height={32}
                          style={{ marginTop: -15 }}
                        />
                      )}
                    </TouchableOpacity>

                    <View style={styles.countWithArrow}>
                      <Text style={styles.newsCount}>
                        총 {item.newsCount}개
                      </Text>
                      <IcNext width={24} height={24} />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            style={styles.keywordList}
            ListFooterComponent={() => (
              <Text style={styles.captionText}>
                키워드 설정은 최대 3개까지 가능합니다
              </Text>
            )}
          />

          <AddKeywordModal
            isVisible={isModalVisible}
            onClose={() => setModalVisible(false)}
            onConfirm={async (keyword) => {
              try {
                const res = await axiosInstance.post("/newsroom/v1/keywords", {
                  keyword,
                });

                const keywordRes = await axiosInstance.get(
                  "/newsroom/v1/keywords"
                );

                const keywordCounts = keywordRes.data?.data?.keywordCounts;

                if (!Array.isArray(keywordCounts)) {
                  throw new Error("키워드 목록 응답 형식 이상");
                }

                const formattedKeywords = keywordCounts.map((item: any) => ({
                  id: String(item.keywordId),
                  name: item.keywordName,
                  newsCount: item.count,
                  alertOn: true,
                  hasNewNews: false,
                }));

                setKeywords(formattedKeywords);
                setRecentlyAddedKeyword(res.data?.data.keyword);
              } catch (e: any) {
                if (e.response?.status === 409) {
                  Toast.show({
                    type: "warning",
                    text1: "이미 등록된 키워드예요!",
                  });
                } else if (e.response?.status === 400) {
                  Toast.show({
                    type: "warning",
                    text1: "2~10자 키워드만 가능해요",
                  });
                } else {
                  Toast.show({ type: "warning", text1: "등록 실패" });
                }
              } finally {
                setModalVisible(false);
              }
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 39,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0E0F15",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#EDEEEF",
    marginTop: 13,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginTop: 20,
    marginBottom: 12,
  },
  keywordBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 12,
  },
  keywordTag: {
    backgroundColor: "#484F56",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  keywordText: {
    fontSize: 12,
    color: "#FFFFFF",
  },
  keywordContent: {
    flex: 1,
    flexShrink: 1,
  },
  newsTitle: {
    fontSize: 13,
    fontWeight: "500",
    color: "#000000",
    flexShrink: 1,
    flexWrap: "wrap",
    lineHeight: 18,
    maxWidth: 300,
  },
  newsMeta: {
    fontSize: 11,
    color: "#484F56",
    marginTop: 4,
    fontWeight: "400",
  },
  keywordList: {},
  keywordItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 0,
    paddingTop: 20,
    paddingBottom: 0,
    paddingVertical: 16,
    width: 372,
    height: 105,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  keywordLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginTop: -7,
  },
  keywordHash: {
    fontSize: 18,
    fontWeight: "600",
    color: "#40454A",
    lineHeight: 22,
  },
  keywordRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  newsCount: {
    fontSize: 11,
    color: "#5E6974",
    marginBottom: 0,
  },
  alertBadge: {
    backgroundColor: "#04E38F",
    borderRadius: 999,
    width: 16,
    height: 16,
    marginLeft: 9,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 400,
  },
  alertText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "400",
  },
  captionText: {
    textAlign: "center",
    color: "#717D89",
    fontSize: 12,
    marginTop: 40,
    fontWeight: "400",
  },
  iconWithCount: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: "100%",
  },
  countWithArrow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 8,
  },
});
