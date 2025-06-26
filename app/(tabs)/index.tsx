import FilterChipList from "@/components/ui/FilterChipList";
import HeaderIcons from "@/components/ui/HeaderIcons";
import { HorizontalLine } from "@/components/ui/HorizontalLine";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Line } from "react-native-svg";
import { typography } from "../../styles/typography";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ paddingVertical: 20 }}>
      <View style={styles.headerRow}>
        <View style={styles.titleRow}>
          <Text style={[typography.header_h3_20_bold]}>테마</Text>
          <Svg height="20" width="2" style={styles.divider}>
            <Line x1="0" y1="0" x2="0" y2="20" stroke="black" strokeWidth="2" />
          </Svg>
          <Text style={[typography.header_h3_20_bold, { color: "#A8B2B8" }]}>
            전체
          </Text>
        </View>
        <HeaderIcons />
      </View>

      {/* <View
        style={{ height: 1.5, backgroundColor: "#E4E6E7", width: "100%" }}
      /> */}
      <HorizontalLine />
      <View style={{ paddingTop: 8 }}>
        <FilterChipList />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    marginHorizontal: 14,
    alignSelf: "center",
    marginTop: 5,
  },
});
