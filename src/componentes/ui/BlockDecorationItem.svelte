<script lang="ts">
  import { cn } from '$lib/utils';
  import { randomInt } from '$src/utils';

  const size = `${randomInt(20, 40)}px`;
  const color = randomInt(0, 4);
  let { side }: { side: 'left' | 'right' } = $props();

  const styleVars = {
    top: `${randomInt(5, 95)}%`,
    opacity: `${randomInt(10, 50)}%`,
    animDuration: `${randomInt(5, 15)}s`,
    x1: `${randomInt(-10, 10)}px`,
    y1: `${randomInt(-10, 10)}px`,
    x2: `${randomInt(-10, 10)}px`,
    y2: `${randomInt(-10, 10)}px`,
    r1: `${randomInt(-5, 5)}deg`,
    r2: `${randomInt(-5, 5)}deg`,
  };

  const sides = $derived({
    left: side === 'left' ? `${randomInt(2, 6)}%` : null,
    right: side === 'right' ? `${randomInt(2, 6)}%` : null,
  });
</script>

<div
  class={cn(
    'repeat-infinite absolute border-3 border-black shadow-shadow ease-in-out',
    {
      'bg-white': color === 0,
      'bg-neo-blue': color === 1,
      'bg-neo-pink': color === 2,
      'bg-neo-green': color === 3,
      'bg-neo-yellow': color === 4,
    }
  )}
  style:--r1={styleVars.r1}
  style:--r2={styleVars.r2}
  style:--x1={styleVars.x1}
  style:--x2={styleVars.x2}
  style:--y1={styleVars.y1}
  style:--y2={styleVars.y2}
  style:animation-duration={styleVars.animDuration}
  style:height={size}
  style:left={sides.left}
  style:opacity={styleVars.opacity}
  style:right={sides.right}
  style:top={styleVars.top}
  style:width={size}
></div>

<style>
  div {
    animation-name: levitate;
  }

  @keyframes levitate {
    0%,
    100%,
    to {
      transform: translate(0) rotate(0);
    }
    33% {
      transform: translate(var(--x1), var(--y1)) rotate(var(--r1));
    }
    66% {
      transform: translate(var(--x2), var(--y2)) rotate(var(--r2));
    }
  }
</style>
