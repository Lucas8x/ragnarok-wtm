import { readdirSync } from 'node:fs';
import Bun from 'bun';
import { join } from 'path';
import monsters from '../data/monsters.json';

const assetsDir = join(import.meta.dir, '..', 'assets', 'sprites');

const files = readdirSync(assetsDir, {
  withFileTypes: true,
  encoding: 'utf-8',
})
  .filter((dirent) => dirent.isFile())
  .map((dirent) => dirent.name)
  .map((name) => ({
    id: name.split('.')[0],
    name,
  }));

console.log('Total files in assets/sprites:', files.length);

const monstersIDs = monsters.map((monster) => String(monster.id));
console.log('Total monster IDs in monsters.json:', monstersIDs.length);

const unusedFiles = files.filter((file) => !monstersIDs.includes(file.id));
console.log('Total unused files to delete:', unusedFiles.length);

if (unusedFiles.length > 0) {
  for (const file of unusedFiles) {
    const filePath = join(assetsDir, file.name);
    Bun.file(filePath).delete();
  }
  console.log('Unused files deleted successfully.');
} else {
  console.log('No unused files to delete.');
}
const diff = monstersIDs.length - (files.length - unusedFiles.length);

if (diff > 0) {
  console.warn(
    `Missing ${diff} sprites for monsters in monsters.json may indicate incomplete assets.`,
  );
}
