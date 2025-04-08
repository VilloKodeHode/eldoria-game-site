import { ImageRef } from "./shared";

export interface Npc {
  _id: string;
  name: string;
  roleType: string;
  isHostile: boolean;
  isBoss: boolean;
  description: string;
  aetherAlignment?: string;
  raceTags?: string[];
  classTags?: string[];
  dialogueKey?: string;
  portrait?: ImageRef;

  inventory?: {
    _id: string;
    name: string;
    image?: ImageRef;
  }[];

  skillSet?: {
    _id: string;
    name: string;
    type: string;
  }[];

  faction?: {
    _id: string;
    name: string;
  }[];

  spawnLocations?: {
    _id: string;
    name: string;
  }[];

  lootTable?: {
    _id: string;
    name: string;
  }[];

  level?: number;
  health?: number;
  speed?: number;
  enemyType?: string;
  lootTier?: string;
  dangerRating?: string;
  canBeTamed?: boolean;
  combatType?: string;
  aggroType?: string;
  elementalType?: string;
  physicalType?: string;

  corruptedFormOf?: {
    _id: string;
    category: string;
  };
}
