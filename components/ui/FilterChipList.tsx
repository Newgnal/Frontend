import IcDropdown from "@/assets/images/ic_dropdown.svg";
import IcMoveActive from "@/assets/images/ic_move_active.svg";
import IcThemeModalActive from "@/assets/images/ic_them_modal-1.svg";
import IcThemeModal from "@/assets/images/ic_them_modal.svg";
import { typography } from "@/styles/typography";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import {
  gestureHandlerRootHOC,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Modal from "react-native-modal";
import Animated from "react-native-reanimated";

const DraggableChipItem = gestureHandlerRootHOC(function DraggableChipItem({
  item,
  drag,
  isActive,
  selected,
  isSortMode,
  handleSelect,
}: {
  item: { key: string; label: string };
  drag: () => void;
  isActive: boolean;
  selected: string;
  isSortMode: boolean;
  handleSelect: (key: string) => void;
}) {
  return (
    <ScaleDecorator>
      <Animated.View style={styles.modalItem}>
        <TouchableOpacity
          onLongPress={drag}
          style={{ flex: 1 }}
          disabled={isActive}
          onPress={() => !isSortMode && handleSelect(item.key)}
        >
          <Text
            style={[
              styles.modalItemText,
              isSortMode
                ? styles.selectedModalItemText
                : selected === item.key
                ? styles.selectedModalItemText
                : styles.unselectedModalItemText,
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>

        {isSortMode ? (
          <TouchableOpacity onPressIn={drag} hitSlop={10}>
            <IcMoveActive width={16} height={16} />
          </TouchableOpacity>
        ) : (
          <Ionicons
            name="checkmark"
            size={16}
            color={selected === item.key ? "#0E0F15" : "#D5DADD"}
          />
        )}
      </Animated.View>
    </ScaleDecorator>
  );
});

const initialChipOptions = [
  { key: "semiconductor", label: "반도체/AI" },
  { key: "it", label: "IT/인터넷" },
  { key: "finance", label: "금융/보험" },
  { key: "mobility", label: "모빌리티" },
  { key: "defense", label: "방산/항공우주" },
  { key: "green", label: "2차전지/친환경E" },
  { key: "realestate", label: "부동산/리츠" },
  { key: "bond", label: "채권/금리" },
  { key: "health", label: "헬스케어/바이오" },
  { key: "forex", label: "환율/외환" },
  { key: "commodity", label: "원자재/귀금속" },
  { key: "etc", label: "기타" },
];

interface FilterChipListProps {
  selectedKey: string;
  onSelect: (key: string) => void;
}

export default function FilterChipList({
  selectedKey,
  onSelect,
}: FilterChipListProps) {
  const [chips, setChips] = useState(initialChipOptions);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSortMode, setSortMode] = useState(false);

  const handleSelect = (key: string) => {
    setModalVisible(false);
    if (typeof onSelect === "function") {
      onSelect(key);
    }
  };

  const visibleChips = (() => {
    const base = chips.slice(0, 4);
    const selectedItem = chips.find((c) => c.key === selectedKey);
    if (!selectedItem) return base;

    if (base.some((item) => item.key === selectedItem.key)) return base;

    return [selectedItem, ...base.slice(0, 3)];
  })();

  return (
    <View style={{ marginTop: 12 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8 }}
      >
        {visibleChips.map((item) => (
          <TouchableOpacity
            key={item.key}
            onPress={() => onSelect(item.key)}
            style={[
              styles.chip,
              selectedKey === item.key && styles.selectedChip,
            ]}
          >
            <Text
              style={[
                styles.chipText,
                selectedKey === item.key && styles.selectedChipText,
              ]}
            >
              {item.label}
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
        propagateSwipe
        useNativeDriver={false}
        style={{ margin: 0, justifyContent: "flex-end" }}
      >
        <GestureHandlerRootView style={{ flex: 0 }}>
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
              keyExtractor={(item) => item.key}
              onDragEnd={({ data }) => setChips(data)}
              activationDistance={0}
              ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
              contentContainerStyle={{ paddingTop: 24 }}
              renderItem={({ item, drag, isActive }) => (
                <DraggableChipItem
                  item={item}
                  drag={drag}
                  isActive={isActive}
                  selected={selectedKey}
                  isSortMode={isSortMode}
                  handleSelect={handleSelect}
                />
              )}
            />
          </View>
        </GestureHandlerRootView>
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
    ...typography.label_l2_13_medium,
    color: "#484F56",
    letterSpacing: 0.078,
  },
  selectedChip: {
    backgroundColor: "#484F56",
  },
  selectedChipText: {
    ...typography.label_l2_13_medium,
    color: "#F4F5F7",
  },
  dropdownButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#F4F5F7",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
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
    ...typography.header_h3_20_bold,
    color: "#0E0F15",
    lineHeight: 30,
  },
  modalSubtitle: {
    ...typography.label_l3_13_regular,
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
  unselectedModalItemText: {
    ...typography.body_b1_16_medium,
    color: "#A8B2B8",
  },
  selectedModalItemText: {
    ...typography.body_b1_16_medium,
    color: "#2E3439",
  },
});
