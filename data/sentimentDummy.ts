// 5월 기준 임의 데이터

export const sentimentData = Array.from({ length: 31 }, () =>
  parseFloat((Math.random() * 2 - 1).toFixed(2))
);

export const newsVolumeData = [
  500, 800, 900, 400, 300, 650, 700, 850, 620, 400, 1000, 930, 880, 670, 720,
  560, 500, 610, 730, 820, 940, 660, 750, 710, 690, 620, 850, 870, 910, 980,
  1030,
];

export const labels = Array.from(
  { length: 31 },
  (_, i) => `05.${String(i + 1).padStart(2, "0")}`
);

export const displayLabels = labels.map((label, i) =>
  i % 7 === 0 ? label : ""
);
