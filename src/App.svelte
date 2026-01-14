<script lang="ts">
  import { _ } from 'svelte-i18n';
  import Footer from '$src/componentes/Footer.svelte';
  import NavigationBar from '$src/componentes/NavigationBar.svelte';
  import Connoisseur from '$src/pages/connoisseur.svelte';
  import Custom from '$src/pages/custom.svelte';
  import Home from '$src/pages/main.svelte';
  import Wordle from '$src/pages/wordle.svelte';
  import { route } from '$src/stores/router';

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
  class="bg-orange-100 h-screen flex flex-col w-full antialiased font-sans bg-"
>
  <NavigationBar />

  <div class="flex h-full w-full justify-center">
    <div class="max-w-xl w-full">
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
</main>
