export function wordCheck(target: string, guess: string): number[] {
  const result = Array(guess.length).fill(null);
  const freq: Record<string, number> = {};

  for (const char of target) {
    freq[char] = (freq[char] || 0) + 1;
  }

  for (let i = 0; i < guess.length; i++) {
    const char = guess[i];

    if (char === target[i]) {
      result[i] = 2;
      freq[char]--;
    }
  }

  for (let i = 0; i < guess.length; i++) {
    if (result[i]) continue;

    const char = guess[i];

    if (freq[char] > 0) {
      result[i] = 1;
      freq[char]--;
    } else {
      result[i] = 0;
    }
  }

  return result;
}
