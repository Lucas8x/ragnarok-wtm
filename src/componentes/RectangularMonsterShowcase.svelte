<script lang="ts">
  import { onMount } from 'svelte';
  import * as Card from '$lib/components/ui/card';
  import { spritesImages } from '$src/utils';

  let { id, name } = $props();
  let imgSrc: string | null = $state(null);

  onMount(async () => {
    const key = `/src/assets/sprites/${id}.png`;
    imgSrc = await spritesImages[key]();
  });
</script>

<div class="flex">
  {#if imgSrc}
    <enhanced:img
      src={imgSrc}
      alt={name}
      style="width:100%; height:100%; object-fit:cover"
    />
  {:else}
    <div
      style="width:100%;height:100%;background:#eee;display:flex;align-items:center;justify-content:center;color:#666"
    >
      <span>No image</span>
    </div>
  {/if}

  <span>{name}</span>

  <div></div>
</div>
