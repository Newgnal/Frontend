import IcOrderChange from "@/assets/images/ic_orderchange.svg";
import FilterChipList from "@/components/ui/FilterChipList";
import HeaderIcons from "@/components/ui/HeaderIcon/HeaderIcons";
import { HorizontalLine } from "@/components/ui/HorizontalLine";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Line } from "react-native-svg";
import { typography } from "../../../styles/typography";
import HomeAll from "../../home/home_all";
import HomeMain from "../../home/home_theme";

export default function HomeScreen() {
  useEffect(() => {
    const logFCMToken = async () => {
      const token = await AsyncStorage.getItem("fcm_token");
      if (token) {
        console.log("저장된 FCM 토큰:", token);
      } else {
        console.log("저장된 FCM 토큰이 없습니다.");
      }
    };

    logFCMToken();
  }, []);
  const [selectedTab, setSelectedTab] = useState<"theme" | "all">("theme");
  const [order, setOrder] = useState<"latest" | "views">("latest");
  const [selectedCategory, setSelectedCategory] = useState("semiconductor");
  const now = new Date();
  const formattedTime = `${now.getHours()}:${String(now.getMinutes()).padStart(
    2,
    "0"
  )} 기준`;

  return (
    <SafeAreaView style={{ backgroundColor: "#FFFFFF", paddingVertical: 20 }}>
      <View style={styles.headerRow}>
        <View style={styles.titleRow}>
          <TouchableOpacity onPress={() => setSelectedTab("theme")}>
            <Text
              style={[
                typography.header_h3_20_bold,
                { color: selectedTab === "theme" ? "black" : "#A8B2B8" },
              ]}
            >
              테마
            </Text>
          </TouchableOpacity>

          <Svg height="20" width="2" style={styles.divider}>
            <Line x1="0" y1="0" x2="0" y2="20" stroke="black" strokeWidth="2" />
          </Svg>

          <TouchableOpacity onPress={() => setSelectedTab("all")}>
            <Text
              style={[
                typography.header_h3_20_bold,
                { color: selectedTab === "all" ? "black" : "#A8B2B8" },
              ]}
            >
              전체
            </Text>
          </TouchableOpacity>
        </View>

        <HeaderIcons />
      </View>

      <HorizontalLine />

      {selectedTab === "all" && (
        <View style={styles.infoRow}>
          <Text style={styles.timestamp}>{formattedTime}</Text>
          <TouchableOpacity
            style={styles.orderRow}
            onPress={() =>
              setOrder((prev) => (prev === "latest" ? "views" : "latest"))
            }
          >
            <Text style={styles.orderText}>
              {order === "latest" ? "최신순" : "조회순"}
            </Text>
            <IcOrderChange width={24} height={24} style={styles.orderIcon} />
          </TouchableOpacity>
        </View>
      )}

      {selectedTab === "theme" && (
        <View style={{ paddingTop: 8, paddingHorizontal: 20, marginBottom: 4 }}>
          <FilterChipList
            selectedKey={selectedCategory}
            onSelect={(key) => {
              setSelectedCategory(key);
            }}
          />
        </View>
      )}

      {selectedTab === "theme" ? (
        <HomeMain selectedCategoryId={selectedCategory} />
      ) : (
        <HomeAll order={order} />
      )}
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
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 4,
  },
  timestamp: {
    ...typography.caption_c1_11_regular,
    color: "#717D89",
  },
  orderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  orderText: {
    ...typography.label_l2_13_medium,
    color: "#717D89",
  },
  orderIcon: {
    marginTop: 1,
  },
});
