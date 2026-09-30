import { PAGES_CONFIG } from '$src/pages/pages';

export async function loadPageComponent(routePath: string) {
  if (routePath in PAGES_CONFIG) {
    const page = PAGES_CONFIG[routePath as keyof typeof PAGES_CONFIG];

    if ('disabled' in page && !page.disabled) {
      return (await page.module()).default;
    }
  }

  return (await import('$src/pages/error.svelte')).default;
}
