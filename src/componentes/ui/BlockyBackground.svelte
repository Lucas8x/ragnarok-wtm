<script lang="ts">
  import BlockDecorationItem from './BlockDecorationItem.svelte';

  let { children } = $props();
</script>

<div
  class="w-full h-full line-grid bg-size-[32px_32px] flex flex-col relative overflow-auto"
>
  {@render children?.()}

  <div
    aria-hidden="true"
    class="absolute inset-0 pointer-events-none overflow-hidden z-[-1]"
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
