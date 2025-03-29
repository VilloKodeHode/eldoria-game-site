// Minimal shape stored in MongoDB

import { InventoryItem, ShopItem } from "./items";

// The player's entire inventory data from MongoDB
export interface PlayerInventory {
  currency: {
    gold: number;
    gems: number;
  };
  items: InventoryItem[]; // Flattened structure for all items
  learnedRecipes?: string[]; // will give a list of sanityIds
}

// Zustand store structure
export interface PlayerInventoryStore {
  playerInventory: PlayerInventory;

  // Sync actions
  addItem: (item: ShopItem) => void;
  removeItem: (sanityId: string, type: string, amount?: number) => void;
  buyItem: (sanityId: string, price: number, type: string) => void;
  sellItem: (sanityId: string, price: number) => void;

  // Optional: extend for equipping later
  equipItem: (sanityId: string, type: string) => void;
  unequipItem: (sanityId: string, type: string) => void;

  useItem: (sanityId: string, type: string) => void;

  addGold: (amount: number) => void;
  removeGold: (amount: number) => void;
  addGems: (amount: number) => void;
  removeGems: (amount: number) => void;

  // To sync after refetching inventory
  setInventory: (inv: PlayerInventory) => void;
}
