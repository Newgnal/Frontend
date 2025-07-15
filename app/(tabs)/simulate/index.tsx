import IcPrepare from "@/assets/images/icon_hourglass.svg";
import { HorizontalLine } from "@/components/ui/HorizontalLine";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SimulateIndex() {
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={styles.headerTitle}>모의투자</Text>
          </View>
        </View>
        <HorizontalLine />

        <View style={styles.contentcontainer}>
          <View style={styles.content}>
            <IcPrepare width={40} height={40} />
            <Text style={styles.title}>2025년 4분기 모의투자 개장 준비 중</Text>
            <Text style={styles.subtitle}>
              더 나은 투자 경험을 위해 준비 중이에요
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
    paddingTop: 15,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    height: 60,
    justifyContent: "flex-end",
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
    marginBottom: 13,
  },

  contentcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 24,
  },
  content: {
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#717D89",
    textAlign: "center",
    marginTop: 12,
  },
  subtitle: {
    fontSize: 14,
    color: "#89939F",
    textAlign: "center",
    fontWeight: "400",
    marginTop: 8,
  },
});
