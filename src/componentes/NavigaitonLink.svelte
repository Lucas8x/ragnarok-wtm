<script lang="ts">
  import { cn } from '$lib/utils';
  import { route, toAppPath } from '$src/stores/router';

  let { href = '/', children } = $props();
  const appHref = $derived(toAppPath(href));

  function onclick(event: MouseEvent) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();

    if ($route === href) {
      return;
    }

    window.history.pushState(null, '', appHref);
    route.set(href);
  }
</script>

<a
  class={cn(
    'neo-border px-4 py-1 font-medium text-sm uppercase tracking-wide underline-offset-4 transition ease-in-out hover:shadow-shadow sm:text-base',
    {
      'bg-white text-black shadow-shadow': $route === href,
      'font-bold': $route === href,
    }
  )}
  href={appHref}
  {onclick}
>
  {@render children?.()}
</a>
