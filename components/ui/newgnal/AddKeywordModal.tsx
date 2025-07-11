import { useKeywordStore } from "@/store/keywordStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import uuid from "react-native-uuid";

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
  const newId = uuid.v4();

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <KeyboardAvoidingView>
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
              <Text style={{ color: "#04E38F" }}>{keyword.length}</Text>
              <Text style={{ color: "#89939F" }}> / {maxLength}</Text>
            </Text>
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={() => {
                if (keyword.trim() === "") return;

                useKeywordStore.getState().addKeyword({
                  id: uuid.v4().toString(),
                  name: keyword.trim(),
                  hasNewNews: false,
                  newsCount: 0,
                  alertOn: true,
                });

                setKeyword("");
                router.push("/(tabs)/mynewgnal/keywordlist");
              }}
            >
              <Text style={styles.confirmText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    backgroundColor: "#F4F5F7",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    fontSize: 16,
    color: "#0E0F15",
    fontWeight: "600",
    marginBottom: 6,
    alignSelf: "center",
  },
  sub: {
    fontSize: 15,
    color: "#5E6974",
    marginTop: 8,
    alignSelf: "center",
    fontWeight: "500",
    marginBottom: 24,
  },
  inputWrapper: {
    position: "relative",
    marginBottom: 24,
    color: "#FFFFFF",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 14,
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
    width: 163.5,
    height: 48,
    flex: 1,
    backgroundColor: "#E4E6E7",
    padding: 14,
    borderRadius: 12,
    paddingVertical: 11,
    paddingHorizontal: 16,
  },
  confirmBtn: {
    flex: 1,
    backgroundColor: "#2E3439",
    padding: 14,
    width: 163.5,
    height: 48,
    borderRadius: 12,
    paddingVertical: 11,
    paddingHorizontal: 16,
  },
  cancelText: {
    color: "#5E6974",
    fontSize: 15,
    textAlign: "center",
    fontWeight: "600",
  },
  confirmText: {
    color: "#F4F5F7",
    fontSize: 15,
    textAlign: "center",
    fontWeight: "600",
  },
});
