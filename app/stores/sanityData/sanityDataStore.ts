import { ShopItem } from "@/app/interfaces/items";
import { create } from "zustand";

export interface SanityItem extends Record<string, unknown> {
  _id: string;
  name: string;
}

interface SanityDataStore {
  ingredients: ShopItem[];
  potions: ShopItem[];
  setIngredients: (ingredients: ShopItem[]) => void;
  setPotions: (potions: ShopItem[]) => void;
  sanityLoaded: boolean;
  setSanityLoaded: (loaded: boolean) => void;
}

export const useSanityDataStore = create<SanityDataStore>((set) => ({
  ingredients: [],
  potions: [],
  sanityLoaded: false,
  setIngredients: (items) => set({ ingredients: items }),
  setPotions: (items) => set({ potions: items }),
  setSanityLoaded: (loaded) => set({ sanityLoaded: loaded }),
}));
