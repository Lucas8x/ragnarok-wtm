<script lang="ts">
  import type {
    Command as CommandPrimitive,
    Dialog as DialogPrimitive,
  } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import Command from './command.svelte';
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import type { WithoutChildrenOrChild } from '$lib/utils.js';

  let {
    open = $bindable(false),
    ref = $bindable(null),
    value = $bindable(''),
    title = 'Command Palette',
    description = 'Search for a command to run',
    portalProps,
    children,
    ...restProps
  }: WithoutChildrenOrChild<DialogPrimitive.RootProps> &
    WithoutChildrenOrChild<CommandPrimitive.RootProps> & {
      portalProps?: DialogPrimitive.PortalProps;
      children: Snippet;
      title?: string;
      description?: string;
    } = $props();
</script>

<Dialog.Root bind:open {...restProps}>
  <Dialog.Header class="sr-only">
    <Dialog.Title>{title}</Dialog.Title>
    <Dialog.Description>{description}</Dialog.Description>
  </Dialog.Header>
  <Dialog.Content
    class="overflow-hidden p-0 rounded-[0px]! shadow-shadow border-0"
    {portalProps}
  >
    <Command
      class="**:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-heading [&_[cmdk-group-heading]]:mb-1 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
      {...restProps}
      bind:value
      bind:ref
      {children}
    />
  </Dialog.Content>
</Dialog.Root>
