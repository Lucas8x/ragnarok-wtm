<script lang="ts">
  import { onMount } from 'svelte';
  import * as Card from '$lib/components/ui/card';
  import { spritesImages } from '$src/utils';

  type Props = {
    id: number | string;
    name: string;
  };
  let { id, name }: Props = $props();

  let imgSrc: string | null = $state(null);
  let isLoading: boolean = $state(true);

  onMount(async () => {
    const key = `/src/assets/sprites/${id}.png`;
    isLoading = true;
    imgSrc = await spritesImages[key]();
    isLoading = false;
  });
</script>

<div class="flex items-center gap-2">
  {#if imgSrc && !isLoading}
    <enhanced:img class="size-12 object-contain" src={imgSrc} alt={name} />
  {:else if isLoading}
    <div class="bg-amber-500">Loading</div>
  {:else}
    <div
      class="bg-red-500"
      style="width:100%;height:100%;background:#eee;display:flex;align-items:center;justify-content:center;color:#666"
    >
      <span>No image</span>
    </div>
  {/if}

  <span>{name}</span>

  <div></div>
</div>
