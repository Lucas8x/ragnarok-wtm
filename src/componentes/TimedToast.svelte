<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { Alert, Title } from '$src/lib/components/ui/alert';

  let timer: NodeJS.Timeout;
  let { onClose, ms = 1500 } = $props();

  onMount(() => {
    timer = setTimeout(() => {
      onClose();
    }, ms);
  });

  onDestroy(() => clearTimeout(timer));
</script>

<div class="absolute top-2/5 shadow-xl" transition:fade>
  <Alert><Title class="text-2xl">This monster doesn't exist</Title></Alert>
</div>
