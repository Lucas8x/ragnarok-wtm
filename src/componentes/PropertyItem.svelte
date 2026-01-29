<script lang="ts">
  import { ArrowDown, ArrowUp } from '@lucide/svelte/icons';
  import { cn } from '$lib/utils';

  let {
    title,
    text,
    correct,
    greater,
  }: { title: string; text: string; correct?: boolean; greater?: boolean } =
    $props();
</script>

<div
  class={cn('flex flex-col text-center', {
    'bg-red-500': false,
  })}>
  <span>{title}</span>

  <div class="flex">
    {#if !correct}
      {#if greater}
        <ArrowUp class="mx-auto mt-1 h-4 w-4" />
      {:else}
        <ArrowDown class="mx-auto mt-1 h-4 w-4" />
      {/if}
    {/if}

    <span>{text}</span>
  </div>
</div>
