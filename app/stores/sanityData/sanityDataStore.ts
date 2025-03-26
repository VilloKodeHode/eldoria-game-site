import { create } from "zustand";

export type SanityItem = {
    _id: string;
    name: string;
    //TODO fix the any type error below:
    [key: string]: any;
  };

interface SanityDataStore {
    potions: SanityItem[];
    ingredients: SanityItem[];
    npcs: SanityItem[];
    races: SanityItem[];
    classes: SanityItem[];
    setPotions: (data: SanityItem[]) => void;
    setIngredients: (data: SanityItem[]) => void;
    setNpcs: (data: SanityItem[]) => void;
    setRaces: (data: SanityItem[]) => void;
    setClasses: (data: SanityItem[]) => void;
  }

  export const useSanityDataStore = create<SanityDataStore>((set) => ({
    potions: [],
    ingredients: [],
    npcs: [],
    races: [],
    classes: [],
    setPotions: (data) => set({ potions: data }),
    setIngredients: (data) => set({ ingredients: data }),
    setNpcs: (data) => set({ npcs: data }),
    setRaces: (data) => set({ races: data }),
    setClasses: (data) => set({ classes: data }),
  }));