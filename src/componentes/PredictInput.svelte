<script lang="ts">
  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from '$lib/components/ui/command';
  import { monsterWithIgnoreFilter } from '$src/utils';
  import SpriteCard from './SpriteRender.svelte';

  let {
    scored = false,
    search = $bindable(''),
    onSelect,
  }: {
    scored: boolean;
    search: string;
    onSelect: (id: number) => void;
  } = $props();

  let filtered = $derived(
    monsterWithIgnoreFilter
      .filter((item) =>
        item.name.toLowerCase().startsWith(search.toLowerCase())
      )
      .slice(0, 6)
  );
</script>

<div class="relative h-12">
  <Command class="relative overflow-visible bg-white" shouldFilter={false}>
    <CommandInput
      disabled={scored}
      placeholder={scored ? 'You got it!' : 'Guess a monster...'}
      bind:value={search}
    />

    <CommandList class="absolute top-full right-0 left-0 z-1 bg-white">
      {#if search.trim().length > 0 && filtered.length > 0}
        <CommandGroup class="neo-border">
          {#each filtered as monster (monster.id)}
            <CommandItem
              class="my-1 pb-2 cursor-pointer hover:bg-orange-100! active:bg-orange-200! aria-selected:bg-orange-100 aria-selected:shadow-shadow"
              onSelect={() => onSelect(monster.id)}
            >
              <div class="border-2 p-2  bg-background shadow-shadow">
                <SpriteCard monsterID={monster.id} name={monster.name} />
              </div>
              <p class="ml-2 font-bold tracking-wide">{monster.name}</p>
              <!-- TODO: se tiver modo easy mostrar mais detalhes ex: elemento? -->
            </CommandItem>
          {/each}
        </CommandGroup>
      {:else if search.trim().length > 0 && filtered.length === 0}
        <CommandEmpty class="neo-border">No results found.</CommandEmpty>
      {/if}
    </CommandList>
  </Command>
</div>
