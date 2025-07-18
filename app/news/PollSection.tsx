import { typography } from "@/styles/typography";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type OpinionTheme = {
  dotColor: string;
  labelColor: string;
  barColor: string;
};

type Props = {
  thema: string;
  hasVoted: boolean;
  isVoteLoaded: boolean;
  selectedPoll: number | null;
  pollResults: number[];
  onVote: (index: number) => void;
  pollLabels: string[];
  opinionTheme: Record<string, OpinionTheme>;
};

export default function VoteSection({
  thema,
  hasVoted,
  isVoteLoaded,
  selectedPoll,
  pollResults,
  onVote,
  pollLabels,
  opinionTheme,
}: Props) {
  const pollTotalCount = pollResults.reduce((acc, val) => acc + val, 0);

  return (
    <View style={styles.container}>
      <View style={styles.pollContainer}>
        <Text style={styles.pollQuestion}>
          이 뉴스가 {thema}에 어떤 영향을 줄까요?
        </Text>

        {isVoteLoaded && (
          <View style={styles.pollOptions}>
            {pollLabels.map((label, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => {
                  if (!hasVoted) onVote(idx);
                }}
                disabled={hasVoted}
                style={styles.dotWrapper}
              >
                <View
                  style={[
                    styles.dot,
                    {
                      backgroundColor:
                        selectedPoll === idx
                          ? opinionTheme[label].dotColor
                          : "#CBD5E1",
                      transform: selectedPoll === idx ? [{ scale: 2.5 }] : [],
                    },
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.pollLabelRow}>
          {pollLabels.map((label, idx) => (
            <Text
              key={idx}
              style={[
                styles.pollLabel,
                selectedPoll === idx && {
                  fontWeight: "bold",
                  color: opinionTheme[label].labelColor,
                },
              ]}
            >
              {label}
            </Text>
          ))}
        </View>
      </View>

      {hasVoted && (
        <View style={styles.resultContainer}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultTitle}>다른 사용자들의 의견</Text>
            <Text style={styles.resultCount}>답변 {pollTotalCount}</Text>
          </View>

          {pollLabels.map((label, idx) => (
            <View key={idx} style={styles.resultBarRow}>
              <Text style={styles.resultLabel}>{label}</Text>
              <View style={styles.resultBarBg}>
                <View
                  style={[
                    styles.resultBar,
                    {
                      backgroundColor: opinionTheme[label].barColor,
                      width: `${pollResults[idx]}%`,
                    },
                  ]}
                />
              </View>
              <Text style={styles.resultPercent}>{pollResults[idx]}%</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  pollContainer: {
    backgroundColor: "#F4F5F7",
    width: 372,
    height: 145,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 24,
    alignSelf: "center",
    justifyContent: "space-between",
  },
  pollQuestion: {
    ...typography.subtitle_s3_15_semi_bold,
    textAlign: "center",
  },
  pollOptions: {
    backgroundColor: "#FFFFFF",
    height: 24,
    borderRadius: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  dotWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  pollLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingHorizontal: 4,
  },
  pollLabel: {
    ...typography.caption_c2_12_regular,
    fontSize: 10,
    color: "#4B5563",
    textAlign: "center",
  },
  resultContainer: {
    marginTop: 20,
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  resultTitle: {
    ...typography.subtitle_s3_15_semi_bold,
  },
  resultCount: {
    ...typography.caption_c2_12_regular,
    fontSize: 12,
    color: "#484F56",
  },
  resultBarRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  resultLabel: {
    width: 70,
    ...typography.caption_c2_12_regular,
    color: "#484F56",
  },
  resultBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: "#F3F4F6",
    borderRadius: 4,
    marginHorizontal: 8,
  },
  resultBar: {
    height: 6,
    borderRadius: 4,
  },
  resultPercent: {
    ...typography.caption_c2_12_regular,
    width: 30,
    marginLeft: 20,
  },
});
