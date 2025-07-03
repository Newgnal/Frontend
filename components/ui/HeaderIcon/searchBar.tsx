import IcGraySearch from "@/assets/images/ic_search.gray.svg";
import IcClose from "@/assets/images/icon_close.svg";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function SearchBar() {
  const router = useRouter();

  return (
    <View style={styles.wrapper}>
      <Pressable
        style={styles.searchBar}
        onPress={() => router.push("/header/search")}
      >
        <IcGraySearch width={24} height={24} />

        <Text style={styles.placeholder}>어떤 테마가 궁금하신가요?</Text>

        <IcClose width={20} height={20} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 20,
    marginTop: 8,
    alignItems: "center",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
    width: 348,
    height: 38,
  },
  placeholder: {
    flex: 1,
    marginLeft: 8,
    marginRight: 4,
    fontSize: 14,
    color: "#999",
  },
});
