<script lang="ts">
  import type { compareProperties } from '$src/utils/compare-properties';
  import PropertyItem from './PropertyItem.svelte';

  let { comparasion }: { comparasion: ReturnType<typeof compareProperties> } =
    $props();
</script>

<div class="flex gap-2">
  <PropertyItem
    title="Level"
    text={comparasion.attemptData?.level}
    result={comparasion.level} />

  <PropertyItem
    title="HP"
    text={comparasion.attemptData?.hp}
    result={comparasion.hp} />

  <PropertyItem
    title="Size"
    text={comparasion.attemptData?.size}
    result={comparasion.size} />
</div>
