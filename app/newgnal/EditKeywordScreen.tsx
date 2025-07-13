import IcDrag from "@/assets/images/ic_move_active.svg";
import IcBack from "@/assets/images/icon_next_lg.svg";
import { Keyword, useKeywordStore } from "@/store/keywordStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";

import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function EditKeywordScreen() {
  const router = useRouter();
  const { keywords, updateKeyword, removeKeyword, setKeywords, addKeyword } =
    useKeywordStore();

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const toggleDeleteState = (id: string) => {
    updateKeyword(id, { isDeleting: true });
    setSelectedId(id);
    setModalVisible(true);
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <IcBack width={24} height={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>키워드 수정</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.doneText}>완료</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
        <DraggableFlatList
          data={keywords}
          keyExtractor={(item) => item.id}
          onDragEnd={({ data }) => setKeywords(data)}
          renderItem={({ item, drag, isActive }: RenderItemParams<Keyword>) => (
            <TouchableOpacity
              onLongPress={drag}
              delayLongPress={100}
              style={[
                styles.keywordItem,
                isActive && { backgroundColor: "#F4F5F7" },
              ]}
            >
              <Text style={styles.keywordText}># {item.name}</Text>
              <View style={styles.rightArea}>
                <TouchableOpacity
                  style={[
                    styles.deleteButton,
                    item.isDeleting && styles.deleteButtonActive,
                  ]}
                  onPress={() => toggleDeleteState(item.id)}
                >
                  <Text
                    style={[
                      styles.deleteText,
                      item.isDeleting && styles.deleteTextActive,
                    ]}
                  >
                    삭제
                  </Text>
                </TouchableOpacity>

                <View
                  style={[
                    styles.dragIconWrapper,
                    isActive && styles.dragIconWrapperActive,
                  ]}
                >
                  <IcDrag width={24} height={24} />
                </View>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingTop: 0 }}
        />
      </SafeAreaView>

      {isModalVisible && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>키워드를 삭제할까요?</Text>
            <Text style={styles.modalSub}>
              삭제하면 이 키워드의 뉴스 알림을 받을 수 없어요
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>취소</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmBtn}
                onPress={() => {
                  removeKeyword(selectedId!);
                  setModalVisible(false);
                  Toast.show({
                    type: "success",
                    text1: "키워드가 삭제되었어요",
                  });
                }}
              >
                <Text style={styles.confirmText}>삭제하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: 56,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0E0F15",
  },
  divider: {
    height: 1,
    backgroundColor: "#EDEEEF",
    marginTop: 0,
  },
  doneText: {
    fontSize: 16,
    color: "#0E0F15",
    fontWeight: "600",
  },
  keywordItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 75,
    borderBottomWidth: 1,
    borderColor: "#F0F1F3",
    paddingHorizontal: 20,
  },
  keywordText: {
    fontSize: 16,
    fontWeight: 500,
    color: "#2E3439",
  },
  rightArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  deleteButton: {
    backgroundColor: "#F4F5F7",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
  },
  deleteButtonActive: {
    backgroundColor: "#A8B2B8",
  },
  deleteText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#484F56",
  },
  deleteTextActive: {
    fontSize: 13,
    color: "#484F56",
    fontWeight: "500",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  modalBox: {
    width: 355,
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: "#F4F5F7",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0E0F15",
    marginBottom: 8,
  },
  modalSub: {
    fontSize: 15,
    color: "#5E6974",
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#E4E6E7",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelText: {
    color: "#5E6974",
    fontWeight: "600",
    fontSize: 15,
  },
  confirmBtn: {
    flex: 1,
    backgroundColor: "#2E3439",
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  confirmText: {
    color: "#F4F5F7",
    fontWeight: "600",
    fontSize: 15,
  },
  dragIconWrapper: {
    padding: 4,
    borderRadius: 8,
  },
  dragIconWrapperActive: {
    backgroundColor: "rgba(113, 125, 137, 0.1)",
  },
});
