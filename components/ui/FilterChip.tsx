import { typography } from "@/styles/typography";
import { Pressable, StyleSheet, Text } from "react-native";

interface Props {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export default function FilterChip({ label, selected, onPress }: Props) {
  return (
    <Pressable
      style={[
        styles.chip,
        selected ? styles.selectedChip : styles.unselectedChip,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          selected ? styles.selectedText : styles.unselectedText,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    borderRadius: 100,
    marginRight: 8,
  },
  selectedChip: {
    backgroundColor: "#484F56",
  },
  unselectedChip: {
    backgroundColor: "#F1F3F5",
  },
  text: {
    ...typography.label_l2_13_medium,
    letterSpacing: 0.078,
    textAlign: "center",
  },
  selectedText: {
    color: "#F4F5F7",
  },
  unselectedText: {
    color: "#4B5563",
  },
});
