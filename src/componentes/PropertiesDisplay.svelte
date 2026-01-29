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
    greater={comparasion.greaterLevel} />
  <PropertyItem
    title="HP"
    text={comparasion.attemptData?.hp}
    greater={comparasion.greaterLevel} />
</div>
