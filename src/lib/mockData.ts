export interface VerificationRecord {
  id: string;
  referenceImage: string;
  testImage: string;
  score: number;
  result: "MATCH" | "NOT MATCH";
  timestamp: Date;
  userId: string;
}

export function generateMockScore(): { score: number; result: "MATCH" | "NOT MATCH" } {
  const score = Math.random() * 0.4 + 0.6; // 0.6 to 1.0
  return {
    score: Math.round(score * 100) / 100,
    result: score > 0.9 ? "MATCH" : "NOT MATCH",
  };
}

export const mockHistory: VerificationRecord[] = [
  { id: "1", referenceImage: "ref_001.png", testImage: "test_001.png", score: 0.95, result: "MATCH", timestamp: new Date("2026-03-10T10:30:00"), userId: "u1" },
  { id: "2", referenceImage: "ref_002.png", testImage: "test_002.png", score: 0.72, result: "NOT MATCH", timestamp: new Date("2026-03-10T14:15:00"), userId: "u1" },
  { id: "3", referenceImage: "ref_003.png", testImage: "test_003.png", score: 0.93, result: "MATCH", timestamp: new Date("2026-03-11T09:00:00"), userId: "u1" },
  { id: "4", referenceImage: "ref_004.png", testImage: "test_004.png", score: 0.67, result: "NOT MATCH", timestamp: new Date("2026-03-11T16:45:00"), userId: "u2" },
  { id: "5", referenceImage: "ref_005.png", testImage: "test_005.png", score: 0.98, result: "MATCH", timestamp: new Date("2026-03-12T11:20:00"), userId: "u2" },
  { id: "6", referenceImage: "ref_006.png", testImage: "test_006.png", score: 0.81, result: "NOT MATCH", timestamp: new Date("2026-03-12T13:50:00"), userId: "u1" },
];

export const rocData = Array.from({ length: 50 }, (_, i) => {
  const fpr = i / 49;
  const tpr = Math.min(1, fpr === 0 ? 0 : Math.pow(fpr, 0.3) + Math.random() * 0.05);
  return { fpr: Math.round(fpr * 100) / 100, tpr: Math.round(tpr * 100) / 100 };
}).sort((a, b) => a.fpr - b.fpr);

export const confusionMatrix = {
  tp: 1247,
  fp: 83,
  fn: 56,
  tn: 1614,
};
