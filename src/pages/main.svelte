<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import * as Command from '$lib/components/ui/command';
  import { dailyStore } from '$src/stores/daily-store.svelte';
  import { useSearchParams } from '$src/utils/useSearchParams.svelte';
  import AttemptsShowcase from '../componentes/AttemptsShowcase.svelte';
  import monsters from '../data/monsters.json';
  import { dayjs } from '../utils/dayjs';

  const { handleGuess } = dailyStore;

  const dateFormat = 'DDMMYYYY';
  const urlDate = useSearchParams('date', dayjs.utc().format(dateFormat));

  const gameDate = $derived(
    dayjs.utc($urlDate, dateFormat).isValid()
      ? dayjs.utc($urlDate, dateFormat)
      : dayjs.utc()
  );
  const isPastDate = $derived(gameDate.isBefore(dayjs.utc(), 'day'));
  const dateGameKey = $derived(gameDate.format(dateFormat));
  let attempts = $derived(
    dailyStore.state.current[dateGameKey]?.attempts ?? []
  );
  let scored = $derived(
    dailyStore.state.current[dateGameKey]?.completed ?? false
  );

  let search = $state('');
  let filtered = $derived(
    monsters
      .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 6)
  );
</script>

<div class="flex flex-col items-center justify-center gap-6 pt-4 w-full">
  {#if isPastDate}
    <Card.Root>
      <Card.Content class="px-8 text-center">
        <span>
          You playing the game of the day <b>{gameDate.format('DD/MM/YYYY')}</b>
        </span>
      </Card.Content>
    </Card.Root>
  {/if}

  <Card.Root>
    <Card.Content class="px-8 text-center">
      <h2>Can you guess the monster of the day?</h2>
    </Card.Content>
  </Card.Root>

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
            <Command.Item
              onSelect={() => {
                handleGuess(dateGameKey, {
                  id: monster.id,
                  name: monster.name,
                });
                search = '';
              }}
            >
              <span>{monster.name}</span>
            </Command.Item>
          {/each}
        </Command.Group>
      {:else if search.trim().length > 0 && filtered.length === 0}
        <Command.Empty>No results found.</Command.Empty>
      {/if}
    </Command.List>
  </Command.Root>

  <AttemptsShowcase {attempts} />
</div>
