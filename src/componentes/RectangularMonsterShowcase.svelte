<script lang="ts">
  import { Card, CardContent } from '$lib/components/ui/card';
  import { cn } from '$lib/utils.js';
  import { compareProperties } from '$src/utils/compare-properties';
  import PropertiesDisplay from './PropertiesDisplay.svelte';
  import SpriteRender from './SpriteRender.svelte';

  let {
    monsterID,
    correctID,
  }: {
    monsterID: number;
    correctID: number;
  } = $props();

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
      <SpriteRender {monsterID} name={comparasion.attemptData?.name ?? '?'} />
    </CardContent>
  </Card>

  <div class="flex w-full flex-col gap-2">
    <p class="text-center font-bold">{comparasion.attemptData?.name ?? '?'}</p>
    <PropertiesDisplay {comparasion} />
  </div>
</li>
