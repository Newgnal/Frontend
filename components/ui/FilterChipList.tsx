import IcDropdown from "@/assets/images/ic_dropdown.svg";
import IcMoveActive from "@/assets/images/ic_move_active.svg";
import IcThemeModalActive from "@/assets/images/ic_them_modal-1.svg";
import IcThemeModal from "@/assets/images/ic_them_modal.svg";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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
  handleSelect: (label: string) => void;
}) {
  return (
    <ScaleDecorator>
      <Animated.View style={styles.modalItem}>
        <TouchableOpacity
          onLongPress={() => {
            console.log("drag triggered");
            drag();
          }}
          style={{ flex: 1 }}
          disabled={isActive}
          onPress={() => !isSortMode && handleSelect(item.label)}
        >
          <Text
            style={[
              styles.modalItemText,
              styles.boldModalItemText,
              selected === item.label && styles.selectedModalItemText,
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
            color={selected === item.label ? "#0E0F15" : "#D5DADD"}
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

const routeMap: Record<string, string> = {
  semiconductor: "/category/semiconductor",
  it: "/category/it",
  finance: "/category/finance",
  mobility: "/category/mobility",
  defense: "/category/defense",
  green: "/category/green",
  realestate: "/category/realestate",
  bond: "/category/bond",
  health: "/category/health",
  forex: "/category/forex",
  commodity: "/category/commodity",
  etc: "/category/etc",
};

export default function FilterChipList() {
  const router = useRouter();
  const [chips, setChips] = useState(initialChipOptions);
  const [selected, setSelected] = useState("반도체/AI");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSortMode, setSortMode] = useState(false);

  const handleSelect = (label: string) => {
    setSelected(label);
    setModalVisible(false);
    const matched = chips.find((item) => item.label === label);
    if (matched?.key && routeMap[matched.key]) {
      router.push(routeMap[matched.key]);
    }
  };

  return (
    <View style={{ marginTop: 12 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8 }}
      >
        {chips.slice(0, 4).map((item) => (
          <TouchableOpacity
            key={item.key}
            onPress={() => handleSelect(item.label)}
            style={[
              styles.chip,
              selected === item.label && styles.selectedChip,
            ]}
          >
            <Text
              style={[
                styles.chipText,
                selected === item.label && styles.selectedChipText,
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
        style={styles.modal}
      >
        <GestureHandlerRootView style={styles.modalContent}>
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
                  selected={selected}
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
