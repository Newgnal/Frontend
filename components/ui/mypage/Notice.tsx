import { HorizontalLine } from "@/components/ui/HorizontalLine";
import { typography } from "@/styles/typography";
import { Pressable, StyleSheet, Text } from "react-native";

interface NoticeProps {
  title: string;
  date: string;
  onPress: () => void;
}

export const Notice = ({ title, date, onPress }: NoticeProps) => {
  return (
    <>
      <Pressable style={styles.content} onPress={onPress}>
        <Text
          style={[typography.subtitle_s3_15_semi_bold, { paddingBottom: 4 }]}
        >
          {title}
        </Text>
        <Text style={[typography.caption_c2_12_regular, { paddingBottom: 4 }]}>
          {date}
        </Text>
      </Pressable>
      <HorizontalLine style={{ marginHorizontal: 20 }} />
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
});
