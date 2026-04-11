<script lang="ts">
  import { Delete } from '@lucide/svelte/icons';
  import { cn } from '$lib/utils';
  import { Button } from '$src/lib/components/ui/button';
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

<div class=" mt-4">
  {#each layout as row}
    <div class="flex space-y-2 space-x-2">
      {#each row.split(' ') as key}
        <Button
          class={cn(
            'neo-border shadow-shadow bg-slate-200  flex size-12 items-center justify-center font-bold uppercase ',
            {
              'flex-2': ['{enter}', '{bksp}'].includes(key),
              'hover:bg-neo-red/50': key === '{bksp}',
              'active:bg-neo-red': key === '{bksp}',
              'hover:bg-neo-green/50': key === '{enter}',
              'active:bg-neo-green': key === '{enter}',
              'bg-slate-500': highlight[key] === 0,
              'bg-neo-yellow text-black': highlight[key] === 1,
              'bg-neo-green': highlight[key] === 2,
            },
          )}
          onclick={() => onKeyPress(key)}
        >
          {key === '{enter}' ? 'Enter' : key !== '{bksp}' ? key : ''}

          {#if key === '{bksp}'}
            <Delete size={24} />
          {/if}
        </Button>
      {/each}
    </div>
  {/each}
</div>
