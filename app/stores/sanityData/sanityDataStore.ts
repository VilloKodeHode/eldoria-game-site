import { create } from "zustand";

export type SanityItem = {
    _id: string;
    name: string;
    //TODO fix the any type error below:
    [key: string]: string | number | undefined;
  };

  interface SanityDataStore {
    ingredients: SanityItem[];
    potions: SanityItem[];
    setIngredients: (data: SanityItem[]) => void;
    setPotions: (data: SanityItem[]) => void;
  }
  
  export const useSanityDataStore = create<SanityDataStore>((set) => ({
    ingredients: [],
    potions: [],
    setIngredients: (data) => set({ ingredients: data }),
    setPotions: (data) => set({ potions: data }),
  }));