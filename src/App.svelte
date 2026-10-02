<script lang="ts">
  import { ModeWatcher } from 'mode-watcher';
  import type { Component } from 'svelte';
  import { _ } from 'svelte-i18n';
  import Footer from '$src/componentes/Footer.svelte';
  import NavigationBar from '$src/componentes/NavigationBar.svelte';
  import { PAGES_CONFIG } from '$src/pages/pages';
  import { route } from '$src/stores/router';
  import ThemeSwitch from './componentes/ThemeSwitch.svelte';
  import BlockyBackground from './componentes/ui/BlockyBackground.svelte';
  import { loadPageComponent } from './utils/loadPageComponent';

  let ComponentPage = $state<Component>();

  const canViewTransition =
    typeof document !== 'undefined' && 'startViewTransition' in document;

  async function changeRoute(routePath: string) {
    if (canViewTransition) {
      document.startViewTransition(async () => {
        ComponentPage = await loadPageComponent(routePath);
      });
    } else {
      ComponentPage = await loadPageComponent(routePath);
    }
  }

  $effect(() => {
    changeRoute($route);
  });
</script>

<svelte:head>
  {#if $route in PAGES_CONFIG}
    <title>
      {$_(PAGES_CONFIG[$route as keyof typeof PAGES_CONFIG].titleID)}
      - Ragnarok
    </title>
  {:else}
    <title>{$_('page_title_404')} - Ragnarok</title>
  {/if}
</svelte:head>

<main class="flex h-full w-full flex-col font-sans antialiased">
  <!-- <ModeWatcher /> -->

  <BlockyBackground>
    <NavigationBar />

    <div class="flex w-full flex-1">
      <div class="page-transition-container w-full px-2">
        <ComponentPage />
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
