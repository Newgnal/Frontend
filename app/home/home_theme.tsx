import IcVector from "@/assets/images/Vector.svg";
import CategoryInfoBox from "@/components/CategoryInfoBox";
import NewsVolumeChart from "@/components/chart/NewsVolumeChart";
import SentimentChart from "@/components/chart/SentimentChart";
import { sentimentData } from "@/data/sentimentDummy";
import { useRouter } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const averageSentiment =
  sentimentData.reduce((sum, val) => sum + val, 0) / sentimentData.length;
const sentimentColor = averageSentiment >= 0 ? "#F63D55" : "#497AFA";
const sentimentDisplay = `${
  averageSentiment >= 0 ? "+" : ""
}${averageSentiment.toFixed(1)}`;

const dummyNews = [
  {
    id: "1",
    title: "제목제목제목제목제목제목제목제목제목제목",
    date: "2025.05.28",
  },
  {
    id: "2",
    title: "제목제목제목제목제목제목제목제목제목제목",
    date: "2025.05.28",
  },
];

export default function HomeMain() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20 }}>
        <CategoryInfoBox
          category="반도체/AI"
          change={sentimentDisplay}
          color={sentimentColor}
        />
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>주요 뉴스</Text>
          <TouchableOpacity
            onPress={() => router.push("/category/semiconductor")}
          >
            <Text style={styles.moreText}>더 보기 &gt;</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={dummyNews}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingLeft: 0, paddingRight: 12 }}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({ pathname: "/news/[id]", params: { id: item.id } })
              }
            >
              <View style={styles.newsCard}>
                <View style={styles.newsImage} />
                <Text numberOfLines={2} style={styles.newsTitle}>
                  {item.title}
                </Text>
                <Text style={styles.newsMeta}>{item.date}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.sectionTitleWithIcon}>
          <Text style={styles.sectionTitle}>감성 지표</Text>
          <IcVector
            width={14}
            height={14}
            style={{ marginLeft: 4, marginBottom: -2 }}
          />
        </View>

        <View style={styles.chartBox}>
          <SentimentChart color={sentimentColor} />
        </View>

        <View
          style={[
            styles.chartBox,
            { backgroundColor: "transparent", paddingHorizontal: 0 },
          ]}
        >
          <View
            style={[
              styles.chartBox,
              { backgroundColor: "transparent", paddingHorizontal: 0 },
            ]}
          >
            <Text style={styles.newsVolumeTitle}>뉴스 수</Text>
            <NewsVolumeChart color={sentimentColor} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20 },
  sectionContainer: { marginTop: 12 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: { fontSize: 16, fontWeight: "600", color: "#0E0F15" },
  moreText: { fontSize: 13, fontWeight: "500", color: "#A8B2B8" },
  sectionTitleWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5.33,
  },
  chartBox: {
    marginTop: 8,
    backgroundColor: "#F7F7F7",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    minHeight: 140,
  },
  chartStyle: {
    marginVertical: 4,
    borderRadius: 8,
    marginLeft: 0,
  },
  labelBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: "#EAEAEA",
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: -8,
    paddingLeft: 0,
  },
  labelText: { fontSize: 12, color: "#333" },
  fullOverlay: {
    position: "absolute",
    top: 0,
    left: 10,
    right: 10,
    height: 170,
    zIndex: 10,
    pointerEvents: "none",
  },
  newsCard: {
    width: 184,
    padding: 8,
    backgroundColor: "white",
    borderRadius: 8,
  },
  newsImage: {
    height: 100,
    width: 182,
    backgroundColor: "#dcdcdc",
    borderRadius: 4,
    marginBottom: 8,
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0E0F15",
    marginBottom: 4,
  },
  newsMeta: {
    fontSize: 12,
    color: "#717D89",
  },
  newsVolumeTitle: {
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 18,
    letterSpacing: 0.072,
    color: "#0E0F15",

    marginBottom: 5,
  },
});
