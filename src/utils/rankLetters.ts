import type { WordleItem } from '$src/@types';

export function rankLetters(words: WordleItem[]) {
  const rank: { [letter: string]: number } = {};

  for (const { text, validation } of words) {
    for (const [index, value] of validation.entries()) {
      rank[text[index]] = Math.max(rank[text[index]] || 0, value);
    }
  }

  return rank;
}
