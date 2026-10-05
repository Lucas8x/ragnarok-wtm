import { writable } from 'svelte/store';

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

function getRoute(pathname: string) {
  if (!basePath) {
    return pathname || '/';
  }

  if (pathname === basePath || pathname === `${basePath}/`) {
    return '/';
  }

  return pathname.startsWith(`${basePath}/`)
    ? pathname.slice(basePath.length)
    : pathname;
}

export function toAppPath(path: string) {
  return `${basePath}${path === '/' ? '/' : path}`;
}

export const route = writable(getRoute(window.location.pathname));

window.addEventListener('popstate', () => {
  route.set(getRoute(window.location.pathname));
});
