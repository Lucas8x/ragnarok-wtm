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
  let isLoading = $state(true);
  let error = $state(false);

  onMount(async () => {
    const key = `/src/assets/sprites/${monsterID}.png`;
    imgSrc = await spritesImages[key]();
  });

  const comparasion = $derived(compareProperties(monsterID, correctID));
</script>

<li
  class={cn('neo-border flex items-center gap-4 p-2', {
    'bg-pink-400': monsterID !== correctID,
    'bg-green-400': monsterID === correctID,
  })}
  data-monster-id={monsterID}
>
  <Card.Root class="flex h-25 w-19 p-2">
    <Card.Content class="px-1 py-4">
      {#if imgSrc && !error}
        <enhanced:img
          class={cn('size-12 object-contain', { 'opacity-0': isLoading })}
          src={imgSrc}
          alt={comparasion.attemptData?.name ?? '?'}
          onload={() => (isLoading = false)}
          onerror={() => {
            isLoading = false;
            error = true;
          }}
        />
      {/if}

      {#if isLoading}
        <LoaderCircle class="not-motion-reduce:animate-spin" />
      {/if}

      {#if error}
        <div class=" flex size-20 h-full w-full items-center justify-center">
          <span>?</span>
        </div>
      {/if}
    </Card.Content>
  </Card.Root>

  <div class="flex w-full flex-col gap-2">
    <p class="text-center font-bold">{comparasion.attemptData?.name}</p>
    <PropertiesDisplay {comparasion} />
  </div>
</li>
