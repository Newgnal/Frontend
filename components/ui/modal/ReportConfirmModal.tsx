import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onReport: () => void;
}

export default function ReportOptionModal({
  isVisible,
  onClose,
  onReport,
}: Props) {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
      swipeDirection="down"
      onSwipeComplete={onClose}
    >
      <View style={styles.container}>
        <Text style={styles.title}>옵션 선택</Text>

        <TouchableOpacity style={styles.reportBtn} onPress={onReport}>
          <Text style={styles.reportText}>신고하기</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    backgroundColor: "#fff",
    paddingTop: 24,
    paddingBottom: 48,
    paddingHorizontal: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 24,
    color: "#0E0F15",
  },
  reportBtn: {
    paddingVertical: 12,
  },
  reportText: {
    color: "red",
    fontSize: 15,
    fontWeight: "500",
  },
});
