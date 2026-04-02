<script lang="ts">
  import { Delete } from '@lucide/svelte/icons';
  import { cn } from '$lib/utils';
  import type { rankLetters } from '$src/utils/rankLetters';

  const layout = [
    'q w e r t y u i o p',
    'a s d f g h j k l ç',
    '{enter} z x c v b n m {bksp}',
  ];

  let {
    highlight,
    onKeyPress,
  }: {
    highlight: ReturnType<typeof rankLetters>;
    onKeyPress: (key: string) => void;
  } = $props();
</script>

<div>
  {#each layout as row}
    <div class="flex space-y-1 space-x-1">
      {#each row.split(' ') as key}
        <button
          type="button"
          class={cn(
            'neo-border flex size-12 items-center justify-center font-bold uppercase hover:cursor-pointer  ',
            {
              'hover:bg-orange-200 active:bg-orange-300':
                highlight[key] === undefined,
              'flex-2': ['{enter}', '{bksp}'].includes(key),
              'hover:bg-neo-red/60': key === '{bksp}',
              'active:bg-neo-red': key === '{bksp}',
              'hover:bg-neo-green/60': key === '{enter}',
              'active:bg-neo-green': key === '{enter}',
              'bg-slate-400': highlight[key] === 0,
              'bg-neo-yellow': highlight[key] === 1,
              'bg-neo-green': highlight[key] === 2,
            },
          )}
          onclick={() => onKeyPress(key)}
        >
          {key === '{enter}' ? 'Enter' : key !== '{bksp}' ? key : ''}

          {#if key === '{bksp}'}
            <Delete size={24} />
          {/if}
        </button>
      {/each}
    </div>
  {/each}
</div>
