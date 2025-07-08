import Icadd from "@/assets/images/Group (1).svg";
import IcAlarm from "@/assets/images/ic_alarm (1).svg";
import Icfix from "@/assets/images/ic_fix.svg";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const dummyKeywords = [
  {
    id: "1",
    name: "엔비디아",
    hasNewNews: false,
    newsCount: 354,
    alertOn: true,
  },
  {
    id: "2",
    name: "삼성전자",
    hasNewNews: true,
    newsCount: 120,
    alertOn: true,
  },
  {
    id: "3",
    name: "네이버",
    hasNewNews: false,
    newsCount: 98,
    alertOn: false,
  },
];

export default function MyNewgnalScreen() {
  return (
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
              <Text style={styles.newsCount}>총 {item.newsCount}개</Text>
              <IcAlarm width={20} height={20} />
            </View>
          </TouchableOpacity>
        )}
        style={styles.keywordList}
      />

      <Text style={styles.captionText}>
        키워드 설정은 최대 3개까지 가능합니다
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
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
  divider: {
    height: 1,
    backgroundColor: "#EDEEEF",
    marginTop: 13,
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
  keywordList: {
    marginTop: 4,
  },
  keywordItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
    height: 85,
  },
  keywordLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  keywordHash: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0E0F15",
  },
  keywordRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  newsCount: {
    fontSize: 14,
    color: "#555",
  },
  alertBadge: {
    backgroundColor: "#00E58F",
    borderRadius: 999,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 6,
    minWidth: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  alertText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  captionText: {
    textAlign: "center",
    color: "#717D89",
    fontSize: 12,
    marginTop: 40,
    fontWeight: "400",
  },
});
