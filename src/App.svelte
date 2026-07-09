<script lang="ts">
  import { ModeWatcher } from 'mode-watcher';
  import type { Component } from 'svelte';
  import { _ } from 'svelte-i18n';
  import Footer from '$src/componentes/Footer.svelte';
  import NavigationBar from '$src/componentes/NavigationBar.svelte';
  import { route } from '$src/stores/router';
  import ThemeSwitch from './componentes/ThemeSwitch.svelte';
  import BlockyBackground from './componentes/ui/BlockyBackground.svelte';

  const titles: Record<string, string> = {
    '/': 'page_title',
    '/connoisseur': 'page_title_connoisseur',
    '/custom': 'page_title_custom',
    '/wordle': 'page_title_wordle',
  };

  const pageModules = {
    '/': () => import('$src/pages/main.svelte').then((m) => m.default),
    //'/connoisseur': () => import('$src/pages/connoisseur.svelte').then((m) => m.default),
    '/wordle': () => import('$src/pages/wordle.svelte').then((m) => m.default),
    //'/custom': () => import('$src/pages/custom.svelte').then((m) => m.default),
  };

  let ComponentPage = $state<Component>();
  let isLoading = $state(false);

  const isDev = process.env.NODE_ENV === 'development';

  $effect(() => {
    isLoading = true;

    if (isDev && $route === '/list') {
      import('$src/pages/list.svelte').then((m) => {
        ComponentPage = m.default;
      });
      isLoading = false;
      return;
    }

    if ($route in pageModules) {
      pageModules[$route as keyof typeof pageModules]().then((c) => {
        ComponentPage = c;
      });
    } else {
      import('$src/pages/error.svelte').then((m) => {
        ComponentPage = m.default;
      });
    }

    isLoading = false;
  });
</script>

<svelte:head><title>{$_(titles[$route])} - Ragnarok</title></svelte:head>

<main class="flex h-full w-full flex-col font-sans antialiased">
  <!-- <ModeWatcher /> -->

  <BlockyBackground>
    <NavigationBar />

    <div class="flex w-full flex-1 justify-center">
      <div class="w-full max-w-xl px-2">
        {#if ComponentPage}
          <ComponentPage />
        {:else if isLoading}
          <div class="flex h-64 items-center justify-center">
            <div>Loading...</div>
          </div>
        {/if}
      </div>
    </div>

    <Footer />
  </BlockyBackground>

  <!-- <div class="absolute right-2 bottom-2">
    <ThemeSwitch />
  </div> -->
</main>
