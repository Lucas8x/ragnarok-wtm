<script lang="ts">
  import { ModeWatcher } from 'mode-watcher';
  import { _ } from 'svelte-i18n';
  import Footer from '$src/componentes/Footer.svelte';
  import NavigationBar from '$src/componentes/NavigationBar.svelte';
  import Connoisseur from '$src/pages/connoisseur.svelte';
  import Custom from '$src/pages/custom.svelte';
  import Home from '$src/pages/main.svelte';
  import Wordle from '$src/pages/wordle.svelte';
  import { route } from '$src/stores/router';
  import ThemeSwitch from './componentes/ThemeSwitch.svelte';

  const titles: Record<string, string> = {
    '/': 'page_title',
    '/connoisseur': 'page_title_connoisseur',
    '/wordle': 'page_title_wordle',
    '/custom': 'page_title_custom',
  };
</script>

<svelte:head>
  <title>{$_(titles[$route])} - Ragnarok</title>
</svelte:head>

<main
  class="bg- flex h-screen w-full flex-col bg-orange-100 font-sans antialiased">
  <ModeWatcher />

  <NavigationBar />

  <div class="flex h-full w-full justify-center">
    <div class="w-full max-w-xl">
      {#if $route === '/'}
        <Home />
      {:else if $route === '/connoisseur'}
        <Connoisseur />
      {:else if $route === '/wordle'}
        <Wordle />
      {:else if $route === '/custom'}
        <Custom />
      {/if}
    </div>
  </div>

  <!-- <Footer /> -->

  <!-- <div class="absolute right-2 bottom-2">
    <ThemeSwitch />
  </div> -->
</main>
