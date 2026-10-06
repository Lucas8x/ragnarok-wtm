<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import {
    Card,
    CardAction,
    CardContent,
    CardFooter,
    CardHeader,
  } from '$lib/components/ui/card';
  import { cn } from '$lib/utils';

  let {
    id,
    name,
    onToggle,
    isDuplicate = false,
    isIgnored = false,
  }: {
    id: number;
    name: string;
    onToggle: () => void;
    isDuplicate: boolean;
    isIgnored: boolean;
  } = $props();
</script>

<Card
  class={cn('max-w-40', {
    'border-2 border-red-500': isDuplicate,
  })}
>
  <CardContent
    class={'flex h-full flex-col items-center justify-between gap-2'}
  >
    <CardHeader
      class={cn('flex flex-col items-center gap-0', {
        'opacity-50': isIgnored,
      })}
    >
      <a
        class="font-bold"
        href={`https://www.divine-pride.net/database/monster/${id}`}
        target="_blank"
        title="DivinePride DB Link"
      >
        {id}
      </a>
      <p class="text-center text-balance">{name}</p>
    </CardHeader>

    <enhanced:img
      alt=""
      class={cn('size-12 object-contain', {
        'opacity-50': isIgnored,
      })}
      src={`${import.meta.env.BASE_URL}sprites/${id}.png`}
    />

    <CardFooter>
      <Button
        class={cn('not-disabled:cursor-pointer', {
          'bg-neo-green': isIgnored,
          'bg-neo-red': !isIgnored,
        })}
        onclick={onToggle}
        type="button"
      >
        {isIgnored ? 'Restore' : 'Ignore'}
      </Button>
    </CardFooter>
  </CardContent>
</Card>
