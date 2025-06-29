import IcVector from "@/assets/images/Vector.svg";
import CategoryInfoBox from "@/components/CategoryInfoBox";
import { useRouter } from "expo-router";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

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

const sentimentData = [0.6, 0.8, 0.3, 0.5, 0.9, 0.7, 0.6, 0.2, 0.4, 0.5];
const sentimentLabels = [
  "05.01",
  "05.02",
  "05.03",
  "05.04",
  "05.05",
  "05.06",
  "05.07",
  "05.08",
  "05.09",
  "05.10",
];
const newsVolumeData = [20, 50, 33, 27, 44, 38, 61, 48];
const newsVolumeLabels = [
  "05.01",
  "05.02",
  "05.03",
  "05.04",
  "05.05",
  "05.06",
  "05.07",
  "05.08",
];

export default function HomeMain() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20 }}>
        <CategoryInfoBox category="반도체/AI" change="+0.8" />
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
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.newsCard}>
              <View style={styles.newsImage} />
              <Text numberOfLines={2} style={styles.newsTitle}>
                {item.title}
              </Text>
              <Text style={styles.newsMeta}>{item.date}</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.sectionTitleWithIcon}>
          <Text style={styles.sectionTitle}>감성 지표</Text>
          <IcVector width={14} height={14} style={{ marginLeft: 4 }} />
        </View>

        <LineChart
          data={{
            labels: sentimentLabels,
            datasets: [{ data: sentimentData }],
          }}
          width={screenWidth - 40}
          height={180}
          yAxisSuffix=""
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: "#f5f5f5",
            backgroundGradientFrom: "#f5f5f5",
            backgroundGradientTo: "#f5f5f5",
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            labelColor: () => "#666",
            propsForDots: {
              r: "4",
              strokeWidth: "2",
              stroke: "#007AFF",
            },
          }}
          bezier
          style={styles.chartStyle}
        />

        <Text style={[styles.sectionTitle, { marginTop: 12 }]}>뉴스 수</Text>

        <BarChart
          data={{
            labels: newsVolumeLabels,
            datasets: [{ data: newsVolumeData }],
          }}
          width={screenWidth - 40}
          height={100}
          chartConfig={{
            backgroundColor: "#f5f5f5",
            backgroundGradientFrom: "#f5f5f5",
            backgroundGradientTo: "#f5f5f5",
            decimalPlaces: 0,
            color: () => `rgba(0, 122, 255, 1)`,
            labelColor: () => "#666",
          }}
          style={styles.chartStyle}
          yAxisLabel={""}
          yAxisSuffix={""}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  sectionContainer: {
    marginTop: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0E0F15",
  },
  moreText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#A8B2B8",
  },
  newsCard: {
    width: 184,
    padding: 8,
    backgroundColor: "white",
    borderRadius: 8,
    marginRight: 12,
    marginLeft: -10,
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
  sectionTitleWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5.33,
  },
  chartStyle: {
    marginTop: 8,
    borderRadius: 8,
  },
});
