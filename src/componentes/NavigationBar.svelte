<script lang="ts">
  import { _ } from 'svelte-i18n';
  import NavigationLink from './NavigaitonLink.svelte';
</script>

<nav
  class="flex items-center justify-center gap-4 border-b-4 bg-amber-600 p-4 text-white">
  <NavigationLink href="/">Daily</NavigationLink>

  <NavigationLink href="/connoisseur">Connoisseur</NavigationLink>

  <NavigationLink href="/wordle">Wordle</NavigationLink>

  <NavigationLink href="/custom">Custom</NavigationLink>
</nav>
