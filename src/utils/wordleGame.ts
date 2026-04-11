import monsters from '../data/monsters.json';

export class WorldeGame {
  secret: { id: number; name: string };
  filteredMonsters: typeof monsters = [];

  constructor(public nameLength = 5) {
    this.nameLength = nameLength;

    const filteredMonsters = monsters.filter(
      (m) => m.name.length === nameLength,
    );
    this.filteredMonsters = filteredMonsters;

    const randomIndex = Math.floor(Math.random() * filteredMonsters.length);

    const { id, name } = filteredMonsters[randomIndex];

    this.secret = { id, name: name.toLowerCase() };

    console.log('[WORDLE] Secret monster:', this.secret.name);
    console.log(
      '[WORDLE]',
      filteredMonsters.slice(0, 6).flatMap((m) => m.name),
    );
  }

  checkWordExists(name: string) {
    const guessName = name.toLowerCase();

    if (this.filteredMonsters.some((m) => m.name.toLowerCase() === guessName)) {
      return true;
    }
    return false;
  }

  weightWord(target: string, guess: string): number[] {
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
}
