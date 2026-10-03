<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import MonsterLisItem from '$src/componentes/MonsterLisItem.svelte';
  import {
    ignoreMonster,
    ignoreStore,
    restoreMonster,
  } from '$src/stores/dev.monster-manager';
  import { monsterWithIgnoreFilter } from '$src/utils';
  import { groupSameName } from '$src/utils/groupSameName';

  let showAllMonsters = $state(false);
  const ignored = $derived(ignoreStore.current);
  const groupedByName = groupSameName();

  function handleMonsterToggle(id: number) {
    if (ignored.includes(id)) {
      restoreMonster(id);
    } else {
      ignoreMonster(id);
    }
  }
</script>

<div class="mt-4 flex h-full flex-col gap-4">
  <header class="max-w-xl space-y-2 self-center">
    <Button
      class="cursor-pointer"
      onclick={() => {
        navigator.clipboard.writeText(JSON.stringify(ignored)).then(() => {
          // biome-ignore lint/suspicious/noAlert: <dev>
          alert('copied');
        });
      }}
      type="button"
    >
      Copy JSON
    </Button>

    <div>
      <input type="checkbox" bind:checked={showAllMonsters} />
      <span>Show all monsters</span>
    </div>
  </header>

  {#if showAllMonsters}
    <ul class="grid w-full grid-cols-11 gap-2">
      {#each monsterWithIgnoreFilter as monsterItem (monsterItem.id)}
        <MonsterLisItem
          id={monsterItem.id}
          isDuplicate={false}
          isIgnored={ignored.includes(monsterItem.id)}
          name={monsterItem.name}
          onToggle={() => handleMonsterToggle(monsterItem.id)}
        />
      {/each}
    </ul>
  {:else}
    <div class="w-full max-w-4xl self-center">
      {#each Object.entries(groupedByName) as groupItem}
        <ul class="grid w-full grid-cols-6 gap-2">
          <MonsterLisItem
            id={groupItem[1].lowestId}
            isDuplicate={false}
            isIgnored={ignored.includes(groupItem[1].lowestId)}
            name={groupItem[0]}
            onToggle={() => handleMonsterToggle(groupItem[1].lowestId)}
          />

          {#each groupItem[1].otherIds as duplicate (duplicate)}
            <MonsterLisItem
              id={duplicate}
              isDuplicate
              isIgnored={ignored.includes(duplicate)}
              name={groupItem[0]}
              onToggle={() => handleMonsterToggle(duplicate)}
            />
          {/each}
        </ul>

        <div class="m-4 border"></div>
      {/each}
    </div>
  {/if}
</div>
