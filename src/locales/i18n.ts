import { getLocaleFromNavigator, init, register } from 'svelte-i18n';

register('en', () => import('./en.json'));
register('pt-br', () => import('./ptbr.json'));

function normalizeLocale(locale: string | null) {
  if (!locale) {
    return 'en';
  }

  if (locale.toLowerCase().startsWith('pt')) {
    return 'pt-br';
  }
  if (locale.toLowerCase().startsWith('en')) {
    return 'en';
  }

  return 'en';
}

init({
  fallbackLocale: 'en',
  initialLocale: normalizeLocale(getLocaleFromNavigator()),
});
