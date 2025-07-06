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
import Svg, { Line } from "react-native-svg";

const screenWidth = Dimensions.get("window").width;

const year = 2025;
const month = 5;
const lastDate = new Date(year, month, 0).getDate();

const sentimentData = Array(lastDate)
  .fill(0)
  .map(() => parseFloat((Math.random() * 2 - 1).toFixed(2)));

const newsVolumeData = Array(lastDate)
  .fill(0)
  .map(() => Math.floor(Math.random() * 1400));

const allLabels = Array.from(
  { length: lastDate },
  (_, i) => `06.${String(i + 1).padStart(2, "0")}`
);
const displayLabels = allLabels.map((label, i) => (i % 7 === 0 ? label : ""));

const fullLength = lastDate;

const isPositive = sentimentData.reduce((sum, v) => sum + v, 0) >= 0;
const sentimentColor = isPositive ? "#F63D55" : "#497AFA";

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
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/news/[id]",
                  params: { id: item.id },
                })
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
          <View style={styles.fullOverlay}>
            <Svg height="126" width="100%">
              {[...Array(fullLength)].map((_, i) => (
                <Line
                  key={i}
                  x1={`${(100 / (fullLength - 1)) * i}%`}
                  y1="0"
                  x2={`${(100 / (fullLength - 1)) * i}%`}
                  y2="100%"
                  stroke={i % 7 === 0 ? "#40454A" : "#D9D9D9"}
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              ))}
            </Svg>
          </View>

          <View style={{ position: "relative", height: 126 }}>
            <LineChart
              data={{
                labels: allLabels,
                datasets: [{ data: sentimentData }],
                legend: [],
              }}
              width={335}
              height={126}
              withDots={false}
              withShadow={false}
              withInnerLines={false}
              withOuterLines={false}
              withVerticalLines={false}
              withHorizontalLines={false}
              withHorizontalLabels={true}
              yLabelsOffset={10}
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 1,
                color: () => sentimentColor,
                labelColor: () => "#666",
                propsForDots: { r: "0" },
              }}
              formatYLabel={() => ""}
              segments={5}
              style={styles.chartStyle}
            />

            <View style={{ position: "absolute", right: 0, top: 0 }}>
              <Text style={{ fontSize: 12, color: "#666" }}>+1</Text>
            </View>
            <View style={{ position: "absolute", right: 0, top: 50 }}>
              <Text style={{ fontSize: 12, color: "#666" }}>0</Text>
            </View>
            <View style={{ position: "absolute", right: 0, bottom: 10 }}>
              <Text style={{ fontSize: 12, color: "#666" }}>-1</Text>
            </View>
          </View>

          <View style={styles.labelBox}>
            {displayLabels.map((label, idx) => (
              <Text key={idx} style={styles.labelText}>
                {label}
              </Text>
            ))}
          </View>
        </View>

        <View
          style={[
            styles.chartBox,
            { backgroundColor: "transparent", paddingHorizontal: 0 },
          ]}
        >
          <Text style={styles.newsVolumeTitle}>뉴스 수</Text>

          <BarChart
            data={{ labels: [], datasets: [{ data: newsVolumeData }] }}
            width={343}
            height={94}
            fromZero
            withInnerLines={false}
            withHorizontalLabels={false}
            withVerticalLabels={false}
            showValuesOnTopOfBars={false}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              barPercentage: 0.4,
              color: () => sentimentColor,
              fillShadowGradient: sentimentColor,
              fillShadowGradientOpacity: 1,
              propsForBackgroundLines: {
                strokeWidth: 0,
              },
            }}
            style={styles.chartStyle}
            yAxisLabel=""
            yAxisSuffix=""
          />

          <View style={{ position: "absolute", right: 0, top: 50 }}>
            <Text style={{ fontSize: 12, color: "#666" }}>1.4k</Text>
          </View>
          <View style={{ position: "absolute", right: 0, top: 85 }}>
            <Text style={{ fontSize: 12, color: "#666" }}>400</Text>
          </View>
          <View style={{ position: "absolute", right: 0, top: 120 }}>
            <Text style={{ fontSize: 12, color: "#666" }}>0</Text>
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
  newsVolumeTitle: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 18,
    letterSpacing: 0.072,
    color: "#0E0F15",
    marginTop: 8,
    marginBottom: 10,
  },
});
