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

  const canViewTransition =
    typeof document !== 'undefined' && 'startViewTransition' in document;

  const isDev = process.env.NODE_ENV === 'development';

  async function loadPage(routePath: string) {
    isLoading = true;

    async function loadComponent() {
      if (isDev && routePath === '/list') {
        const module = await import('$src/pages/list.svelte');
        return module.default;
      }

      if (routePath in pageModules) {
        return pageModules[routePath as keyof typeof pageModules]();
      }

      const module = await import('$src/pages/error.svelte');
      return module.default;
    }

    if (canViewTransition) {
      document.startViewTransition(async () => {
        ComponentPage = await loadComponent();
      });
    } else {
      ComponentPage = await loadComponent();
    }

    isLoading = false;
  }

  $effect(() => {
    loadPage($route);
  });
</script>

<svelte:head>
  <title>{$_(titles[$route]) || '404'} - Ragnarok</title>
</svelte:head>

<main class="flex h-full w-full flex-col font-sans antialiased">
  <!-- <ModeWatcher /> -->

  <BlockyBackground>
    <NavigationBar />

    <div class="flex w-full flex-1 justify-center">
      <div class="page-transition-container w-full max-w-xl px-2">
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

<style>
  .page-transition-container {
    view-transition-name: ragnarok-page;
  }

  .page-transition-container::view-transition-old(root) {
    animation: fade-out 220ms ease-in-out both;
  }

  .page-transition-container::view-transition-new(root) {
    animation: fade-in 220ms ease-in-out both;
  }

  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
