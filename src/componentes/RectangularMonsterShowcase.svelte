<script lang="ts">
  import { LoaderCircle } from '@lucide/svelte/icons';
  import { onMount } from 'svelte';
  import * as Card from '$lib/components/ui/card';
  import { cn } from '$lib/utils.js';
  import { spritesImages } from '$src/utils';

  let {
    id,
    name,
    correctID,
    children,
  }: {
    id: number | string;
    name: string;
    correctID?: number;
    children?: unknown;
  } = $props();

  let imgSrc: string | null = $state(null);
  let isLoading: boolean = $state(true);

  onMount(async () => {
    const key = `/src/assets/sprites/${id}.png`;
    isLoading = true;
    imgSrc = await spritesImages[key]();
    isLoading = false;
  });
</script>

<li
  class={cn('neo-border flex items-center gap-2 p-2', {
    'bg-pink-400': id !== correctID,
    'bg-green-400': id === correctID,
  })}
>
  <Card.Root class="p-2">
    <Card.Content class="px-1 py-4">
      {#if imgSrc && !isLoading}
        <enhanced:img class="size-12 object-contain" src={imgSrc} alt={name} />
      {:else if isLoading}
        <LoaderCircle class="not-motion-reduce:animate-spin" />
      {:else}
        <div class=" flex size-20 h-full w-full items-center justify-center">
          <span>?</span>
        </div>
      {/if}
    </Card.Content>
  </Card.Root>

  <div>
    <span>{name}</span>
    <div>attributes</div>
  </div>
</li>
