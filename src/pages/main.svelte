<script lang="ts">
  import {
    Calendar,
    CheckCircle,
    Hash,
    Send,
    Star,
  } from '@lucide/svelte/icons';
  import * as Card from '$lib/components/ui/card';
  import PredictInput from '$src/componentes/PredictInput.svelte';
  import { dailyStore } from '$src/stores/daily-store.svelte';
  import { useSearchParams } from '$src/utils/useSearchParams.svelte';
  import AttemptsShowcase from '../componentes/AttemptsShowcase.svelte';
  import { dayjs } from '../utils/dayjs';

  const dateFormat = 'DDMMYYYY';
  const urlDate = useSearchParams('date', dayjs.utc().format(dateFormat));

  const { handleGuess } = dailyStore;

  let gameDate = $derived(
    dayjs.utc($urlDate, dateFormat).isValid()
      ? dayjs.utc($urlDate, dateFormat)
      : dayjs.utc(),
  );

  let isPastDate = $derived(gameDate.isBefore(dayjs.utc(), 'day'));

  let dateGameKey = $derived(gameDate.format(dateFormat));
  let attempts = $derived(
    dailyStore.state.current[dateGameKey]?.attempts ?? [],
  );
  let scored = $derived(
    dailyStore.state.current[dateGameKey]?.completed ?? false,
  );

  let search = $state('');
</script>

<div class="flex w-full flex-col items-center justify-center gap-6 pt-4">
  {#if isPastDate}
    <Card.Root>
      <Card.Content class="px-8 text-center">
        <span>
          You playing the game of the day
          <b>{gameDate.format('DD/MM/YYYY')}</b>
        </span>
      </Card.Content>
    </Card.Root>
  {/if}

  <Card.Root class="w-full">
    <Card.Content class="space-y-4 px-8 text-center">
      <div
        class="bg-neo-yellow neo-border mb-4 inline-flex items-center gap-2 px-4 py-2">
        <Calendar className="w-5 h-5" />
        <span class="font-bold">Monster of the day</span>
      </div>

      <h2 class="text-lg font-bold">Can you guess the monster of the day?</h2>

      <PredictInput
        bind:search
        {scored}
        onSelect={(id) => {
          handleGuess(dateGameKey, id);
          search = '';
        }} />
    </Card.Content>
  </Card.Root>

  <AttemptsShowcase
    {attempts}
    correctID={dailyStore.state.current[dateGameKey].answerID ?? -1} />
</div>
