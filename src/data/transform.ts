import path from 'node:path';

async function transformYmlToJson() {
  const yml = Bun.YAML.parse(
    await Bun.file(path.join(import.meta.dir, 'mob_db.yml')).text(),
  );

  const data = yml.Body.map(
    ({ Id, AegisName, Name, Level, Hp, Size, Element, Race }) => ({
      id: Id,
      aegisName: AegisName,
      name: Name,
      level: Level,
      hp: Hp,
      size: Size,
      race: Race,
      element: Element,
    }),
  );

  await Bun.write(
    path.join(import.meta.dir, 'monsters.json'),
    JSON.stringify(data, null, 0),
  );
}

async function transformToDict() {
  const data = {};

  const monsters = await Bun.file(
    path.join(import.meta.dir, 'monsters.json'),
  ).json();

  monsters.forEach((monster) => {
    const { id, ...rest } = monster;
    data[monster.id] = rest;
  });

  await Bun.write(
    path.join(import.meta.dir, 'monsters2.json'),
    JSON.stringify(data, null),
  );
}

async function filterProps() {
  const races = new Set<string>();
  const elements = new Set<string>();
  const sizes = new Set<string>();

  const monsters = await Bun.file(
    path.join(import.meta.dir, 'monsters.json'),
  ).json();

  monsters.forEach((monster) => {
    races.add(monster.race);
    elements.add(monster.element);
    sizes.add(monster.size);
  });

  await Bun.write(
    path.join(import.meta.dir, './props.json'),
    JSON.stringify(
      {
        races: [...races],
        elements: [...elements],
        sizes: [...sizes],
      },
      null,
      2,
    ),
  );
}

transformYmlToJson();
transformToDict();
filterProps();
