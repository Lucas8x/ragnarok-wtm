<script lang="ts">
  import { cn } from '$lib/utils';
  import { route } from '$src/stores/router';

  let { href = '/', children } = $props();
</script>

<a
  class={cn(
    'neo-border hover:shadow-shadow px-4 py-1 text-sm font-medium tracking-wide uppercase underline-offset-4 transition ease-in-out sm:text-base',
    {
      'bg-white text-black shadow-shadow': $route === href,
      'font-bold': $route === href,
    },
  )}
  {href}
>
  {@render children?.()}
</a>
