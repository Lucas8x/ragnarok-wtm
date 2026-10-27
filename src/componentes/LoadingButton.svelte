<script lang="ts">
  import { LoaderCircle } from '@lucide/svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import Button from '$lib/components/ui/button/button.svelte';

  let props: HTMLButtonAttributes & {
    onclick: () => Promise<unknown>;
  } = $props();

  let loading = $state(false);
</script>

<Button
  class="w-fit cursor-pointer disabled:cursor-not-allowed"
  disabled={loading || props.disabled}
  onclick={async () => {
    loading = true;
    await props.onclick();
    loading = false;
  }}
  type="button"
>
  {@render props.children?.()}

  {#if loading}
    <LoaderCircle class="animate-spin" />
  {/if}
</Button>
