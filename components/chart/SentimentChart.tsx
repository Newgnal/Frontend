import { sentimentData } from "@/data/sentimentDummy";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Svg, { Line } from "react-native-svg";

const screenWidth = Dimensions.get("window").width;
const visibleLabels = ["05.01", "05.08", "05.15", "05.22", "05.31"];

export default function SentimentChart({ color }: { color: string }) {
  return (
    <View style={styles.container}>
      <View style={styles.chartWrapper}>
        <View style={{ position: "relative" }}>
          <LineChart
            data={{
              labels: [],
              datasets: [{ data: sentimentData }],
            }}
            width={screenWidth}
            height={126}
            withDots={false}
            withShadow={false}
            withInnerLines={true}
            withOuterLines={false}
            withVerticalLines={true}
            withHorizontalLines={true}
            yAxisInterval={1}
            yLabelsOffset={-6}
            xLabelsOffset={-4}
            formatYLabel={() => ""}
            segments={2}
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 1,
              color: () => color,
              labelColor: () => "#666",
              propsForBackgroundLines: {
                strokeWidth: 1,
                stroke: "#e5e5e5",
              },
            }}
            bezier={false}
            style={{
              borderRadius: 8,
              marginLeft: -40,
              backgroundColor: "transparent",
            }}
          />

          <Svg
            height={126}
            width={screenWidth}
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            {visibleLabels.map((_, idx) => {
              const x = (screenWidth / 5) * idx + screenWidth / 10 - 16;
              return (
                <Line
                  key={idx}
                  x1={x}
                  y1="0"
                  x2={x}
                  y2="126"
                  stroke="#999"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                />
              );
            })}
          </Svg>
        </View>

        <View style={styles.yAxisRight}>
          <Text style={[styles.yLabel, { marginLeft: 2 }]}>+1</Text>
          <Text style={[styles.yLabel, { marginLeft: 4 }]}>0</Text>
          <Text style={[styles.yLabel, { marginLeft: 2 }]}>-1</Text>
        </View>
      </View>

      <View style={styles.xAxisBox}>
        {visibleLabels.map((label, idx) => (
          <Text key={idx} style={styles.xLabel}>
            {label}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  chartWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "transparent",
    marginTop: -8,
  },
  yAxisRight: {
    height: 126,
    justifyContent: "space-between",
    marginLeft: 4,
    paddingRight: 0,
  },
  yLabel: {
    fontSize: 11,
    color: "#717D89",
    fontWeight: "400",
    marginRight: 10,
  },
  xAxisBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    paddingVertical: 4,
    paddingHorizontal: 0,
    borderRadius: 4,
    marginTop: 0,
    marginRight: 10,
    width: screenWidth,
  },
  xLabel: {
    fontSize: 11,
    color: "#717D89",
    textAlign: "center",
    width: screenWidth / 5,
  },
});
