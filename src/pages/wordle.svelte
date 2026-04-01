<script lang="ts">
  import type { WordleItem } from '$src/@types';
  import Keyboard from '$src/componentes/Keyboard.svelte';
  import WordleGrid from '$src/componentes/WordleGrid.svelte';

  const word = 'criar';

  let words: Array<WordleItem> = $state([]);

  function handleEnter() {
    if (words.length === 0) {
      return;
    }

    const lastItem = words[words.length - 1];

    if (lastItem.text.length !== 5) {
      return;
    }

    words[words.length - 1].submited = true;

    if (words.every((i) => i.submited)) {
      console.log('Over');
    }

    // words = [
    //   ...words.slice(0, -1),
    //   {
    //     ...lastItem,
    //     submited: true,
    //   },
    // ];
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

    if (words.length === 6) {
      console.log('Limit reached.');
      return;
    }

    words = [
      ...words.slice(0, -1),
      {
        submited: false,
        text: (lastWord?.text || '').concat(key),
      },
    ];

    /*if (words.length === 0) {
      console.log('Adding new row.');
      words.push({
        text: key,
        submited: false,
      });
    } else {
      console.log('Updating current row.');
      words = [
        ...words.slice(0, -1),
        {
          ...lastWord,
          text: lastWord.text.concat(key),
        },
      ];
    }*/
  }

  $inspect(...words);
</script>

<svelte:window on:keydown={(e) =>  handleKeyPress(e.key.toLocaleLowerCase())} />

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
    }}
  />
</main>
