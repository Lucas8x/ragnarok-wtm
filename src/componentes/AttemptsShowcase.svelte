<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { cn } from '$lib/utils';
  import { route } from '$src/stores/router';
  import RectangularMonsterShowcase from './RectangularMonsterShowcase.svelte';

  let { attempts } = $props();
</script>

<Card.Root class="w-full">
  <Card.Content class="px-4">
    <div class="flex flex-col gap-4">
      <h3 class="font-semibold">ATTEMPTS: {attempts.length}</h3>

      <ul class="space-y-2 overflow-y-auto max-h-80">
        {#each attempts as monster}
          <RectangularMonsterShowcase id={monster.id} name={monster.name} />
        {/each}
      </ul>
    </div>
  </Card.Content>
</Card.Root>
