<script lang="ts">
  import { cn } from '$lib/utils';
  import type { WordleItem } from '$src/@types';

  let { words, answer }: { words: WordleItem[]; answer: string } = $props();
</script>

<div class="space-y-1 space-x-1">
  {#each { length: 6 } as _, i}
    <div class="flex space-y-1 space-x-1">
      {#each { length: 5 } as _, j}
        <div
          class={cn('flex size-16 items-center justify-center ', {
            'neo-border': !words[i]?.submited,
            'bg-neo-green':
              words[i]?.submited && words[i].text[j] === answer[j],
            'bg-neo-yellow':
              words[i]?.submited &&
              words[i].text[j] !== answer[j] &&
              answer.includes(words[i].text[j]),
            'bg-gray-400':
              words[i]?.submited && !answer.includes(words[i].text[j]),
          })}>
          <span
            class={cn('text-2xl font-bold uppercase', {
              'text-white': words[i]?.submited,
            })}>
            {words[i]?.text[j] ?? ''}
          </span>
        </div>
      {/each}
    </div>
  {/each}
</div>
