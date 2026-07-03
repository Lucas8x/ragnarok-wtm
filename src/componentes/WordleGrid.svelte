<script lang="ts">
  import { cn } from '$lib/utils';
  import type { WordleItem } from '$src/@types';

  let { guesses }: { guesses: WordleItem[] } = $props();

  const ROWS = 6;
  const COLUMNS = 5;
</script>

<div class="space-y-2">
  {#each { length: ROWS } as _, i}
    <div class="flex space-x-2">
      {#each { length: COLUMNS } as _, j}
        <div
          class={cn(
            'neo-border flex size-16 items-center justify-center bg-orange-50 transition ease-in-out',
            {
              'shadow-shadow': guesses[i]?.submitted || guesses[i]?.text[j],
              'bg-neo-green': guesses[i]?.validation[j] === 2,
              'bg-neo-yellow': guesses[i]?.validation[j] === 1,
              'bg-gray-400': guesses[i]?.validation[j] === 0,
            },
          )}
        >
          <span
            class={cn('font-bold text-2xl uppercase', {
              'text-white': guesses[i]?.submitted,
              'text-black': guesses[i]?.validation[j] === 1,
            })}
          >
            {guesses[i]?.text[j] ?? ''}
          </span>
        </div>
      {/each}
    </div>
  {/each}
</div>
