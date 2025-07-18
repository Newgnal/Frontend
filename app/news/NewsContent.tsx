import IcAisummary from "@/assets/images/Vector 2212.svg";
import { typography } from "@/styles/typography";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import RenderHTML from "react-native-render-html";

export default function NewsContent({
  summary,
  htmlContent,
  imageUrl,
  imageCaption,
  imageSize,
}: {
  summary?: string | null;
  htmlContent: string | null;
  imageUrl?: string;
  imageCaption?: string;
  imageSize: { width: number; height: number };
}) {
  const contentWidth = Dimensions.get("window").width - 40;

  return (
    <View style={styles.container}>
      <View style={styles.summaryBox}>
        <View style={styles.labelRow}>
          <IcAisummary style={{ marginRight: 4, marginTop: 2.5 }} />
          <Text style={styles.label}>AI 요약</Text>
        </View>
        <Text style={styles.summaryText}>{summary}</Text>
      </View>
      <View style={styles.contentBox}>
        {htmlContent?.trim() !== "" ? (
          <RenderHTML
            contentWidth={contentWidth}
            source={{ html: `<div>${htmlContent}</div>` }}
            baseStyle={styles.htmlBase}
          />
        ) : (
          <Text style={styles.loading}>뉴스 본문을 불러오는 중입니다...</Text>
        )}
      </View>

      {imageUrl && (
        <>
          <Image
            source={{ uri: imageUrl }}
            style={{
              width: imageSize.width,
              height: imageSize.height,
              borderRadius: 6,
              marginTop: 20,
            }}
            resizeMode="cover"
          />
          <Text style={styles.imageCaption}>{imageCaption}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20 },
  summaryBox: {
    borderLeftWidth: 2,
    borderLeftColor: "#D0D0D0",
    paddingLeft: 12,
    marginTop: 29,
    marginBottom: 11,
  },
  labelRow: {
    color: "#89939F",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  label: { fontWeight: "bold", fontSize: 14 },
  summaryText: { fontSize: 14, lineHeight: 22, color: "#444" },
  contentBox: { marginTop: 16 },
  htmlBase: {
    fontSize: 15,
    lineHeight: 24,
    color: "#222",
  },
  loading: {
    fontSize: 14,
    color: "#666",
    marginTop: 12,
    textAlign: "center",
  },
  imageCaption: {
    ...typography.caption_c2_12_regular,
    color: "#89939F",
    paddingTop: 10,
  },
});
