<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import * as Command from '$lib/components/ui/command';
  import monsters from '../data/monsters.json';

  let search = $state('');
  let attempts = $state<number[]>([]);
  let scored = $state(false);

  let filtered = $derived(
    monsters
      .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 6)
  );

  function handleGuess(selectID: number) {
    if (scored) return;

    attempts.push(selectID);

    if (selectID === 1001) {
      scored = true;
    }
    search = '';
  }
</script>

<main class="h-screen">
  <div class="flex flex-col items-center justify-center gap-6 p-4">
    <Card.Root>
      <Card.Content class="px-8 text-center">
        <h2>Can you guess the monster of the day?</h2>
      </Card.Content>
    </Card.Root>

    <div class="flex flex-col gap-2 text-center">
      <span>You did {attempts.length} attemps.</span>

      <Command.Root class="bg-white ">
        <Command.Input
          bind:value={search}
          placeholder={scored ? 'You got it!' : 'Guess one...'}
          hideIcon={scored}
          disabled={scored}
        />

        <Command.List>
          {#if search.trim().length > 0 && filtered.length > 0}
            <Command.Group>
              {#each filtered as monster (monster.id)}
                <Command.Item onSelect={() => handleGuess(monster.id)}>
                  <span>{monster.name}</span>
                </Command.Item>
              {/each}
            </Command.Group>
          {:else if search.trim().length > 0 && filtered.length === 0}
            <Command.Empty>No results found.</Command.Empty>
          {/if}
        </Command.List>
      </Command.Root>

      {#each attempts as monsterID}
        <span>{monsterID}</span>
      {/each}
    </div>
  </div>
</main>
