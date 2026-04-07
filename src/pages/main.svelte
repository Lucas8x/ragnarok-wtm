<script lang="ts">
  import { Calendar, Flame, Hash, Send, Star } from '@lucide/svelte/icons';
  import * as Card from '$lib/components/ui/card';
  import PredictInput from '$src/componentes/PredictInput.svelte';
  import { dailyStore, getGameData } from '$src/stores/daily-store.svelte';
  import { useSearchParams } from '$src/utils/useSearchParams.svelte';
  import AttemptsShowcase from '../componentes/AttemptsShowcase.svelte';
  import { dayjs } from '../utils/dayjs';

  const dateFormat = 'DDMMYYYY';
  const urlDate = useSearchParams('date', dayjs.utc().format(dateFormat));

  const { handleGuess } = dailyStore;

  const gameData = $derived(getGameData($urlDate));

  let search = $state('');
</script>

<div class="flex flex-col items-center justify-center gap-6 pt-4">
  {#if gameData.isPastDate}
    <Card.Root>
      <Card.Content class="px-8 text-center">
        <span>
          You playing the game of the day
          <b>{gameData.gameDate.format('DD/MM/YYYY')}</b>
        </span>
      </Card.Content>
    </Card.Root>
  {/if}

  <div
    class="bg-neo-red neo-border shadow-shadow mt-2 inline-flex items-center gap-2 px-4 py-2"
  >
    <Flame
      className="w-5 h-5"
      fill={gameData.streak.onFire ? 'red' : 'transparent'}
    />
    <span class="font-bold">STREAK: {gameData.streak.streak}</span>
  </div>

  <Card.Root class="w-full">
    <Card.Content class="space-y-4 px-8 text-center">
      <div
        class="bg-neo-yellow neo-border inline-flex items-center gap-2 px-4 py-2"
      >
        <Calendar className="w-5 h-5" />
        <span class="font-bold">Monster of the day</span>
      </div>

      <h2 class="text-lg font-bold">Can you guess the monster of the day?</h2>

      <PredictInput
        bind:search
        scored={gameData.scored}
        onSelect={(id) => {
          handleGuess(gameData.dateGameKey, id);
          search = '';
        }}
      />
    </Card.Content>
  </Card.Root>

  <AttemptsShowcase
    attempts={gameData.attempts}
    correctID={gameData.correctID}
  />
</div>
