<script lang="ts">
  import { Heart, Maximize2, Zap } from '@lucide/svelte/icons';
  import type { compareProperties } from '$src/utils/compare-properties';
  import PropertyItem from './PropertyItem.svelte';

  let { comparasion }: { comparasion: ReturnType<typeof compareProperties> } =
    $props();
</script>

<div class="grid grid-cols-3 gap-2">
  <PropertyItem
    title="Level"
    icon={Zap}
    text={comparasion.attemptData?.level}
    result={comparasion.level} />

  <PropertyItem
    title="HP"
    icon={Heart}
    text={comparasion.attemptData?.hp}
    result={comparasion.hp} />

  <PropertyItem
    title="Size"
    icon={Maximize2}
    text={comparasion.attemptData?.size}
    result={comparasion.size} />

  <PropertyItem
    title="Race"
    icon={Maximize2}
    text={comparasion.attemptData?.race}
    result={comparasion.race} />

  <PropertyItem
    title="Race"
    icon={Maximize2}
    text={comparasion.attemptData?.element}
    result={comparasion.element} />
</div>
