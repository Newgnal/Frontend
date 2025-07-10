import IcAi from "@/assets/images/Frame 2147228509.svg";
import Icadd from "@/assets/images/Group (1).svg";
import Icfix from "@/assets/images/ic_fix.svg";
import AddKeywordModal from "@/components/ui/newgnal/AddKeywordModal";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function MyNewgnalScreen() {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>내 뉴그널</Text>
            <View style={styles.headerIcons}>
              <TouchableOpacity>
                <Icfix width={24} height={24} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Icadd width={24} height={24} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>실시간 인기 키워드</Text>
          <View style={styles.keywordBox}>
            <View style={styles.keywordTag}>
              <Text style={styles.keywordText}>삼성전자</Text>
            </View>
            <View>
              <Text style={styles.newsTitle}>
                삼성, 2028년부터 반도체 유리기판 쓴다
              </Text>
              <Text style={styles.newsMeta}>매일 경제 | 7시간 전</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>내 뉴그널</Text>
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
            onConfirm={(keyword) => {
              console.log("입력된 키워드:", keyword);
              setModalVisible(false);
            }}
          />
        </View>
      </SafeAreaView>
      <View style={styles.aiButtonContainer}>
        <View style={styles.aiInner}>
          <View style={styles.pill} />
          <IcAi width={30} height={31} />
          <View style={styles.pill} />
        </View>
      </View>
    </>
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
    flex: 1,
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
  aiButtonContainer: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: "#484F56",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    shadowColor: "#A8B2B8",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 5,
  },
  aiInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  pill: {
    width: 3.3,
    height: 9.6,
    backgroundColor: "white",
    borderRadius: 3.4,
  },
});
