import IcSearch from "@/assets/images/ic_search.svg";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

export default function SearchBar() {
  const router = useRouter();

  return (
    <Pressable
      style={styles.searchBar}
      onPress={() => router.push("/header/search")}
    >
      <IcSearch width={18} height={18} />
      <Text style={styles.placeholder}>어떤 테마가 궁금하신가요?</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 12,
    marginHorizontal: 20,
  },
  placeholder: {
    marginLeft: 8,
    fontSize: 14,
    color: "#999",
  },
});
