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

    <CommandList
      class="absolute left-0 right-0 top-full z-1 border border-t-0 bg-white"
    >
      {#if search.trim().length > 0 && filtered.length > 0}
        <CommandGroup>
          {#each filtered as monster (monster.id)}
            <CommandItem onSelect={() => onSelect(monster.id)}>
              <span>{monster.name}</span>
            </CommandItem>
          {/each}
        </CommandGroup>
      {:else if search.trim().length > 0 && filtered.length === 0}
        <CommandEmpty>No results found.</CommandEmpty>
      {/if}
    </CommandList>
  </Command>
</div>
