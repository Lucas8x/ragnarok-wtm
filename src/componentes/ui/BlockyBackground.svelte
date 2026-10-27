<script lang="ts">
  import BlockDecorationItem from './BlockDecorationItem.svelte';

  let { children } = $props();
</script>

<div
  class="line-grid relative flex h-full w-full flex-col overflow-auto bg-size-[32px_32px]"
>
  {@render children?.()}

  <div
    aria-hidden="true"
    class="pointer-events-none absolute inset-0 z-[-1] overflow-hidden"
  >
    <BlockDecorationItem side="right" />
    <BlockDecorationItem side="left" />
    <BlockDecorationItem side="right" />
    <BlockDecorationItem side="left" />
    <BlockDecorationItem side="right" />
    <BlockDecorationItem side="left" />
  </div>
</div>

<style>
  .line-grid {
    background-image:
      linear-gradient(#0001 1px, #0000 1px),
      linear-gradient(90deg, #0001 1px, #0000 1px);
  }
</style>
