import { CharacterClass, CharacterRace } from "@/app/interfaces/characters";
import { ShopItem } from "@/app/interfaces/items";
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

  setIngredients: (ingredients: ShopItem[]) => void;
  setPotions: (potions: ShopItem[]) => void;
  setRaces: (races: CharacterRace[]) => void;
  setClasses: (classes: CharacterClass[]) => void;

  sanityLoaded: boolean;
  setSanityLoaded: (loaded: boolean) => void;
}

export const useSanityDataStore = create<SanityDataStore>((set) => ({
  ingredients: [],
  potions: [],
  races: [],
  classes: [],
  sanityLoaded: false,

  setIngredients: (items) => set({ ingredients: items }),
  setPotions: (items) => set({ potions: items }),
  setRaces: (races) => set({ races }),
  setClasses: (classes) => set({ classes }),
  setSanityLoaded: (loaded) => set({ sanityLoaded: loaded }),
}));
