import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type Props = {
  value: Date;
  onChange: (date: Date) => void;
};

export const TimePickerBox = ({ value, onChange }: Props) => {
  const [show, setShow] = useState(false);

  const formatTime = (date: Date) =>
    date
      .toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase()
      .replace(/\s/g, "");

  return (
    <View>
      <Pressable style={styles.button} onPress={() => setShow(true)}>
        <Text style={[styles.text, show && styles.textActive]}>
          {formatTime(value)}
        </Text>
      </Pressable>

      <DateTimePickerModal
        isVisible={show}
        mode="time"
        date={value}
        onConfirm={(selected) => {
          setShow(false);
          onChange(selected);
        }}
        onCancel={() => setShow(false)}
        display="spinner"
        is24Hour={false}
        cancelTextIOS="취소"
        confirmTextIOS="완료"
        pickerContainerStyleIOS={{ backgroundColor: "white" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#F4F5F7",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  text: {
    color: "#484F56",
    fontSize: 14,
  },
  textActive: {
    color: "#497AFA",
  },
});
