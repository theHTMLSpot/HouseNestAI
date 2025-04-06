import { NextRequest } from "next/server";

// Utility functions
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .split(/\s+/)
    .filter(Boolean);
}

function extractNumbers(text: string): number[] {
  const matches = text.match(/\d+(\.\d+)?/g);
  return matches ? matches.map(Number) : [];
}

function scoreAgainstIdeal(text: string, ideal: string) {
  const tokens = tokenize(text);
  const idealTokens = tokenize(ideal);

  const matchingWords = tokens.filter((t) => idealTokens.includes(t));
  const wordMatchScore = matchingWords.length / Math.max(idealTokens.length, 1);

  const numbers = extractNumbers(text);
  const idealNumbers = extractNumbers(ideal);

  let numberScore = 1;
  if (idealNumbers.length) {
    const diffSum = idealNumbers.reduce((sum, idealNum, i) => {
      const actual = numbers[i] ?? idealNum;
      return sum + Math.abs(idealNum - actual);
    }, 0);
    const avgDiff = diffSum / idealNumbers.length;
    numberScore = Math.max(0, 1 - avgDiff / 100);
  }

  const final = (wordMatchScore * 0.7 + numberScore * 0.3) * 10;
  const rating = Math.max(1, Math.min(10, Math.round(final)));

  return { rating, matchingWords, wordMatchScore, numberScore };
}

function compareDescriptions(desc1: string, desc2: string) {
  const tokens1 = tokenize(desc1);
  const tokens2 = tokenize(desc2);

  const set1 = new Set(tokens1);
  const set2 = new Set(tokens2);

  const sharedWords = [...set1].filter((w) => set2.has(w));
  const jaccard = sharedWords.length / new Set([...set1, ...set2]).size;

  const numbers1 = extractNumbers(desc1);
  const numbers2 = extractNumbers(desc2);

  let numberScore = 1;
  if (numbers1.length && numbers2.length) {
    const diffSum = numbers1.reduce((sum, num1, i) => {
      const num2 = numbers2[i] ?? num1;
      return sum + Math.abs(num1 - num2);
    }, 0);
    const avgDiff = diffSum / numbers1.length;
    numberScore = Math.max(0, 1 - avgDiff / 100);
  }

  const final = (jaccard * 0.7 + numberScore * 0.3) * 10;
  const rating = Math.max(1, Math.min(10, Math.round(final)));

  return { rating, sharedWords, jaccard, numberScore };
}

function compareAll(desc1: string, desc2: string, ideal: string) {
  const ideal1 = scoreAgainstIdeal(desc1, ideal);
  const ideal2 = scoreAgainstIdeal(desc2, ideal);
  const headToHead = compareDescriptions(desc1, desc2);

  return {
    description1: {
      text: desc1,
      scoreAgainstIdeal: ideal1.rating,
      details: ideal1,
    },
    description2: {
      text: desc2,
      scoreAgainstIdeal: ideal2.rating,
      details: ideal2,
    },
    comparison: {
      similarityRating: headToHead.rating,
      sharedWords: headToHead.sharedWords,
      jaccard: headToHead.jaccard.toFixed(2),
      numberScore: headToHead.numberScore.toFixed(2),
    },
  };
}

export default async function GET(
  req: NextRequest,
  { params }: { params?: { json?: string } } = {},
) {
  try {
    if (!params?.json) {
      throw new Error("Missing json parameter");
    }

    const decoded = decodeURIComponent(params.json);
    const { comp1, comp2, ideal } = JSON.parse(decoded);

    if (!comp1 || !comp2 || !ideal) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    const result = compareAll(comp1, comp2, ideal);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.error("Error parsing JSON:", err);
    return new Response(JSON.stringify({ error: "Invalid JSON or format" }), {
      status: 400,
    });
  }
}
