<script lang="ts">
  import { LoaderCircle } from '@lucide/svelte/icons';
  import { cn } from '$lib/utils.js';

  let props: {
    monsterID: number;
    name: string;
  } = $props();

  let isLoading = $state(true);
  let imgError = $state(false);
</script>

<div class="flex size-12 items-center justify-center">
  {#if !imgError}
    <enhanced:img
      alt={props.name}
      class={cn('size-12 object-contain', { 'size-0': isLoading })}
      onerror={() => {
        isLoading = false;
        imgError = true;
      }}
      onload={() => {
        isLoading = false;
      }}
      src={`${import.meta.env.BASE_URL}sprites/${props.monsterID}.png`}
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
</div>
