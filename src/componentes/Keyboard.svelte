<script lang="ts">
  import { CornerDownLeft, Delete } from '@lucide/svelte/icons';
  import { cn } from '$lib/utils';
  import { Button } from '$src/lib/components/ui/button';
  import type { rankLetters } from '$src/utils/rankLetters';

  const layout = [
    'q w e r t y u i o p',
    'a s d f g h j k l {bksp}',
    'z x c v b n m {enter}',
  ] as const;

  let {
    highlight,
    onKeyPress,
  }: {
    highlight: ReturnType<typeof rankLetters>;
    onKeyPress: (key: string) => void;
  } = $props();
</script>

<div class="mt-4 max-w-full">
  {#each layout as row}
    <div class="flex space-y-2 sm:space-x-2">
      {#each row.split(' ') as key}
        <Button
          class={cn(
            'h-12 w-12 cursor-pointer bg-orange-100 p-0 font-bold text-lg uppercase hover:bg-orange-200 active:bg-orange-300',
            {
              'flex-auto': key === '{enter}',
              //'sm:flex-2': key === '{bksp}',
              'hover:bg-neo-red/50': key === '{bksp}',
              'active:bg-neo-red': key === '{bksp}',
              'hover:bg-neo-green/50': key === '{enter}',
              'active:bg-neo-green': key === '{enter}',
              'bg-slate-500': highlight[key] === 0,
              'bg-neo-yellow text-black': highlight[key] === 1,
              'bg-neo-green': highlight[key] === 2,
            }
          )}
          onclick={() => onKeyPress(key)}
        >
          {#if key === '{enter}'}
            <span class="hidden xs:block">Enter</span>
            <span class="xs:hidden">
              <CornerDownLeft size={5} strokeWidth={2.5} />
            </span>
          {:else if key === '{bksp}'}
            <Delete size={5} strokeWidth={2.5} />
          {:else}
            {key}
          {/if}
        </Button>
      {/each}
    </div>
  {/each}
</div>
