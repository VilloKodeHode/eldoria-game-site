import { CharacterClass, CharacterRace } from "@/app/interfaces/characters";
import { Faction } from "@/app/interfaces/factions";
import { ShopItem } from "@/app/interfaces/items";
import { LoreEntry } from "@/app/interfaces/lore";
import { Npc } from "@/app/interfaces/npc";
import { Skill } from "@/app/interfaces/skills";
import { Trait } from "@/app/interfaces/traits";

import { create } from "zustand";

export interface SanityItem extends Record<string, unknown> {
  _id: string;
  name: string;
}

export interface SanityDataStore {
  // Game content
  ingredients: ShopItem[];
  materials: ShopItem[];
  spices: ShopItem[];
  potions: ShopItem[];
  foods: ShopItem[];
  weapons: ShopItem[];
  armours: ShopItem[];
  jewelry: ShopItem[];

  races: CharacterRace[];
  classes: CharacterClass[];
  lore: LoreEntry[];
  skills: Skill[];
  npcs: Npc[];
  traits: Trait[];
  factions: Faction[];

  // Setters
  setIngredients: (items: ShopItem[]) => void;
  setMaterials: (items: ShopItem[]) => void;
  setSpices: (items: ShopItem[]) => void;
  setPotions: (items: ShopItem[]) => void;
  setFoods: (items: ShopItem[]) => void;
  setWeapons: (items: ShopItem[]) => void;
  setArmours: (items: ShopItem[]) => void;
  setJewelry: (items: ShopItem[]) => void;

  setRaces: (races: CharacterRace[]) => void;
  setClasses: (classes: CharacterClass[]) => void;
  setLore: (entries: LoreEntry[]) => void;
  setSkills: (skills: Skill[]) => void;
  setNpcs: (npcs: Npc[]) => void;
  setTraits: (traits: Trait[]) => void;
  setFactions: (factions: Faction[]) => void;

  sanityLoaded: boolean;
  setSanityLoaded: (loaded: boolean) => void;
}

export const useSanityDataStore = create<SanityDataStore>((set) => ({
  ingredients: [],
  materials: [],
  spices: [],
  potions: [],
  foods: [],
  weapons: [],
  armours: [],
  jewelry: [],

  races: [],
  classes: [],
  lore: [],
  skills: [],
  npcs: [],
  traits: [],
  factions: [],
  sanityLoaded: false,

  setIngredients: (items) => set({ ingredients: items }),
  setMaterials: (items) => set({ materials: items }),
  setSpices: (items) => set({ spices: items }),
  setPotions: (items) => set({ potions: items }),
  setFoods: (items) => set({ foods: items }),
  setWeapons: (items) => set({ weapons: items }),
  setArmours: (items) => set({ armours: items }),
  setJewelry: (items) => set({ jewelry: items }),

  setRaces: (races) => set({ races }),
  setClasses: (classes) => set({ classes }),
  setLore: (lore) => set({ lore }),
  setSkills: (skills) => set({ skills }),
  setNpcs: (npcs) => set({ npcs }),
  setTraits: (traits) => set({ traits }),
  setFactions: (factions) => set({ factions }),
  setSanityLoaded: (loaded) => set({ sanityLoaded: loaded }),
}));
