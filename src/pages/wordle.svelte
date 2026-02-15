<script lang="ts">
  import type { WordleItem } from '$src/@types';
  import Keyboard from '$src/componentes/Keyboard.svelte';
  import WordleGrid from '$src/componentes/WordleGrid.svelte';

  const word = 'criar';

  let words: Array<WordleItem> = $state([]);

  function handleEnter() {
    if (words.length === 0) return;

    const lastItem = words[words.length - 1];

    if (lastItem.text.length !== 5) return;

    words = [
      ...words.slice(0, -1),
      {
        ...lastItem,
        submited: true,
      },
    ];
  }

  function handleBackspace() {
    if (words.length === 0) return;

    const lastWord = words[words.length - 1];

    if (lastWord.submited || lastWord.text.length === 0) return;

    words = [
      ...words.slice(0, -1),
      {
        ...lastWord,
        text: lastWord.text.slice(0, -1),
      },
    ];
  }

  function handleKeyPress(key: string) {
    const lastWord = words[words.length - 1];
    if (lastWord.submited || lastWord.text.length === 5) {
      return;
    }
  }
</script>

<!-- <svelte:window on:keydown={on_key_down} on:keyup={on_key_up} /> -->

<main class="flex h-full flex-col items-center gap-1 pt-4">
  <WordleGrid {words} answer={word} />
  <Keyboard
    highlight={[]}
    exclude={[]}
    onKeyPress={(key) => {
      if (key === '{enter}') {
        handleEnter();
      } else if (key === '{bksp}') {
        handleBackspace();
      } else {
        handleKeyPress(key.toLocaleLowerCase());
      }
    }} />
</main>
