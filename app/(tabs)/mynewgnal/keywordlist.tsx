import IcAi from "@/assets/images/Frame 2147228509.svg";
import Icadd from "@/assets/images/Group (1).svg";
import IcAlarm from "@/assets/images/ic_alarm (1).svg";
import IcAlarmOff from "@/assets/images/ic_alarm (2).svg";
import Icfix from "@/assets/images/ic_fix.svg";
import IcNext from "@/assets/images/ic_next_sm.svg";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const dummyKeywords = [
  {
    id: "1",
    name: "엔비디아",
    hasNewNews: false,
    newsCount: 354,
    alertOn: false,
  },
  {
    id: "2",
    name: "엔비디아",
    hasNewNews: true,
    newsCount: 354,
    alertOn: true,
  },
  {
    id: "3",
    name: "엔비디아",
    hasNewNews: true,
    newsCount: 354,
    alertOn: true,
  },
];

export default function MyNewgnalScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>내 뉴그널</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity>
              <Icfix width={24} height={24} />
            </TouchableOpacity>
            <TouchableOpacity>
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
        <FlatList
          data={dummyKeywords}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.keywordItem}>
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
                  <View style={styles.countWithArrow}>
                    <Text style={styles.newsCount}>총 {item.newsCount}개</Text>
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
      </View>
      <IcAi style={styles.aiButton} />
    </SafeAreaView>
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
    fontWeight: "regular",
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
  aiButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
  },
});
