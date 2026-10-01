<script lang="ts">
  import { Atom, Dna, Heart, Maximize2, Zap } from '@lucide/svelte/icons';
  import type { compareProperties } from '$src/utils/compare-properties';
  import PropertyItem from './PropertyItem.svelte';

  let { comparasion }: { comparasion: ReturnType<typeof compareProperties> } =
    $props();
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
  <PropertyItem
    icon={Zap}
    result={comparasion.level}
    text={comparasion.attemptData?.level}
    title="Level"
  />

  <PropertyItem
    icon={Heart}
    result={comparasion.hp}
    text={comparasion.attemptData?.hp}
    title="HP"
  />

  <PropertyItem
    icon={Maximize2}
    result={comparasion.size}
    text={comparasion.attemptData?.size}
    title="Size"
  />

  <PropertyItem
    icon={Dna}
    result={comparasion.race}
    text={comparasion.attemptData?.race}
    title="Race"
  />

  <PropertyItem
    icon={Atom}
    result={comparasion.element}
    text={comparasion.attemptData?.element}
    title="Element"
  />
</div>
