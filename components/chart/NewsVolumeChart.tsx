import { displayLabels, newsVolumeData } from "@/data/sentimentDummy";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;
const MAX_Y_VALUE = 1400;

export default function NewsVolumeChart({ color }: { color: string }) {
  return (
    <View style={styles.chartWrapper}>
      <View style={{ flex: 1 }}>
        <BarChart
          data={{
            labels: displayLabels,
            datasets: [{ data: newsVolumeData }],
          }}
          width={screenWidth - 65}
          height={70}
          fromZero
          withInnerLines={false}
          withHorizontalLabels={false}
          withVerticalLabels={false}
          showValuesOnTopOfBars={false}
          yAxisLabel=""
          yAxisSuffix=""
          segments={2}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0,
            barPercentage: 0.25,
            color: () => color,
            fillShadowGradient: color,
            fillShadowGradientOpacity: 1,
            propsForBackgroundLines: { strokeWidth: 0 },
            labelColor: () => "#666",
          }}
          style={styles.chartStyle}
          yLabelsOffset={-10}
          yAxisInterval={700}
          verticalLabelRotation={0}
        />
      </View>

      <View style={styles.yAxisRight}>
        <Text style={[styles.yLabel, { marginLeft: 2 }]}>1.4k</Text>
        <Text style={[styles.yLabel, { marginLeft: 2 }]}>400</Text>
        <Text style={[styles.yLabel, { marginLeft: 15 }]}>0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chartWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 4,
  },
  chartStyle: {
    backgroundColor: "transparent",
    marginLeft: 3,
    paddingLeft: 0,
    paddingRight: 0,
  },
  yAxisRight: {
    height: 70,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  yLabel: {
    fontSize: 11,
    color: "#717D89",
    fontWeight: "400",
  },
});
