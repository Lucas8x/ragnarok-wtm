import path from 'node:path';
import readline from 'node:readline';
import { file, write, YAML } from 'bun';
import type { Monster } from '$src/@types';

const monsters = (await file(
  path.join(import.meta.dir, 'monsters.json')
).json()) as Monster[];

async function transformYmlToJson() {
  const yml = YAML.parse(
    await file(path.join(import.meta.dir, 'mob_db.yml')).text()
  );

  const data = yml.Body.map((i) => ({
    id: i.Id,
    aegisName: i.AegisName,
    name: i.Name,
    level: i.Level,
    hp: i.Hp,
    size: i.Size,
    race: i.Race,
    element: i.Element,
  }));

  await write(
    path.join(import.meta.dir, 'monsters.json'),
    JSON.stringify(data, null, 0)
  );
}

async function transformToObject() {
  const data = {};

  for (const monster of monsters as Monster[]) {
    const { id, ...rest } = monster;
    data[id] = rest;
  }

  await write(
    path.join(import.meta.dir, 'monsters2.json'),
    JSON.stringify(data, null)
  );
}

async function filterProps() {
  const races = new Set<string | undefined>();
  const elements = new Set<string | undefined>();
  const sizes = new Set<string | undefined>();

  for (const monster of monsters) {
    races.add(monster.race);
    elements.add(monster.element);
    sizes.add(monster.size);
  }

  await write(
    path.join(import.meta.dir, './props.json'),
    JSON.stringify(
      {
        races: [...races],
        elements: [...elements],
        sizes: [...sizes],
      },
      null,
      2
    )
  );
}

function longestName() {
  const names = monsters
    .map((monster) => monster.name)
    .sort((a, b) => b.length - a.length);

  for (const name of names.slice(0, 6)) {
    console.log(`${name.length}: ${name}`);
  }
}

const funcs = [transformYmlToJson, longestName, transformToObject, filterProps];
const prompt = funcs.map((i, index) => `${index} - ${i.name}`).join('\n');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`${prompt}\n> `, (choice) => {
  const index = Number(choice);
  console.log(`Running: ${funcs[index].name}`);
  funcs[index]();
  rl.close();
});
