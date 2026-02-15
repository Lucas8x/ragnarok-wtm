export type Monster = {
  id: number;
  aegisName: string;
  name: string;
  level?: number;
  hp?: number;
  size?: Sizes;
  race?: Races;
  element?: Elements;
};

export type ComparasionIndicator = '=' | '>' | '<' | boolean;

export type DailyItemStorage = {
  attempts: number[];
  answerID?: number;
  completedOn?: string;
};

export type WordleItem = {
  text: string;
  submited: boolean;
};

type Sizes = 'Small' | 'Medium' | 'Large';

type Elements =
  | 'Fire'
  | 'Water'
  | 'Wind'
  | 'Dark'
  | 'Earth'
  | 'Undead'
  | 'Poison'
  | 'Neutral'
  | 'Ghost'
  | 'Holy';

type Races =
  | 'Insect'
  | 'Plant'
  | 'Brute'
  | 'Fish'
  | 'Undead'
  | 'Demihuman'
  | 'Demon'
  | 'Formless'
  | 'Angel'
  | 'Dragon'
  | 'Player_Human'
  | 'Player_Doram';
