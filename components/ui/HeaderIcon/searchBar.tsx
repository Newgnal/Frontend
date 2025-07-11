import IcGraySearch from "@/assets/images/ic_search.gray.svg";
import IcClose from "@/assets/images/icon_close.svg";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

export default function SearchBar({
  value,
  onChangeText,
  onSubmitEditing,
  onClear,
}: {
  value: string;
  onChangeText: (text: string) => void;
  onSubmitEditing: () => void;
  onClear: () => void;
}) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.searchBar}>
        <IcGraySearch width={24} height={24} />

        <TextInput
          style={styles.input}
          placeholder="어떤 테마가 궁금하신가요?"
          placeholderTextColor="#89939F"
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          returnKeyType="search"
        />

        {true && (
          <Pressable onPress={onClear} style={styles.clearButton}>
            <IcClose width={20} height={20} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    width: 348,
    height: 38,
    paddingHorizontal: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#111",
    fontWeight: "400",
    paddingVertical: 0,
  },
  clearButton: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});
