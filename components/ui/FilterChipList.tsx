import IcDropdown from "@/assets/images/ic_dropdown.svg";
import IcMoveActive from "@/assets/images/ic_move_active.svg";
import IcThemeModalActive from "@/assets/images/ic_them_modal-1.svg";
import IcThemeModal from "@/assets/images/ic_them_modal.svg";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import Modal from "react-native-modal";

const initialChipOptions = [
  "반도체/AI",
  "IT/인터넷",
  "금융/보험",
  "모빌리티",
  "방산/항공우주",
  "2차전지/친환경E",
  "부동산/리츠",
  "채권/금리",
  "헬스케어/바이오",
  "환율/외환",
  "원자재/귀금속",
  "기타",
];

const routeMap: Record<string, string> = {
  "반도체/AI": "/category/semiconductor",
  "IT/인터넷": "/category/it",
  "금융/보험": "/category/finance",
  모빌리티: "/category/mobility",
  "방산/항공우주": "/category/defense",
  "2차전지/친환경E": "/category/green",
  "부동산/리츠": "/category/realestate",
  "채권/금리": "/category/bond",
  "헬스케어/바이오": "/category/health",
  "환율/외환": "/category/forex",
  "원자재/귀금속": "/category/commodity",
  기타: "/category/etc",
};

export default function FilterChipList() {
  const [selected, setSelected] = useState<string>("반도체/AI");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSortMode, setSortMode] = useState(false);
  const [chips, setChips] = useState(initialChipOptions);
  const router = useRouter();

  const handleSelect = (label: string) => {
    setSelected(label);
    setModalVisible(false);
    if (routeMap[label]) {
      router.push(routeMap[label]);
    }
  };

  return (
    <View style={{ paddingHorizontal: 20, marginTop: 12 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8 }}
      >
        {chips.slice(0, 4).map((label) => (
          <TouchableOpacity
            key={label}
            onPress={() => handleSelect(label)}
            style={[styles.chip, selected === label && styles.selectedChip]}
          >
            <Text
              style={[
                styles.chipText,
                selected === label && styles.selectedChipText,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.dropdownButton}
        >
          <IcDropdown width={16} height={16} fill="#0E0F15" />
        </TouchableOpacity>
      </ScrollView>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="down"
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeaderRow}>
            <View style={styles.modalTextGroup}>
              <Text style={styles.modalTitle}>
                {isSortMode ? "순서 변경" : "메뉴"}
              </Text>
              <Text style={styles.modalSubtitle}>
                {isSortMode
                  ? "길게 눌러 드래그로 순서를 바꿔보세요"
                  : "보고 싶은 카테고리를 선택해 주세요"}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setSortMode((prev) => !prev)}
              style={styles.iconButton}
            >
              {isSortMode ? (
                <IcThemeModal width={32} height={32} />
              ) : (
                <IcThemeModalActive width={32} height={32} />
              )}
            </TouchableOpacity>
          </View>

          <DraggableFlatList
            data={chips}
            keyExtractor={(item) => item}
            onDragEnd={({ data }) => setChips([...data])}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            contentContainerStyle={{ paddingTop: 24 }}
            renderItem={({ item, drag, isActive }) => (
              <ScaleDecorator>
                <Pressable
                  onLongPress={isSortMode ? drag : undefined}
                  onPress={() => !isSortMode && handleSelect(item)}
                  style={styles.modalItem}
                >
                  <Text
                    style={[
                      styles.modalItemText,
                      isSortMode && styles.boldModalItemText,
                      selected === item &&
                        !isSortMode &&
                        styles.selectedModalItemText,
                    ]}
                  >
                    {item}
                  </Text>

                  {isSortMode ? (
                    <IcMoveActive width={16} height={16} />
                  ) : (
                    <Ionicons
                      name="checkmark"
                      size={16}
                      color={selected === item ? "#0E0F15" : "#D5DADD"}
                    />
                  )}
                </Pressable>
              </ScaleDecorator>
            )}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#F4F5F7",
  },
  chipText: {
    fontSize: 13,
    fontFamily: "Pretendard",
    fontWeight: "500",
    color: "#484F56",
    letterSpacing: 0.078,
  },
  selectedChip: {
    backgroundColor: "#484F56",
  },
  selectedChipText: {
    color: "#F4F5F7",
  },
  dropdownButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#F4F5F7",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
  },
  modalHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTextGroup: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 4,
    flexShrink: 0,
  },
  iconButton: {
    width: 32,
    height: 32,
    backgroundColor: "#F4F5F7",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 73.5,
    alignSelf: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "Pretendard",
    fontWeight: "700",
    color: "#0E0F15",
    lineHeight: 30,
  },
  modalSubtitle: {
    fontSize: 13,
    fontFamily: "Pretendard",
    fontWeight: "400",
    color: "#717D89",
    letterSpacing: 0.078,
    marginTop: 4,
  },
  modalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
  },
  modalItemText: {
    fontSize: 16,
    fontFamily: "Pretendard",
    fontWeight: "500",
    color: "#A8B2B8",
    letterSpacing: 0.096,
    lineHeight: 24,
  },
  selectedModalItemText: {
    color: "#0E0F15",
  },
  boldModalItemText: {
    fontSize: 16,
    fontFamily: "Pretendard",
    fontWeight: "500",
    color: "#2E3439",
  },
});
