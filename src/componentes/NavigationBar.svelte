<script lang="ts">
  import { _ } from 'svelte-i18n';
  import { PAGES_CONFIG } from '$src/pages/pages';
  import NavigationLink from './NavigaitonLink.svelte';
</script>

<nav
  class="flex items-center justify-center gap-4 border-b-4 bg-orange-500 p-3 text-white"
>
  {#each Object.entries(PAGES_CONFIG) as page}
    {#if !page[1].disabled}
      <NavigationLink href={page[0]}>{page[1].navbarText}</NavigationLink>
    {/if}
  {/each}
</nav>
