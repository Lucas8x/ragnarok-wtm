<script lang="ts">
  import type { WordleItem } from '$src/@types';
  import Keyboard from '$src/componentes/Keyboard.svelte';
  import TimedToast from '$src/componentes/TimedToast.svelte';
  import WordleGrid from '$src/componentes/WordleGrid.svelte';
  import { wordleGame } from '$src/stores/wordle-store.svelte';
  import { rankLetters } from '$src/utils/rankLetters';

  const ALPHABET_REGEX = /^[a-z]$/i;

  let guesses: WordleItem[] = $state([]);
  let status: 'playing' | 'over' | 'scored' = $state('playing');
  let unknownWordAlertVisible = $state(false);

  let ranks = $derived(rankLetters(guesses));

  function handleEnter() {
    if (guesses.length === 0) {
      return;
    }

    const lastItem = guesses.at(-1);
    if (lastItem?.text.length !== 5) {
      return;
    }

    if (!$wordleGame.checkWordExists(lastItem.text)) {
      unknownWordAlertVisible = true;
      return;
    }

    lastItem.submitted = true;

    const validation = $wordleGame.weightWord(
      $wordleGame.secret.name,
      lastItem.text
    );

    lastItem.validation = validation;

    if (validation.every((i) => i === 2)) {
      status = 'scored';
      return;
    }

    if (guesses.length === 6 && guesses.every((i) => i.submitted)) {
      status = 'over';
      return;
    }
  }

  function handleBackspace() {
    if (guesses.length === 0) {
      return;
    }

    const lastWord = guesses.at(-1);

    if (!lastWord || lastWord.submitted || lastWord.text.length === 0) {
      return;
    }

    const updatedWord: WordleItem = {
      text: lastWord.text.slice(0, -1),
      submitted: lastWord.submitted,
      validation: lastWord.validation,
    };

    guesses = [...guesses.slice(0, -1), updatedWord];
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
    if (!ALPHABET_REGEX.test(key)) {
      return;
    }

    const lastWord = guesses.at(-1);

    if (lastWord?.text.length === 5 && !lastWord.submitted) {
      console.info('Cant write anymore.');
      return;
    }

    if (guesses.length === 6 && lastWord?.submitted) {
      console.log('Limit reached.');
      return;
    }

    if (guesses.length === 0 || lastWord?.submitted) {
      guesses.push({
        text: key,
        submitted: false,
        validation: [],
      });
      return;
    }

    if (!lastWord) {
      return;
    }

    const updatedWord: WordleItem = {
      text: lastWord.text.concat(key),
      submitted: lastWord.submitted,
      validation: lastWord.validation,
    };

    guesses = [...guesses.slice(0, -1), updatedWord];
  }
</script>

<svelte:window on:keydown={(e) => handleKeyPress(e.key.toLocaleLowerCase())} />

<main class="flex h-full flex-col items-center gap-1 pt-2">
  <p
    class="neo-border font-extrabold bg-yellow-400 shadow-shadow mt-2 inline-flex items-center gap-2 px-4 py-2 mb-2"
  >
    {status === 'over'
      ? 'This game is over'
      : status === 'scored'
        ? "You got it"
        :'Guess the monster!'}
  </p>

  <WordleGrid {guesses} />

  {#if unknownWordAlertVisible}
    <TimedToast
      onClose={() => {
        unknownWordAlertVisible = false;
      }}
    />
  {/if}

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
