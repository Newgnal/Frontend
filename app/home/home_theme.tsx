import CategoryInfoBox from "@/components/CategoryInfoBox";
import { useRouter } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const dummyNews = [
  {
    id: "1",
    title: "제목제목제목제목",
    date: "2025.05.28",
  },
  {
    id: "2",
    title: "제목제목제목제목",
    date: "2025.05.28",
  },
];

export default function HomeMain() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 4 }}>
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
            <View style={styles.newsCard}>
              <View style={styles.newsImage} />
              <Text numberOfLines={2} style={styles.newsTitle}>
                {item.title}
              </Text>
              <Text style={styles.newsMeta}>{item.date}</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>감성 지표</Text>

        <View
          style={{ height: 180, backgroundColor: "#f5f5f5", borderRadius: 8 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  sectionContainer: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0E0F15",
  },
  moreText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#A8B2B8",
  },
  newsCard: {
    width: 184,
    padding: 8,
    backgroundColor: "white",
    borderRadius: 8,
  },
  newsImage: {
    height: 90,
    width: 170,
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
});
