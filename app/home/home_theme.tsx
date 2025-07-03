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

const sentimentData = [
  0.2, 0.5, 0.6, 0.3, 0.4, 0.7, 0.9, 0.6, 0.5, 0.4, 0.6, 0.7, 0.8, 0.5, 0.7,
  0.6, 0.8, 0.9, 0.7, 0.6, 0.5, 0.6, 0.7, 0.8, 0.6, 0.7, 0.5, 0.6, 0.7, 0.6,
];
const sentimentLabels = ["05.01", "05.08", "05.15", "05.22", "05.31"];

const newsVolumeData = [
  20, 30, 28, 25, 22, 40, 35, 31, 30, 26, 28, 23, 32, 38, 34, 37, 33, 28, 25,
  29, 27, 31, 34, 36, 30, 29, 32, 33, 35, 37,
];
const newsVolumeLabels = sentimentLabels;

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

        <View style={styles.chartBox}>
          <LineChart
            data={{
              labels: sentimentLabels,
              datasets: [{ data: sentimentData }],
              legend: [],
            }}
            width={screenWidth - 40}
            height={180}
            withDots={false}
            withShadow={false}
            withInnerLines={false}
            withOuterLines={false}
            withVerticalLines={true}
            withHorizontalLines={false}
            withHorizontalLabels={true}
            yLabelsOffset={10}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 1,
              color: () => "#F99426",
              labelColor: () => "#666",
              propsForDots: { r: "0" },
            }}
            formatYLabel={(value) => {
              if (value === "1") return "+1";
              if (value === "0") return "0";
              if (value === "-1") return "-1";
              return "";
            }}
            segments={2}
            style={styles.chartStyle}
          />

          <View style={styles.labelBox}>
            {sentimentLabels.map((label, idx) => (
              <Text key={idx} style={styles.labelText}>
                {label}
              </Text>
            ))}
          </View>

          <BarChart
            data={{
              labels: newsVolumeLabels,
              datasets: [{ data: newsVolumeData }],
            }}
            width={screenWidth - 40}
            height={100}
            fromZero
            withInnerLines={false}
            withHorizontalLabels={false}
            showValuesOnTopOfBars={false}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              barPercentage: 0.4,
              color: () => "#F99426",
            }}
            style={styles.chartStyle}
            yAxisLabel=""
            yAxisSuffix=""
          />
        </View>
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
  chartBox: {
    marginTop: 8,
    backgroundColor: "#F7F7F7", // 전체 틀 배경
    borderRadius: 8,
    paddingVertical: 8,
  },
  chartStyle: {
    marginVertical: 4,
    borderRadius: 8,
  },
  labelBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: "#EAEAEA",
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: -8,
  },
  labelText: {
    fontSize: 12,
    color: "#333",
  },
});
