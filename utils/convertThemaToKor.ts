export const convertThemaToKor = (en: string): string => {
  const reverseMap: Record<string, string> = {
    SEMICONDUCTOR_AI: "반도체/AI",
    IT_INTERNET: "IT/인터넷",
    FINANCE_INSURANCE: "금융/보험",
    MOBILITY: "모빌리티",
    DEFENSE_AEROSPACE: "방산/항공우주",
    SECOND_BATTERY_ENVIRONMENT: "2차전지/친환경E",
    REAL_ESTATE_REIT: "부동산/리츠",
    BOND_INTEREST: "채권/금리",
    HEALTHCARE_BIO: "헬스케어/바이오",
    EXCHANGE_RATE: "환율/외환",
    RAW_MATERIAL_METALS: "원자재/귀금속",
    ETC: "기타",
  };

  return reverseMap[en] ?? en;
};
