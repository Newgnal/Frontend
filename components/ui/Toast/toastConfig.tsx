import WarningIcon from "@/assets/images/Group (3).svg";
import CheckIcon from "@/assets/images/ic_push.svg";
import { StyleSheet, Text, View } from "react-native";
import { BaseToastProps } from "react-native-toast-message";

export const toastConfig = {
  success: ({ text1 }: BaseToastProps) => (
    <View style={styles.container}>
      <CheckIcon width={24} height={24} />
      <Text style={styles.text}>{text1}</Text>
    </View>
  ),
  warning: ({ text1 }: BaseToastProps) => (
    <View style={styles.container}>
      <WarningIcon width={24} height={24} />
      <Text style={styles.text}>{text1}</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "rgba(14, 15, 21, 0.7)",
    borderRadius: 8,
  },
  text: {
    marginLeft: 8,
    marginTop: -2,
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
});
