import type { WordleItem } from '$src/@types';

export function rankLetters(words: WordleItem[]) {
  const rank: { [letter: string]: number } = {};

  words.forEach((item) => {
    item.validation.forEach((value, index) => {
      rank[item.text[index]] = Math.max(rank[item.text[index]] || 0, value);
    });
  });

  return rank;
}
