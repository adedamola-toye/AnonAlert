export async function calculateCredibilityScore(reportData, mediaList) {
  let score = 0;

  if (mediaList.length > 0) {
    score += 1.0;
  }

  for (const media of mediaList) {
    if (media.type === "video") {
      score += 2.0;
    } else if ((media.type = "image")) {
      score += 1.0;
    }
  }

  const text = reportData.text?.trim() || "";

  if (text.length > 100) {
    score += 1.5;
  } else if (text.length > 30) {
    score += 0.5;
  }

  if (reportData.location?.street) {
    score += 0.7;
  }
  if (reportData.location?.city) {
    score += 0.3;
  }
  return Math.min(score, 10.0)
}
