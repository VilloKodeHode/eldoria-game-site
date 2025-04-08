import { InventoryItem, ShopItem } from "./items";

export interface PlayerInventory {
  currency: {
    gold: number;
    gems: number;
  };
  items: InventoryItem[];
  learnedRecipes?: string[];
}

export interface PlayerInventoryStore {
  playerInventory: PlayerInventory;

  addItem: (item: ShopItem) => void;
  removeItem: (sanityId: string, type: string, amount?: number) => void;
  buyItem: (item: ShopItem) => void;
  sellItem: (sanityId: string, price: number) => void;
  equipItem: (sanityId: string, type: string) => void;
  unequipItem: (sanityId: string, type: string) => void;
  useItem: (sanityId: string, type: string) => void;
  addGold: (amount: number) => void;
  removeGold: (amount: number) => void;
  addGems: (amount: number) => void;
  removeGems: (amount: number) => void;
  setInventory: (inv: PlayerInventory) => void;
}