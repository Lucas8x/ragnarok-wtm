<script lang="ts">
  import { Send } from '@lucide/svelte/icons';
  import { Button } from '$lib/components/ui/button';
  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from '$lib/components/ui/command';
  import monsters from '../data/monsters.json';

  let {
    scored,
    search = $bindable(''),
    onSelect,
  }: {
    scored: boolean;
    search: string;
    onSelect: (id: number) => void;
  } = $props();

  let filtered = $derived(
    monsters
      .filter((item) =>
        item.name.toLowerCase().startsWith(search.toLowerCase())
      )
      .slice(0, 6)
  );
</script>

<div class="flex gap-2">
  <Command class="bg-white ">
    <CommandInput
      bind:value={search}
      placeholder={scored ? 'You got it!' : 'Guess a monster...'}
      disabled={scored}
    />

    <CommandList>
      {#if search.trim().length > 0 && filtered.length > 0}
        <CommandGroup>
          {#each filtered as monster}
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

  <!-- <button
    type="submit"
    disabled={!search || !search.trim()}
    class="bg-neo-green neo-border neo-shadow px-6 py-3 transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_0px_oklch(0.15_0_0)]">
    <Send className="w-6 h-6 text-foreground" />
  </button> -->
</div>
