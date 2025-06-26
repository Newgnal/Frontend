import { HorizontalLine } from "@/components/ui/HorizontalLine";
import { typography } from "@/styles/typography";
import { StyleSheet, Text, View } from "react-native";

export default function MyPageScreen() {
  return (
    <>
      <View style={styles.container}>
        <Text style={[typography.title_t2_18_semi_bold]}>마이페이지</Text>
        <HorizontalLine />
        <View>
          <Text>알림잇슈 지킴이</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
