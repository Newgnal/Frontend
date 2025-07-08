import { useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";

export default function AddKeywordModal({
  isVisible,
  onClose,
  onConfirm,
}: {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (keyword: string) => void;
}) {
  const [keyword, setKeyword] = useState("");
  const maxLength = 10;
  const router = useRouter();

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.container}>
        <Text style={styles.title}>키워드 입력하기</Text>
        <Text style={styles.sub}>
          키워드를 알려주시면, 관련 뉴스를 알려드릴게요
        </Text>

        <View style={styles.inputWrapper}>
          <TextInput
            value={keyword}
            onChangeText={(text) => {
              if (text.length <= maxLength) setKeyword(text);
            }}
            placeholder="키워드를 입력해주세요. (10자 이내)"
            style={styles.input}
          />
          <Text style={styles.counter}>
            {keyword.length} / {maxLength}
          </Text>
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelText}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.confirmBtn}
            onPress={() => {
              onConfirm(keyword);
              setKeyword("");
              //UI 확인용
              router.push("/newgnal/keywordlist");
            }}
          >
            <Text style={styles.confirmText}>확인</Text>
          </TouchableOpacity>
        </View>
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
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  sub: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 16,
  },
  inputWrapper: {
    position: "relative",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  counter: {
    position: "absolute",
    right: 12,
    bottom: 12,
    fontSize: 12,
    color: "#9CA3AF",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#E5E7EB",
    padding: 14,
    borderRadius: 8,
  },
  confirmBtn: {
    flex: 1,
    backgroundColor: "#1F2937",
    padding: 14,
    borderRadius: 8,
  },
  cancelText: {
    color: "#374151",
    textAlign: "center",
    fontWeight: "600",
  },
  confirmText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});
