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

interface SanityDataStore {
  ingredients: ShopItem[];
  potions: ShopItem[];
  races: CharacterRace[];
  classes: CharacterClass[];
  lore: LoreEntry[];
  skills: Skill[];
  npcs: Npc[];
  traits: Trait[];
  factions: Faction[];

  setIngredients: (ingredients: ShopItem[]) => void;
  setPotions: (potions: ShopItem[]) => void;
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
  potions: [],
  races: [],
  classes: [],
  lore: [],
  skills: [],
  npcs: [],
  traits: [],
  factions: [],
  sanityLoaded: false,

  setIngredients: (items) => set({ ingredients: items }),
  setPotions: (items) => set({ potions: items }),
  setRaces: (races) => set({ races }),
  setClasses: (classes) => set({ classes }),
  setLore: (lore) => set({ lore }),
  setSkills: (skills) => set({ skills }),
  setNpcs: (npcs) => set({ npcs }),
  setTraits: (traits) => set({ traits }),
  setFactions: (factions) => set({ factions }),
  setSanityLoaded: (loaded) => set({ sanityLoaded: loaded }),
}));