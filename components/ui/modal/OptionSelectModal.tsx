import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

export default function OptionSelectModal({
  isVisible,
  onClose,
  onFeedbackPress,
}: {
  isVisible: boolean;
  onClose: () => void;
  onFeedbackPress: () => void;
}) {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.modalContainer}>
        <Text style={styles.title}>옵션 선택</Text>
        <TouchableOpacity onPress={onFeedbackPress} style={styles.optionBtn}>
          <Text style={styles.optionText}>피드백 보내기</Text>
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
  modalContainer: {
    backgroundColor: "white",
    paddingTop: 24,
    paddingBottom: 52,
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
  optionBtn: {
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#0E0F15",
  },
});
