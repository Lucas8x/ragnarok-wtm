<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import MonsterLisItem from '$src/componentes/MonsterLisItem.svelte';
  import {
    ignoreMonster,
    ignoreStore,
    restoreMonster,
  } from '$src/stores/dev.monster-manager';
  import { groupSameName } from '$src/utils/groupSameName';

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

  {#each Object.entries(groupedByName) as groupItem}
    <ul class="grid w-full grid-cols-4 gap-2">
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
