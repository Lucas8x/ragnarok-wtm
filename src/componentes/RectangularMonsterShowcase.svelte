<script lang="ts">
  import { onMount } from 'svelte';
  import * as Card from '$lib/components/ui/card';
  import { spritesImages } from '$src/utils';

  let {
    id,
    name,
    children,
  }: {
    id: number | string;
    name: string;
    children?: unknown;
  } = $props();

  let imgSrc: string | null = $state(null);
  let isLoading: boolean = $state(true);

  onMount(async () => {
    const key = `/src/assets/sprites/${id}.png`;
    isLoading = true;
    imgSrc = await spritesImages[key]();
    isLoading = false;
  });
</script>

<li class="neo-border flex items-center gap-2 bg-pink-400 p-2">
  <Card.Root class="p-2">
    <Card.Content class="px-1 py-4">
      {#if imgSrc && !isLoading}
        <enhanced:img class="size-12 object-contain" src={imgSrc} alt={name} />
      {:else if isLoading}
        <div class="bg-amber-500">Loading</div>
      {:else}
        <div
          class="bg-red-500"
          style="width:100%;height:100%;background:#eee;display:flex;align-items:center;justify-content:center;color:#666">
          <span>?</span>
        </div>
      {/if}
    </Card.Content>
  </Card.Root>

  <div>
    <span>{name}</span>
    <div>attributes</div>
  </div>
</li>
