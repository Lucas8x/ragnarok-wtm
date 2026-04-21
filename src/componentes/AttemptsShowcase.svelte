<script lang="ts">
  import { Card, CardContent } from '$lib/components/ui/card';
  import RectangularMonsterShowcase from './RectangularMonsterShowcase.svelte';

  let { attempts, correctID }: { attempts: number[]; correctID: number } =
    $props();
</script>

<Card class="w-full">
  <CardContent class="px-4">
    {#if attempts.length === 0}
      <div class="text-center">Your attempts you be show here.</div>
    {:else}
      <div class="flex flex-col gap-4">
        <h3 class="font-semibold">ATTEMPTS: {attempts.length}</h3>

        <ul class="max-h-96 space-y-2 overflow-y-auto">
          {#each attempts as monsterID, i (`${i}-${monsterID}`)}
            <RectangularMonsterShowcase {monsterID} {correctID} />
          {/each}
        </ul>
      </div>
    {/if}
  </CardContent>
</Card>
