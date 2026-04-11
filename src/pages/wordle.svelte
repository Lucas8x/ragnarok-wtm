<script lang="ts">
  import type { WordleItem } from '$src/@types';
  import Keyboard from '$src/componentes/Keyboard.svelte';
  import WordleGrid from '$src/componentes/WordleGrid.svelte';
  import { wordleGame } from '$src/stores/wordle-store.svelte';
  import { rankLetters } from '$src/utils/rankLetters';

  let guesses: Array<WordleItem> = $state([]);
  let status: 'playing' | 'over' | 'scored' = $state('playing');

  let ranks = $derived(rankLetters(guesses));

  function handleEnter() {
    if (guesses.length === 0) {
      return;
    }

    const lastItem = guesses[guesses.length - 1];

    if (lastItem.text.length !== 5) {
      return;
    }

    if (!$wordleGame.checkWordExists(lastItem.text)) {
      alert('Word does not exist.');
      return;
    }

    guesses[guesses.length - 1].submited = true;

    const validation = $wordleGame.weightWord(
      $wordleGame.secret.name,
      guesses[guesses.length - 1].text,
    );

    guesses[guesses.length - 1].validation = validation;

    if (validation.every((i) => i === 2)) {
      status = 'scored';
      return;
    }

    if (guesses.length === 6 && guesses.every((i) => i.submited)) {
      status = 'over';
      return;
    }
  }

  function handleBackspace() {
    if (guesses.length === 0) {
      return;
    }

    const lastWord = guesses[guesses.length - 1];

    if (lastWord.submited || lastWord.text.length === 0) {
      return;
    }

    guesses = [
      ...guesses.slice(0, -1),
      {
        ...lastWord,
        text: lastWord.text.slice(0, -1),
      },
    ];
  }

  function handleKeyPress(key: string) {
    if (status !== 'playing') {
      return;
    }
    if (key === 'enter') {
      handleEnter();
      return;
    }
    if (key === 'backspace') {
      handleBackspace();
      return;
    }
    if (!/^[a-z]$/i.test(key)) {
      return;
    }

    const lastWord = guesses[guesses.length - 1];

    if (lastWord?.text.length === 5 && !lastWord.submited) {
      console.info('Cant write anymore.');
      return;
    }

    if (guesses.length === 6 && lastWord.submited) {
      console.log('Limit reached.');
      return;
    }

    if (guesses.length === 0 || lastWord.submited) {
      guesses.push({
        text: key,
        submited: false,
        validation: [],
      });
      return;
    }

    guesses = [
      ...guesses.slice(0, -1),
      {
        ...lastWord,
        text: (lastWord?.text || '').concat(key),
      },
    ];
  }
</script>

<svelte:window on:keydown={(e) => handleKeyPress(e.key.toLocaleLowerCase())} />

<main class="flex h-full flex-col items-center gap-1 pt-2">
  <p
    class="neo-border bg-neo-yellow shadow-shadow mt-2 inline-flex items-center gap-2 px-4 py-2 mb-2"
  >
    {status === 'over'
      ? 'This game is over'
      : status === 'scored'
        ? "You got it"
        :'Guess the monster!'}
  </p>

  <WordleGrid {guesses} />

  <Keyboard
    highlight={ranks}
    onKeyPress={(key) => {
      if (key === '{enter}') {
        handleEnter();
      } else if (key === '{bksp}') {
        handleBackspace();
      } else {
        handleKeyPress(key.toLocaleLowerCase());
      }
    }}
  />
</main>
