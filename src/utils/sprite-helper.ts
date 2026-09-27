export const spritesImages = import.meta.glob('/src/assets/sprites/*.png', {
  import: 'default',
  query: {
    enhanced: true,
  },
}) as Record<string, () => Promise<string>>;
