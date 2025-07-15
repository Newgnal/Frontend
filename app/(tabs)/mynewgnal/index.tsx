import Icadd from "@/assets/images/Group (1).svg";
import Icfix from "@/assets/images/ic_fix.svg";
import AddKeywordModal from "@/components/ui/newgnal/AddKeywordModal";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import {
  getKeywords,
  getPopularKeywords,
  postKeyword,
} from "@/components/api/useKeywordApi";
import { useKeywordStore } from "@/store/keywordStore"; //프론트 타입
import { PopularKeyword, ServerKeyword } from "@/types/keyword"; //백엔드 타입

export default function MyNewgnalScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [popularKeywords, setPopularKeywords] = useState<PopularKeyword[]>([]);
  const { addKeyword, setKeywords } = useKeywordStore();
  const router = useRouter();

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const serverKeywords = await getKeywords();
        const adapted = serverKeywords.map((item) => ({
          id: String(item.keywordId),
          name: item.keywordName,
          newsCount: item.count,
          hasNewNews: false,
          alertOn: true,
        }));
        setKeywords(adapted);

        if (adapted.length > 0) {
          router.replace("/mynewgnal/keywordlist");
        }
      } catch (e) {}
    };

    const fetchPopular = async () => {
      try {
        const res = await getPopularKeywords(5);
        setPopularKeywords(res);
      } catch (e) {}
    };

    fetchKeywords();
    fetchPopular();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>내 뉴그널</Text>

          <View style={styles.headerIcons}>
            <TouchableOpacity
              onPress={() =>
                Toast.show({ type: "warning", text1: "키워드를 추가해주세요" })
              }
            >
              <Icfix width={24} height={24} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
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
              <View style={{ flex: 1 }}>
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

        <Text style={styles.sectionTitle}></Text>
        <View style={styles.noticeBox}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Icadd width={24} height={24} />
          </TouchableOpacity>
          <Text style={styles.noticeText}>
            관심 키워드를 등록하면,{"\n"}뉴그널이 관련 뉴스를 실시간으로
            알려드려요!
          </Text>
        </View>

        <Text style={styles.captionText}>
          키워드 설정은 최대 3개까지 가능합니다
        </Text>

        <AddKeywordModal
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onConfirm={async (keyword) => {
            const trimmed = keyword.trim();
            const keywords = useKeywordStore.getState().keywords;
            if (keywords.some((k) => k.name === trimmed)) {
              Toast.show({ type: "warning", text1: "이미 등록된 키워드예요" });
              return;
            }
            if (trimmed.length < 2 || trimmed.length > 10) {
              Toast.show({
                type: "warning",
                text1: "키워드는 2자 이상 10자 이하로 입력해주세요",
              });
              return;
            }
            try {
              const serverKeyword: ServerKeyword = await postKeyword(trimmed);

              const newKeyword = {
                id: String(serverKeyword.id),
                name: serverKeyword.keyword,
                newsCount: 0,
                hasNewNews: false,
                alertOn: true,
              };
              addKeyword(newKeyword);
              Toast.show({
                type: "success",
                text1: "키워드가 등록되었어요",
              });
              router.push("/mynewgnal/keywordlist");
            } catch (e: any) {
              console.log(
                " 등록 실패 에러",
                e?.response?.data || e.message || e
              );
            }
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  divider: {
    height: 1,
    backgroundColor: "#EDEEEF",
    marginTop: 13,
  },
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  sectionTitle: {
    fontSize: 15,
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
    marginBottom: 8,
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
  newsTitle: {
    fontSize: 13,
    fontWeight: "500",
    color: "#000000",
    flexShrink: 1,
    flexWrap: "wrap",
    lineHeight: 18,
  },
  newsMeta: {
    fontSize: 11,
    color: "#484F56",
    marginTop: 4,
    fontWeight: "400",
  },
  noticeBox: {
    width: 325,
    height: 158,
    backgroundColor: "#F4F5F7",
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  noticeText: {
    textAlign: "center",
    color: "#484F56",
    fontSize: 15,
    marginTop: 20,
    fontWeight: "600",
  },
  captionText: {
    textAlign: "center",
    color: "#717D89",
    fontSize: 12,
    marginTop: 40,
    fontWeight: "400",
  },
});
