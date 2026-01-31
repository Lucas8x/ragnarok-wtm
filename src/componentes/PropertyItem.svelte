<script lang="ts">
  import { ArrowDown, ArrowUp, Check } from '@lucide/svelte/icons';
  import * as Card from '$lib/components/ui/card';
  import { cn } from '$lib/utils';
  import type { ComparasionIndicator } from '$src/@types';

  let {
    title,
    text = '?',
    icon,
    result,
  }: {
    title: string;
    text?: string | number;
    icon: typeof ArrowDown;
    result?: ComparasionIndicator;
  } = $props();

  const showIcon = $derived(typeof result !== 'boolean');
</script>

<div
  class={cn('neo-border flex items-center px-2 py-1 text-center', {
    'bg-neo-red': result !== '=',
    'bg-neo-green': result === '=',
  })}>
  {#if showIcon}
    {#if result !== '='}
      {#if result === '>'}
        <ArrowUp class="size-5" />
      {:else}
        <ArrowDown class="size-5" />
      {/if}
    {:else}
      <Check class="size-5" />
    {/if}
  {/if}

  <div class="flex w-full flex-col text-center leading-5">
    <span>{title.toUpperCase()}</span>
    <span>{text}</span>
  </div>
</div>
