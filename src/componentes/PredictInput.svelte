<script lang="ts">
  import { Send } from '@lucide/svelte/icons';
  import { Button } from '$lib/components/ui/button';
  import * as Command from '$lib/components/ui/command';
  import monsters from '../data/monsters.json';

  let {
    scored,
    search = $bindable(''),
    onSelect,
  }: {
    scored: boolean;
    search: string;
    onSelect: (id: number, name: string) => void;
  } = $props();

  let filtered = $derived(
    monsters
      .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 6),
  );
</script>

<div class="flex gap-2">
  <Command.Root class="bg-white ">
    <Command.Input
      bind:value={search}
      placeholder={scored ? 'You got it!' : 'Guess a monster...'}
      disabled={scored} />

    <Command.List>
      {#if search.trim().length > 0 && filtered.length > 0}
        <Command.Group>
          {#each filtered as monster (monster.id)}
            <Command.Item onSelect={() => onSelect(monster.id, monster.name)}>
              <span>{monster.name}</span>
            </Command.Item>
          {/each}
        </Command.Group>
      {:else if search.trim().length > 0 && filtered.length === 0}
        <Command.Empty>No results found.</Command.Empty>
      {/if}
    </Command.List>
  </Command.Root>

  <!-- <button
    type="submit"
    disabled={!search || !search.trim()}
    class="bg-neo-green neo-border neo-shadow px-6 py-3 transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_0px_oklch(0.15_0_0)]">
    <Send className="w-6 h-6 text-foreground" />
  </button> -->
</div>
