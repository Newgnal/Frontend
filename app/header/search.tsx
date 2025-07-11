import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import IcCloseTag from "@/assets/images/Group 200.svg";
import BackIcon from "@/assets/images/icon_next_lg.svg";
import SearchBar from "@/components/ui/HeaderIcon/searchBar";

const initialKeywords = [
  "반도체",
  "삼성전자",
  "SK하이닉스",
  "감자폭등",
  "금리 인하",
  "대출",
  "한국은행",
];

export const options = {
  headerShown: false,
};

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [keywords, setKeywords] = useState(initialKeywords);

  const removeKeyword = (word: string) => {
    setKeywords((prev) => prev.filter((k) => k !== word));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.headerRow}>
        <View style={styles.searchContainer}>
          <Pressable onPress={() => router.back()} style={styles.backIcon}>
            <BackIcon width={24} height={24} />
          </Pressable>

          <View style={styles.searchBarWrapper}>
            <SearchBar
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={() => {
                if (!query.trim()) return;
                setKeywords((prev) => {
                  const filtered = prev.filter((k) => k !== query.trim());
                  return [query.trim(), ...filtered];
                });
                setQuery("");
              }}
              onClear={() => setQuery("")}
            />
          </View>
        </View>
      </View>
      <View style={styles.divider} />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.recentTitle}>최근 검색어</Text>
        <View style={styles.tagContainer}>
          {keywords.map((word) => (
            <View key={word} style={styles.tag}>
              <Text style={styles.tagText}>{word}</Text>
              <Pressable
                onPress={() => removeKeyword(word)}
                style={styles.tagXWrapper}
              >
                <IcCloseTag width={8} height={8} />
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  backIcon: {
    marginRight: 16,
  },
  searchBarWrapper: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: 56,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,

    paddingBottom: 8,
    justifyContent: "space-between",
  },
  centerHeader: {
    flex: 1,
    marginHorizontal: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#EDEEEF",
    marginTop: 0,
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 18,
  },

  recentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 16,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    columnGap: 4,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F5F7",
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
    height: 32,
  },
  tagText: {
    fontSize: 14,
    color: "#484F56",
    marginRight: 4,
  },
  tagXWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
  },
});
