<script lang="ts">
  import SearchIcon from '@lucide/svelte/icons/search';
  import { Command as CommandPrimitive } from 'bits-ui';
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    value = $bindable(''),
    hideIcon = false,
    ...restProps
  }: CommandPrimitive.InputProps & {
    hideIcon?: boolean;
  } = $props();
</script>

<div
  class="flex h-9 gap-2 items-center border-b-2 border-border px-3"
  data-slot="command-input-wrapper"
>
  {#if !hideIcon}
    <SearchIcon class="h-4 w-4 opacity-50" />
  {/if}
  <CommandPrimitive.Input
    data-slot="command-input"
    class={cn(
      'flex h-10 w-full rounded-base bg-transparent py-3 text-sm outline-hidden placeholder:text-main-foreground placeholder:opacity-50 disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    bind:ref
    {...restProps}
    bind:value
  />
</div>
