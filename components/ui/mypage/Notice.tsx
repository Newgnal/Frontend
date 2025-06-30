import { HorizontalLine } from "@/components/ui/HorizontalLine";
import { typography } from "@/styles/typography";
import { StyleSheet, Text, View } from "react-native";

interface NoticeProps {
  title: string;
  date: string;
}

export const Notice = ({ title, date }: NoticeProps) => {
  return (
    <View style={styles.content}>
      <Text style={[typography.subtitle_s3_15_semi_bold, { paddingBottom: 4 }]}>
        {title}
      </Text>
      <Text style={[typography.caption_c2_12_regular, { paddingBottom: 4 }]}>
        {date}
      </Text>
      <HorizontalLine />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
});
