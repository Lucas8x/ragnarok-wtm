<script lang="ts">
  import { VMasonry } from 'virtua/svelte';
  import Input from '$lib/components/ui/input/input.svelte';
  import LoadingButton from '$src/componentes/LoadingButton.svelte';
  import MonsterLisItem from '$src/componentes/MonsterLisItem.svelte';
  import monsters from '$src/data/monsters.json';
  import {
    ignoreIdsFileServer,
    ignoreStore,
    toggleMonster,
  } from '$src/stores/dev.monster-manager';
  import { groupSameName } from '$src/utils/groupSameName';

  const groupedByName = groupSameName();

  let showAllMonsters = $state(true);
  let searchValue = $state('');

  const ignored = $derived(ignoreStore.current);

  const filteredMonstersByText = $derived(
    monsters.filter((monster) => {
      const loweredSearch = searchValue.toLowerCase();
      return (
        monster.name.toLowerCase().includes(loweredSearch) ||
        monster.aegisName.toLowerCase().includes(loweredSearch)
      );
    })
  );
</script>

<div class="mt-4 flex h-full flex-col gap-4">
  <header class="flex w-full max-w-2xl gap-2 space-y-2 self-center">
    <Input
      class="disabled:cursor-not-allowed"
      disabled={!showAllMonsters}
      placeholder="Filter by name"
      bind:value={searchValue}
    />

    <div class="flex w-96 items-center gap-2">
      <input type="checkbox" bind:checked={showAllMonsters} />
      <span>Show all monsters</span>
    </div>

    <LoadingButton
      onclick={async () => {
        const error = await ignoreIdsFileServer('POST');
        if (error) {
          console.error('[Disk-Server] [POST] Error: ', error);
        }
      }}
    >
      Save to disk
    </LoadingButton>

    <LoadingButton
      onclick={async () => {
        const error = await ignoreIdsFileServer('GET');
        if (error) {
          console.error('[Disk-Server] [GET] Error: ', error);
        }
      }}
    >
      Restore from disk
    </LoadingButton>
  </header>

  {#if showAllMonsters}
    <VMasonry
      data={filteredMonstersByText}
      gap={8}
      getKey={(monster: (typeof monsters)[number]) => monster.id}
      lanes={10}
    >
      {#snippet children(monster: (typeof monsters)[number])}
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
