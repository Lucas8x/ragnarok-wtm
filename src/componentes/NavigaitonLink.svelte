<script lang="ts">
  import { cn } from '$lib/utils';
  import { route } from '$src/stores/router';

  let { href = '/', children } = $props();
</script>

<a
  {href}
  class={cn('text-sm font-medium underline-offset-4 sm:text-base', {
    underline: $route === href,
    'font-bold': $route === href,
  })}>
  {@render children?.()}
</a>
