<script lang="ts">
  import { LoaderCircle } from '@lucide/svelte/icons';
  import { VMasonry } from 'virtua/svelte';
  import { Button } from '$lib/components/ui/button';
  import Input from '$lib/components/ui/input/input.svelte';
  import type { Monster } from '$src/@types';
  import MonsterLisItem from '$src/componentes/MonsterLisItem.svelte';
  import monsters from '$src/data/monsters.json';
  import {
    ignoreStore,
    saveToDisk,
    toggleMonster,
  } from '$src/stores/dev.monster-manager';
  import { groupSameName } from '$src/utils/groupSameName';

  const groupedByName = groupSameName();

  let showAllMonsters = $state(true);
  let searchValue = $state('');
  let isSavingOnDisk = $state(false);

  const ignored = $derived(ignoreStore.current);

  const filteredMonstersByText = $derived(
    monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchValue.toLowerCase())
    )
  );
</script>

<div class="mt-4 flex h-full flex-col gap-4">
  <header class="max-w-2xl space-y-2 self-center flex gap-2 w-full">
    <Input
      class="disabled:cursor-not-allowed"
      disabled={!showAllMonsters}
      oninput={(e) => {
        searchValue = e.currentTarget.value;
      }}
      placeholder="Filter by name"
    />

    <div class="flex items-center gap-2 w-96">
      <input type="checkbox" bind:checked={showAllMonsters} />
      <span>Show all monsters</span>
    </div>

    <Button
      class="cursor-pointer w-fit disabled:cursor-not-allowed"
      disabled={isSavingOnDisk}
      onclick={async () => {
        isSavingOnDisk = true;
        const [error] = await saveToDisk();
        console.error('[Disk-Server] Error: ', error);
        isSavingOnDisk = false;
      }}
      type="button"
    >
      Save to disk
      {#if isSavingOnDisk}
        <LoaderCircle class="animate-spin" />
      {/if}
    </Button>
  </header>

  {#if showAllMonsters}
    <VMasonry
      data={filteredMonstersByText}
      gap={8}
      getKey={(monster: Monster) => monster.id}
      lanes={10}
    >
      {#snippet children(
        monster: Monster
      )}
        <MonsterLisItem
          id={monster.id}
          isDuplicate={false}
          isIgnored={ignored.includes(monster.id)}
          name={monster.name}
          onToggle={() => toggleMonster(monster.id)}
        />
      {/snippet}
    </VMasonry>
  {:else}
    <div class="w-full max-w-4xl self-center">
      {#each Object.entries(groupedByName) as groupItem}
        <ul class="grid w-full grid-cols-6 gap-2">
          <MonsterLisItem
            id={groupItem[1].lowestId}
            isDuplicate={false}
            isIgnored={ignored.includes(groupItem[1].lowestId)}
            name={groupItem[0]}
            onToggle={() => toggleMonster(groupItem[1].lowestId)}
          />

          {#each groupItem[1].otherIds as duplicate (duplicate)}
            <MonsterLisItem
              id={duplicate}
              isDuplicate
              isIgnored={ignored.includes(duplicate)}
              name={groupItem[0]}
              onToggle={() => toggleMonster(duplicate)}
            />
          {/each}
        </ul>

        <div class="m-4 border"></div>
      {/each}
    </div>
  {/if}
</div>
