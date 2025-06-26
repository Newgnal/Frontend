import IcDropdown from "@/assets/images/ic_dropdown.svg";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
const chipOptions = [
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

export default function FilterChipList() {
  const [selected, setSelected] = useState<string>("반도체/AI");
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSelect = (label: string) => {
    setSelected(label);
    setModalVisible(false);
  };

  return (
    <View style={{ paddingHorizontal: 20, marginTop: 12 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8 }}
      >
        {chipOptions.slice(0, 4).map((label) => (
          <View
            key={label}
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
          </View>
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
          <Text style={styles.modalTitle}>메뉴</Text>
          <Text style={styles.modalSubtitle}>
            보고 싶은 카테고리를 선택해 주세요
          </Text>
          <FlatList
            data={chipOptions}
            keyExtractor={(item) => item}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            contentContainerStyle={{ paddingTop: 24 }}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleSelect(item)}
                style={styles.modalItem}
              >
                <Text
                  style={[
                    styles.modalItemText,
                    selected === item && styles.selectedModalItemText,
                  ]}
                >
                  {item}
                </Text>

                <Ionicons
                  name="checkmark"
                  size={16}
                  color={selected === item ? "#0E0F15" : "#D5DADD"}
                />
              </Pressable>
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
});
