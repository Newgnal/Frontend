import { typography } from "@/styles/typography";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (category: string) => void;
}

export default function PostModal({ isVisible, onClose, onSelect }: Props) {
  const handlePostUpdate = () => {
    onClose();
    onSelect("update");
  };

  const handlePostDelete = () => {
    onClose();
    onSelect("delete");
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.sheet}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>옵션 선택</Text>
        </View>
        <View style={styles.itemContainer}>
          <Pressable onPress={handlePostUpdate} style={styles.itemBox}>
            <Text
              style={[
                styles.itemText,
                {
                  color: "#2E3439",
                },
              ]}
            >
              수정하기
            </Text>
          </Pressable>
          <Pressable onPress={handlePostDelete} style={styles.itemBox}>
            <Text
              style={[
                styles.itemText,
                {
                  color: "#F63D55",
                },
              ]}
            >
              삭제하기
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: { justifyContent: "flex-end", margin: 0 },
  sheet: {
    backgroundColor: "#FFF",
    paddingTop: 24,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: { ...typography.header_h3_20_bold },
  titleBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 24,
  },

  itemContainer: {
    gap: 20,
    paddingBottom: 32,
  },
  itemText: {
    ...typography.body_b2_15_medium,
  },
  itemBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
