import { PersistedState } from 'runed';
import type { WordleItem, WordleItemStorage, WordleStatus } from '$src/@types';
import { monsterWithIgnoreFilter } from '$src/utils';
import { rankLetters } from '$src/utils/rankLetters';
import { weightWord } from '$src/utils/weightWord';

type WordleStore = {
  [dateKey: string]: WordleItemStorage;
};

const state = new PersistedState(
  'wordle',
  {
    nameLength: 5,
  },
  {
    storage: 'local',
    syncTabs: true,
  }
);

// TODO: use prng?

class WordleState {
  get nameLength() {
    return state.current.nameLength;
  }

  guesses: WordleItem[] = $state([]);
  status: WordleStatus = $state('playing');
  ranks = $derived(rankLetters(this.guesses));

  secret: (typeof monsterWithIgnoreFilter)[number] | null = null;
  namesWithTargetLength: typeof monsterWithIgnoreFilter = [];

  checkWordExists(name: string): boolean {
    const guessName = name.toLowerCase();
    return this.namesWithTargetLength.some(
      (m) => m.name.toLowerCase() === guessName
    );
  }

  submitGuess(onUnknown: () => void) {
    if (this.secret === null) {
      console.error('wordle secret wasnt chosen.');
      return;
    }
    if (this.guesses.length === 0) {
      return;
    }

    const lastItem = this.guesses.at(-1);
    if (lastItem?.text.length !== 5) {
      return;
    }

    if (!this.checkWordExists(lastItem.text)) {
      onUnknown();
      return;
    }

    lastItem.submitted = true;

    const validation = weightWord(this.secret.name, lastItem.text);
    lastItem.validation = validation;

    if (validation.every((i) => i === 2)) {
      this.status = 'scored';
      return;
    }

    if (this.guesses.length === 6 && this.guesses.every((i) => i.submitted)) {
      this.status = 'over';
    }
  }

  pickSecret() {
    const namesWithTargetLength = monsterWithIgnoreFilter.filter(
      (m) => m.name.length === this.nameLength
    );
    this.namesWithTargetLength = namesWithTargetLength;

    const randomIndex = Math.floor(
      Math.random() * namesWithTargetLength.length
    );
    const monster = namesWithTargetLength[randomIndex];
    this.secret = { ...monster, name: monster.name.toLowerCase() };

    if (process.env.NODE_ENV === 'development') {
      console.log('[WORDLE] Secret monster:', this.secret.name);
      console.log(
        '[WORDLE]',
        this.namesWithTargetLength
          .slice(0, this.nameLength + 1)
          .flatMap((m) => m.name)
          .join(' | ')
      );
    }
  }

  changeWordleLength(length: number) {
    if (typeof length !== 'number') {
      return;
    }
    if (length < 4 || length > 10) {
      return;
    }
    state.current.nameLength = length;
    this.pickSecret();
  }

  deleteLastLetter() {
    if (this.guesses.length === 0) {
      return;
    }

    const lastWord = this.guesses.at(-1);

    if (!lastWord || lastWord.submitted || lastWord.text.length === 0) {
      return;
    }

    const updatedWord: WordleItem = {
      text: lastWord.text.slice(0, -1),
      submitted: lastWord.submitted,
      validation: lastWord.validation,
    };

    this.guesses = [...this.guesses.slice(0, -1), updatedWord];
  }
}

export const wordleGame = new WordleState();
wordleGame.pickSecret();
