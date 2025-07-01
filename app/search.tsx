import IcSearch from "@/assets/images/ic_search.svg";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const initialKeywords = [
  "반도체",
  "삼성전자",
  "SK하이닉스",
  "감자폭등",
  "금리 인하",
  "대출",
  "한국은행",
];

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [keywords, setKeywords] = useState(initialKeywords);

  const removeKeyword = (word: string) => {
    setKeywords((prev) => prev.filter((k) => k !== word));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchBar}>
        <IcSearch width={18} height={18} />
        <TextInput
          style={styles.input}
          placeholder="어떤 테마가 궁금하신가요?"
          value={query}
          onChangeText={setQuery}
          placeholderTextColor="#aaa"
        />
      </View>

      <Text style={styles.recentTitle}>최근 검색어</Text>
      <View style={styles.tagContainer}>
        {keywords.map((word) => (
          <View key={word} style={styles.tag}>
            <Text style={styles.tagText}>{word}</Text>
            <Pressable onPress={() => removeKeyword(word)}>
              <Text style={styles.tagX}>×</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 12,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#000",
  },
  recentTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 12,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEE",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 13,
    color: "#333",
    marginRight: 4,
  },
  tagX: {
    fontSize: 13,
    color: "#888",
  },
});
