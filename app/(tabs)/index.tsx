import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Line } from "react-native-svg";
import { typography } from "../../styles/typography";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ paddingVertical: 20 }}>
      <View
        style={{
          paddingVertical: 12,
          paddingHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={[typography.header_h3_20_bold, { alignSelf: "center" }]}>
          테마
        </Text>
        <Svg
          height="20"
          width="2"
          style={{ marginHorizontal: 14, alignSelf: "center", marginTop: 5 }}
        >
          <Line x1="0" y1="0" x2="0" y2="20" stroke="black" strokeWidth="2" />
        </Svg>
        <Text style={[typography.header_h3_20_bold, { color: "#A8B2B8" }]}>
          전체
        </Text>
      </View>
      <View
        style={{ height: 1.5, backgroundColor: "#E4E6E7", width: "100%" }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: "#000",
    marginHorizontal: 14,
    alignSelf: "center",
  },
});
