<script lang="ts">
  import { cn } from '$lib/utils';
  import { route } from '$src/stores/router';

  let { href = '/', children } = $props();
</script>

<a
  {href}
  class={cn('underline-offset-4 font-medium sm:text-base text-sm', {
    underline: $route === href,
    'font-bold': $route === href,
  })}
>
  {@render children?.()}
</a>
