import { reverseVoteTypeMap } from "@/utils/convertVoteTypeToKor";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type OpinionTheme = {
  bgColor: string;
  textColor: string;
  barColor: string;
  icon?: (color: string) => React.ReactNode;
};

type PollSectionProps = {
  pollLabels: string[]; // UI에 표시할 투표 항목 라벨 (["매수", "보류", "매도"])
  pollResults: Record<"BUY" | "HOLD" | "SELL", number>; // 투표 항목 별 투표 수
  pollTotalCount: number; // 전체 투표 수 합계
  opinionTheme: Record<string, OpinionTheme>; // 각 투표 항목 라벨별 스타일 테마 설정
  selectedPoll: "BUY" | "HOLD" | "SELL" | null; // 사용자가 선택한 항목 (투표 전에는 null)
  hasVoted: boolean; // 사용자 투표 여부
  userVoted: boolean;
  onSelectPoll: (voteType: "BUY" | "HOLD" | "SELL") => void | Promise<void>; // 투표 항목 클릭 시 함수 호출
};

export const PollSection = ({
  pollLabels,
  pollResults,
  pollTotalCount,
  opinionTheme,
  selectedPoll,
  hasVoted,
  userVoted,
  onSelectPoll,
}: PollSectionProps) => {
  return (
    <View style={styles.pollBox}>
      <View style={styles.pollContainer}>
        <Text style={styles.pollTitle}>이 종목, 지금 어떻게 할까요?</Text>

        <View style={styles.pollOptions}>
          {pollLabels.map((label, idx) => {
            const theme = opinionTheme[label];
            const voteType =
              reverseVoteTypeMap[label as keyof typeof reverseVoteTypeMap];
            const isSelected = selectedPoll === voteType;

            return (
              <TouchableOpacity
                key={label}
                style={[
                  styles.pollButton,
                  {
                    backgroundColor: isSelected ? theme.bgColor : "#FFFFFF",
                  },
                ]}
                onPress={() => {
                  if (!userVoted) {
                    onSelectPoll(voteType);
                  }
                }}
                disabled={userVoted}
              >
                {theme.icon?.(isSelected ? theme.textColor : "#9CA3AF")}
                <Text
                  style={[
                    styles.pollLabel,
                    {
                      fontWeight: isSelected ? "bold" : "normal",
                      color: isSelected ? theme.textColor : "#6B7280",
                      marginTop: 4,
                    },
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {userVoted && (
        <View style={styles.resultContainer}>
          <View style={styles.opinionHeader}>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              다른 사용자들의 의견
            </Text>
            <Text style={{ fontSize: 12, color: "#6B7280" }}>
              답변 {pollTotalCount}
            </Text>
          </View>
          {pollLabels.map((label, idx) => {
            const theme = opinionTheme[label];
            const voteType =
              reverseVoteTypeMap[label as keyof typeof reverseVoteTypeMap];

            const percent = pollTotalCount
              ? Math.round((pollResults[voteType] / pollTotalCount) * 100)
              : 0;
            return (
              <View key={label} style={styles.resultRow}>
                <Text style={styles.resultLabel}>{label}</Text>
                <View style={styles.resultBarWrapper}>
                  <View
                    style={[
                      styles.resultBarFill,
                      {
                        width: `${percent}%`,
                        backgroundColor: theme.barColor,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.resultPercent}>{percent}%</Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pollBox: {},
  pollContainer: {
    backgroundColor: "#F4F5F7",
    borderRadius: 8,
    padding: 20,
  },
  pollTitle: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  pollOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  pollButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 0,
  },
  pollLabel: {
    fontSize: 13,
  },
  opinionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  resultContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginTop: 12,
  },
  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  resultLabel: {
    width: 40,
    fontSize: 12,
    color: "#374151",
  },
  resultBarWrapper: {
    flex: 1,
    height: 6,
    backgroundColor: "#E5E7EB",
    marginRight: 8,
    marginLeft: 6,
    borderRadius: 4,
    overflow: "hidden",
  },
  resultBarFill: {
    height: 6,
    borderRadius: 4,
  },
  resultPercent: {
    width: 36,
    fontSize: 12,
    textAlign: "right",
    color: "#374151",
  },
});
