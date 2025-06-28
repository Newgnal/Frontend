import IcComnt from "@/assets/images/ic_comnt.svg";
import IcPoll from "@/assets/images/ic_poll.svg";
import { HorizontalLine } from "@/components/ui/HorizontalLine";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { typography } from "../../styles/typography";

const dummyNews = [
  {
    id: "1",
    title: "삼성, 2028년부터 반도체 유리기판 쓴다",
    date: "2025.05.28",
    category: "반도체/AI",
    sentiment: "+0.8",
  },
  {
    id: "2",
    title: "삼성, 2028년부터 반도체 유리기판 쓴다",
    date: "2025.05.28",
    category: "반도체/AI",
    sentiment: "+0.8",
  },
  {
    id: "3",
    title: "삼성, 2028년부터 반도체 유리기판 쓴다",
    date: "2025.05.28",
    category: "반도체/AI",
    sentiment: "+0.8",
  },
  {
    id: "4",
    title: "삼성, 2028년부터 반도체 유리기판 쓴다",
    date: "2025.05.28",
    category: "반도체/AI",
    sentiment: "+0.8",
  },
  {
    id: "5",
    title: "삼성, 2028년부터 반도체 유리기판 쓴다",
    date: "2025.05.28",
    category: "반도체/AI",
    sentiment: "+0.8",
  },
];

export default function HomeAll() {
  const renderItem = ({ item }: { item: (typeof dummyNews)[0] }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.sentiment}>{item.sentiment}</Text>
      </View>

      <View style={styles.contentRow}>
        <View style={styles.textContent}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>매일 경제 | {item.date}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.meta}>조회 2.1만</Text>

            <View style={styles.iconWithText}>
              <IcComnt width={24} height={24} />
              <Text style={styles.meta}>234</Text>
            </View>

            <View style={styles.iconWithText}>
              <IcPoll width={24} height={24} />
              <Text style={styles.meta}>402</Text>
            </View>
          </View>
        </View>

        <View style={styles.imagePlaceholder} />
      </View>

      <HorizontalLine />
    </View>
  );

  return (
    <FlatList
      data={dummyNews}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 80,
    backgroundColor: "#FFFFFF",
  },
  card: {
    height: 136,
    alignSelf: "stretch",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  category: {
    fontSize: 12,
    color: "#484F56",
    backgroundColor: "#F4F5F7",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  sentiment: {
    fontSize: 12,
    color: "#214DEF",
    backgroundColor: "#E7EDFF",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    textAlign: "center",
    letterSpacing: 0.072,
    fontWeight: "400",
    marginTop: 8,
  },
  contentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  textContent: {
    flex: 1,
    flexDirection: "column",
    gap: 8,
  },
  title: {
    ...typography.body_b1_16_medium,
  },
  subtitle: {
    ...typography.caption_c2_12_regular,
    color: "#888",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconWithText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  meta: {
    fontSize: 12,
    color: "#777",
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: "#dcdcdc",
    borderRadius: 4,
  },
});
