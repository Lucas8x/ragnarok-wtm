<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { cn } from '$lib/utils';
  import monsters from '$src/data/monsters2.json';
  import { route } from '$src/stores/router';
  import RectangularMonsterShowcase from './RectangularMonsterShowcase.svelte';

  let { attempts, correctID }: { attempts: number[]; correctID: number } =
    $props();
</script>

<Card.Root class="w-full">
  <Card.Content class="px-4">
    {#if attempts.length === 0}
      <div class="text-center">Your attempts you be show here.</div>
    {:else}
      <div class="flex flex-col gap-4">
        <h3 class="font-semibold">ATTEMPTS: {attempts.length}</h3>

        <ul class="max-h-80 space-y-2 overflow-y-auto">
          {#each attempts as monsterID, i (`${i}-${monsterID}`)}
            <RectangularMonsterShowcase {monsterID} {correctID} />
          {/each}
        </ul>
      </div>
    {/if}
  </Card.Content>
</Card.Root>
