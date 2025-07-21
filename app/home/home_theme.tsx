import { getThemeNews } from "@/api/getThemeNews";
import UnionIcon from "@/assets/images/Union.svg";
import IcVector from "@/assets/images/Vector.svg";
import CategoryInfoBox from "@/components/CategoryInfoBox";
import NewsVolumeChart from "@/components/chart/NewsVolumeChart";
import SentimentChart from "@/components/chart/SentimentChart";
import { sentimentData } from "@/data/sentimentDummy";
import { typography } from "@/styles/typography";
import { NewsItem } from "@/types/news";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface Props {
  selectedCategoryId: string;
}

export default function HomeMain({ selectedCategoryId }: Props) {
  const router = useRouter();
  const [mainNews, setMainNews] = useState<NewsItem[]>([]);
  const [showTooltip, setShowTooltip] = useState(false);

  const categoryDisplayNames: Record<string, string> = {
    semiconductor: "반도체/AI",
    it: "IT/인터넷",
    finance: "금융/보험",
    bond: "채권/금리",
    green: "2차전지/친환경E",
    forex: "환율/외환",
    commodity: "원자재/귀금속",
    realestate: "부동산/리츠",
    health: "헬스케어/바이오",
    etc: "기타",
    mobility: "모빌리티",
    defense: "방산/항공우주",
  };

  const categoryCodeMap: Record<string, string> = {
    semiconductor: "SEMICONDUCTOR_AI",
    it: "IT_INTERNET",
    finance: "FINANCE_INSURANCE",
    defense: "DEFENSE_AEROSPACE",
    green: "SECONDARY_BATTERY_ENVIRONMENT",
    mobility: "MOBILITY",
    realestate: "REAL_ESTATE_REIT",
    bond: "BOND_INTEREST",
    health: "HEALTHCARE_BIO",
    forex: "EXCHANGE_RATE",
    commodity: "RAW_MATERIAL_METALS",
    etc: "ETC",
  };

  const displayName = categoryDisplayNames[selectedCategoryId] ?? "카테고리";

  const averageSentiment =
    sentimentData.reduce((sum, val) => sum + val, 0) / sentimentData.length;
  const sentimentColor = averageSentiment >= 0 ? "#F63D55" : "#497AFA";
  const sentimentDisplay = `${
    averageSentiment >= 0 ? "+" : ""
  }${averageSentiment.toFixed(1)}`;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const code = categoryCodeMap[selectedCategoryId];
        if (!code) return;

        const data = await getThemeNews(code, "views");

        if (!data?.content || !Array.isArray(data.content)) return;

        setMainNews(data.content.slice(0, 2));
      } catch (err) {
        console.error("주요 뉴스 불러오기 실패:", err);
      }
    };

    fetchNews();
  }, [selectedCategoryId]);

  return (
    <TouchableWithoutFeedback onPress={() => setShowTooltip(false)}>
      <View style={styles.container}>
        <View style={{ marginTop: 20 }}>
          <CategoryInfoBox
            category={displayName}
            change={sentimentDisplay}
            color={sentimentColor}
          />
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>주요 뉴스</Text>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/category/[categoryid]",
                  params: { categoryid: selectedCategoryId },
                })
              }
            >
              <Text style={styles.moreText}>더 보기 &gt;</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            data={mainNews}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingRight: 0 }}
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              const formattedDate = new Date(item.date)
                .toISOString()
                .slice(0, 10)
                .replace(/-/g, ".");

              return (
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/news/[id]",
                      params: { id: item.id },
                    })
                  }
                >
                  <View style={styles.newsCard}>
                    {item.imageUrl && (
                      <Image
                        source={{ uri: item.imageUrl }}
                        style={styles.newsImage}
                      />
                    )}
                    <Text numberOfLines={2} style={styles.newsTitle}>
                      {item.title}
                    </Text>
                    <Text style={styles.newsMeta}>{formattedDate}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionTitleWithIcon}>
            <Text style={styles.sectionTitle2}>감성 지표</Text>
            <View style={{ position: "relative" }}>
              <Pressable onPress={() => setShowTooltip((prev) => !prev)}>
                <IcVector
                  width={14}
                  height={14}
                  style={{ marginLeft: 4, marginTop: 29, marginBottom: 8 }}
                />
              </Pressable>

              {showTooltip && (
                <View style={styles.tooltipWrapper}>
                  <UnionIcon width={250} height={50} />
                  <Text style={styles.tooltipText}>
                    뉴스의 긍·부정 흐름을 수치화한 감성 점수로{"\n"}뉴스의
                    방향을 쉽게 읽을 수 있어요
                  </Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.chartBox}>
            <SentimentChart color={sentimentColor} />
          </View>

          <View
            style={[
              styles.chartBox,
              { backgroundColor: "transparent", paddingHorizontal: 0 },
            ]}
          >
            <Text style={styles.newsVolumeTitle}>뉴스 수</Text>
            <NewsVolumeChart color={sentimentColor} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20 },
  sectionContainer: { marginTop: 12 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    ...typography.subtitle_s2_16_semi_bold,
  },
  sectionTitle2: {
    ...typography.subtitle_s2_16_semi_bold,
    marginTop: 28,
    marginBottom: 8,
  },
  moreText: {
    ...typography.caption_c2_12_regular,
    color: "#5E6974",
  },
  sectionTitleWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5.33,
  },
  chartBox: {
    marginTop: 8,
    backgroundColor: "#F7F7F7",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    minHeight: 140,
  },
  newsCard: {
    width: 182,
    padding: 0,
    marginTop: 8,
    backgroundColor: "white",
    borderRadius: 8,
  },
  newsImage: {
    height: 100,
    width: 182,
    backgroundColor: "#dcdcdc",
    borderRadius: 8,
    marginBottom: 8,
  },
  newsTitle: {
    ...typography.subtitle_s3_15_semi_bold,
    color: "#0E0F15",
    marginBottom: 4,
    marginTop: 8,
  },
  newsMeta: {
    ...typography.caption_c1_11_regular,
    color: "#5E6974",
  },
  newsVolumeTitle: {
    ...typography.caption_c1_12_semi_bold,
    lineHeight: 18,
    letterSpacing: 0.072,
    color: "#0E0F15",
    marginBottom: 5,
  },
  tooltipWrapper: {
    position: "absolute",
    top: 11,
    left: 25,
    zIndex: 100,
  },
  tooltipText: {
    position: "absolute",
    top: 5,
    left: 22,
    lineHeight: 20,
    color: "#FFFFFF",
    ...typography.caption_c2_12_regular,
  },
});
