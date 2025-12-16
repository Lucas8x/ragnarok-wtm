import { type Writable, writable } from 'svelte/store';

export function useSearchParams<T = string>(
  key: string,
  defaultValue: T,
): Writable<T> & {
  setParam: (value: T) => void;
  refresh: () => void;
} {
  function read(): T {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get(key);
    return raw === null ? (defaultValue as T) : (raw as T);
  }

  function write(value: T) {
    const url = new URL(window.location.href);

    if (value === undefined || value === null) {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, String(value));
    }

    history.replaceState(null, '', url);
    store.set(value);
  }

  function refresh() {
    store.set(read());
  }

  const store = writable<T>(read());

  window.addEventListener('popstate', refresh);

  return {
    ...store,
    setParam: write,
    refresh,
  };
}
