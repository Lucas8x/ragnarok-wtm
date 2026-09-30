export const PAGES_CONFIG = {
  '/': {
    titleID: 'page_title_home',
    navbarText: 'Daily',
    module: () => import('$src/pages/main.svelte'),
    disabled: false,
  },

  '/connoisseur': {
    titleID: 'page_title_connoisseur',
    navbarText: 'Connoisseur',
    module: () => import('$src/pages/connoisseur.svelte'),
    disabled: true,
  },

  '/wordle': {
    titleID: 'page_title_wordle',
    navbarText: 'Wordle',
    module: () => import('$src/pages/wordle.svelte'),
    disabled: false,
  },

  '/custom': {
    titleID: 'page_title_custom',
    navbarText: 'Daily',
    module: () => import('$src/pages/custom.svelte'),
    disabled: true,
  },

  '/list': {
    titleID: 'page_title_list',
    navbarText: 'List',
    module: () => import('$src/pages/list.svelte'),
    disabled: process.env.NODE_ENV !== 'development',
  },
};
