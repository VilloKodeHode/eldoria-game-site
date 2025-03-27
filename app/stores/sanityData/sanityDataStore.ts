import { create } from "zustand";

export interface SanityItem extends Record<string, unknown> {
  _id: string;
  name: string;
}

interface SanityDataStore {
  //eslint-disable-next-line
  ingredients: any;
  //eslint-disable-next-line
  potions: any;
  // Add more categories here as needed
  //eslint-disable-next-line
  setIngredients: (items: any) => void;
  //eslint-disable-next-line
  setPotions: (items: any) => void;
}

export const useSanityDataStore = create<SanityDataStore>((set) => ({
  ingredients: [],
  potions: [],
  setIngredients: (items) => set({ ingredients: items }),
  setPotions: (items) => set({ potions: items }),
}));
