import IcPrepare from "@/assets/images/icon_hourglass.svg";
import { Header } from "@/components/ui/Header";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SimulateIndex() {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header title="모의투자" leftSlot={<Text></Text>} rightSlot={<></>} />
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
  container: {
    flex: 1,
    backgroundColor: "white",
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
    textAlign: "center",
    fontWeight: "400",
    marginTop: 8,
  },
});
