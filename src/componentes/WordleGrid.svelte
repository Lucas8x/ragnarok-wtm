<script lang="ts">
  import { cn } from '$lib/utils';
  import { wordleGame } from '$src/stores/wordle-store.svelte';

  const ROWS = 6;
</script>

<div class="space-y-2">
  {#each { length: ROWS } as _, i}
    <div class="flex space-x-2">
      {#each { length: wordleGame.nameLength } as _, j}
        <div
          class={cn(
            'neo-border flex size-16 items-center justify-center bg-orange-50 transition ease-in-out',
            {
              'shadow-shadow':
                wordleGame.guesses[i]?.submitted || wordleGame.guesses[i]?.text[j],
              'bg-neo-green': wordleGame.guesses[i]?.validation[j] === 2,
              'bg-neo-yellow': wordleGame.guesses[i]?.validation[j] === 1,
              'bg-gray-400': wordleGame.guesses[i]?.validation[j] === 0,
            }
          )}
        >
          <span
            class={cn('font-bold text-2xl uppercase', {
              'text-white': wordleGame.guesses[i]?.submitted,
              'text-black': wordleGame.guesses[i]?.validation[j] === 1,
            })}
          >
            {wordleGame.guesses[i]?.text[j] ?? ''}
          </span>
        </div>
      {/each}
    </div>
  {/each}
</div>
