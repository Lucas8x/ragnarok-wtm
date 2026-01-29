<script lang="ts">
  import { LoaderCircle } from '@lucide/svelte/icons';
  import { onMount } from 'svelte';
  import * as Card from '$lib/components/ui/card';
  import { cn } from '$lib/utils.js';
  import { spritesImages } from '$src/utils';
  import { compareProperties } from '$src/utils/compare-properties';
  import PropertiesDisplay from './PropertiesDisplay.svelte';

  let {
    monsterID,
    correctID,
  }: {
    monsterID: number;
    correctID: number;
  } = $props();

  let imgSrc: string | null = $state(null);
  let isLoading: boolean = $state(true);

  onMount(async () => {
    const key = `/src/assets/sprites/${monsterID}.png`;
    isLoading = true;
    imgSrc = await spritesImages[key]();
    isLoading = false;
  });

  const comparasion = $derived(compareProperties(monsterID, correctID));
</script>

<li
  class={cn('neo-border flex items-center gap-2 p-2', {
    'bg-pink-400': monsterID !== correctID,
    'bg-green-400': monsterID === correctID,
  })}>
  <Card.Root class="p-2">
    <Card.Content class="px-1 py-4">
      {#if imgSrc && !isLoading}
        <enhanced:img
          class="size-12 object-contain"
          src={imgSrc}
          alt={comparasion.attemptData.name} />
      {:else if isLoading}
        <LoaderCircle class="not-motion-reduce:animate-spin" />
      {:else}
        <div class=" flex size-20 h-full w-full items-center justify-center">
          <span>?</span>
        </div>
      {/if}
    </Card.Content>
  </Card.Root>

  <div class="flex flex-col gap-2">
    <div class="flex gap-2">
      <p class="font-bold">{comparasion.attemptData.name}</p>
    </div>
    <PropertiesDisplay {comparasion} />
  </div>
</li>
