<script lang="ts">
  import { LoaderCircle } from '@lucide/svelte/icons';
  import { Card, CardContent } from '$lib/components/ui/card';
  import { cn } from '$lib/utils.js';
  import { compareProperties } from '$src/utils/compare-properties';
  import PropertiesDisplay from './PropertiesDisplay.svelte';

  let {
    monsterID,
    correctID,
  }: {
    monsterID: number;
    correctID: number;
  } = $props();

  let isLoading = $state(true);
  let imgError = $state(false);

  const comparasion = $derived(compareProperties(monsterID, correctID));
</script>

<li
  class={cn('neo-border flex items-center gap-4 p-2', {
    'bg-pink-400': monsterID !== correctID,
    'bg-green-400': monsterID === correctID,
  })}
  data-monster-id={monsterID}
>
  <Card class="flex h-25 w-19 p-2">
    <CardContent class="px-1 py-4">
      {#if !imgError}
        <enhanced:img
          alt={comparasion.attemptData?.name ?? '?'}
          class={cn('size-12 object-contain', { 'opacity-0': isLoading })}
          onerror={() => {
            isLoading = false;
            imgError = true;
          }}
          onload={() => {
            isLoading = false;
          }}
          src={`${import.meta.env.BASE_URL}sprites/${monsterID}.png`}
        />
      {/if}

      {#if isLoading}
        <LoaderCircle class="not-motion-reduce:animate-spin" />
      {/if}

      {#if imgError}
        <div class="flex size-20 h-full w-full items-center justify-center">
          <span>?</span>
        </div>
      {/if}
    </CardContent>
  </Card>

  <div class="flex w-full flex-col gap-2">
    <p class="text-center font-bold">{comparasion.attemptData?.name ?? '?'}</p>
    <PropertiesDisplay {comparasion} />
  </div>
</li>
