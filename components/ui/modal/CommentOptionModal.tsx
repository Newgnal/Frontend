import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function CommentOptionModal({
  isVisible,
  onClose,
  onEdit,
  onDelete,
}: Props) {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropColor="black"
      backdropOpacity={0.3}
      style={styles.modal}
    >
      <View style={styles.container}>
        <Text style={styles.title}>옵션 선택</Text>

        <TouchableOpacity onPress={onEdit} style={styles.option}>
          <Text style={styles.editText}>수정하기</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onDelete} style={styles.option}>
          <Text style={styles.deleteText}>삭제하기</Text>
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
    backgroundColor: "white",
    padding: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0E0F15",
    marginBottom: 24,
  },
  option: {
    paddingVertical: 12,
  },
  editText: {
    fontSize: 15,
    color: "#0E0F15",
    fontWeight: "500",
  },
  deleteText: {
    fontSize: 15,
    color: "#F63D55",
    fontWeight: "500",
  },
});
