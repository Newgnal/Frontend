import CheckDefaultIcon from "@/assets/images/ic_check_default.svg";
import CheckSelectedIcon from "@/assets/images/ic_check_selected.svg";
import OutIcon from "@/assets/images/ic_out.svg";
import { typography } from "@/styles/typography";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (category: string) => void;
}

export default function CategoryModal({ isVisible, onClose, onSelect }: Props) {
  const [selectedItem, setSelectedItem] = useState<string>("");

  const categories = [
    "반도체/AI",
    "IT/인터넷",
    "금융/보험",
    "방산/항공우주",
    "2차전지/친환경E",
    "모빌리티",
    "부동산/리츠",
    "채권/금리",
    "헬스케어/바이오",
    "환율/외환",
    "원자재/귀금속",
    "기타",
  ];

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.sheet}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>주제 선택하기</Text>
          <Pressable onPress={onClose}>
            <OutIcon />
          </Pressable>
        </View>
        <Text style={styles.desc}>이 글이 올라갈 카테고리를 선택해주세요</Text>
        <View style={styles.itemContainer}>
          {categories.map((item) => (
            <Pressable
              key={item}
              onPress={() => {
                setSelectedItem(item);
                onSelect(item);
              }}
              style={styles.itemBox}
            >
              <Text
                style={[
                  styles.itemText,
                  {
                    color: selectedItem === item ? "#2E3439" : "#A8B2B8",
                  },
                ]}
              >
                {item}
              </Text>
              {selectedItem === item ? (
                <CheckSelectedIcon />
              ) : (
                <CheckDefaultIcon />
              )}
            </Pressable>
          ))}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: { justifyContent: "flex-end", margin: 0 },
  sheet: {
    backgroundColor: "#F4F5F7",
    paddingTop: 24,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: { ...typography.header_h3_20_bold },
  titleBox: { flexDirection: "row", justifyContent: "space-between" },
  desc: {
    ...typography.label_l3_13_regular,
    color: "#717D89",
    paddingBottom: 24,
    paddingTop: 4,
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
