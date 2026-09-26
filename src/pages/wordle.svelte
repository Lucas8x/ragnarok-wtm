<script lang="ts">
  import type { WordleItem, WordleStatus } from '$src/@types';
  import Keyboard from '$src/componentes/Keyboard.svelte';
  import TimedToast from '$src/componentes/TimedToast.svelte';
  import WordleGrid from '$src/componentes/WordleGrid.svelte';
  import { wordleGame } from '$src/stores/wordle-store.svelte';
  import { rankLetters } from '$src/utils/rankLetters';
  import { weightWord } from '$src/utils/weightWord';

  const ALPHABET_REGEX = /^[a-z]$/i;

  let unknownWordAlertVisible = $state(false);
  let ranks = $derived(rankLetters(wordleGame.guesses));

  function handleKeyPress(key: string) {
    if (wordleGame.status !== 'playing') {
      return;
    }
    if (key === 'enter' || key === '{enter}') {
      wordleGame.submitGuess(() => {
        unknownWordAlertVisible = true;
      });
      return;
    }
    if (key === 'backspace' || key === '{bksp}') {
      wordleGame.deleteLastLetter();
      return;
    }
    if (!ALPHABET_REGEX.test(key)) {
      return;
    }

    const lastWord = wordleGame.guesses.at(-1);

    if (lastWord?.text.length === 5 && !lastWord.submitted) {
      console.info('Cant write anymore.');
      return;
    }

    if (wordleGame.guesses.length === 6 && lastWord?.submitted) {
      console.log('Limit reached.');
      return;
    }

    if (wordleGame.guesses.length === 0 || lastWord?.submitted) {
      wordleGame.guesses.push({
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

    wordleGame.guesses = [...wordleGame.guesses.slice(0, -1), updatedWord];
  }
</script>

<svelte:window on:keydown={(e) => handleKeyPress(e.key.toLocaleLowerCase())} />

<main class="flex h-full flex-col items-center gap-1 pt-2">
  <p
    class="neo-border font-extrabold bg-yellow-400 shadow-shadow mt-2 inline-flex items-center gap-2 px-4 py-2 mb-2"
  >
    {wordleGame.status === 'over'
    ? 'This game is over'
    : wordleGame.status === 'scored'
      ? 'You got it'
      : 'Guess the monster!'}
  </p>

  <WordleGrid />

  {#if unknownWordAlertVisible}
    <TimedToast
      onClose={() => {
        unknownWordAlertVisible = false;
      }}
    />
  {/if}

  <Keyboard
    highlight={ranks}
    onKeyPress={(key) => handleKeyPress(key.toLocaleLowerCase())}
  />
</main>
