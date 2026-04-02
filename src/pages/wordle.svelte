<script lang="ts">
  import type { WordleItem } from '$src/@types';
  import Keyboard from '$src/componentes/Keyboard.svelte';
  import WordleGrid from '$src/componentes/WordleGrid.svelte';
  import { rankLetters } from '$src/utils/rankLetters';
  import { wordCheck } from '$src/utils/wordCheck';

  const secret = 'criar';

  let words: Array<WordleItem> = $state([]);
  let status: 'playing' | 'over' | 'scored' = $state('playing');

  let ranks = $derived(rankLetters(words));

  function handleEnter() {
    if (words.length === 0) {
      return;
    }

    const lastItem = words[words.length - 1];

    if (lastItem.text.length !== 5) {
      return;
    }

    words[words.length - 1].submited = true;
    words[words.length - 1].validation = wordCheck(
      secret,
      words[words.length - 1].text,
    );

    if (words.length === 6 && words.every((i) => i.submited)) {
      status = 'over';
    }

    console.log(...$state.snapshot(words));
  }

  function handleBackspace() {
    if (words.length === 0) {
      return;
    }

    const lastWord = words[words.length - 1];

    if (lastWord.submited || lastWord.text.length === 0) {
      return;
    }

    words = [
      ...words.slice(0, -1),
      {
        ...lastWord,
        text: lastWord.text.slice(0, -1),
      },
    ];
  }

  function handleKeyPress(key: string) {
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

    const lastWord = words[words.length - 1];

    if (lastWord?.text.length === 5 && !lastWord.submited) {
      console.info('Cant write anymore.');
      return;
    }

    if (words.length === 6 && lastWord.submited) {
      console.log('Limit reached.');
      return;
    }

    if (words.length === 0 || lastWord.submited) {
      words.push({
        text: key,
        submited: false,
        validation: [],
      });
      return;
    }

    words = [
      ...words.slice(0, -1),
      {
        ...lastWord,
        text: (lastWord?.text || '').concat(key),
      },
    ];
  }
</script>

<svelte:window on:keydown={(e) => handleKeyPress(e.key.toLocaleLowerCase())} />

<main class="flex h-full flex-col items-center gap-1 pt-4">
  <WordleGrid {words} />

  <Keyboard
    highlight={ranks}
    onKeyPress={(key) => {
      if (key === '{enter}') handleEnter();
      else if (key === '{bksp}') handleBackspace();
      else handleKeyPress(key.toLocaleLowerCase());
    }}
  />
</main>
