<script lang="ts">
  import { wordleGame } from '$src/stores/wordle-store.svelte';

  const submittedCount = $derived(
    wordleGame.guesses.filter((i) => i.submitted).length
  );
</script>

{#if submittedCount > 0}
  <div class="flex items-center justify-center gap-2 mt-1 mb-2">
    <p class="font-bold">Hints:</p>

    {#if submittedCount > 0}
      <span class="neo-border bg-neo-green py-1 px-2"
        >{wordleGame.secret?.element}</span
      >
    {/if}

    {#if submittedCount > 1}
      <span class="neo-border bg-neo-green py-1 px-2"
        >{wordleGame.secret?.race}</span
      >
    {/if}

    {#if submittedCount > 2}
      <span class="neo-border bg-neo-green py-1 px-2"
        >{wordleGame.secret?.size}</span
      >
    {/if}
  </div>
{/if}
