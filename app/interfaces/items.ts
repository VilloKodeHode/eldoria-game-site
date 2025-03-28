export interface InventoryItem {
  sanityId: string; // References _id from Sanity
  amount: number;
  type: string; // e.g. "potion", "weapon", etc.
  knowRecipe?: boolean;
  recipe?: {
    ingredient: {
      _id: string;
      name: string;
      src?: string;
    };
    amount: number;
  }[];
  name?: string;
  src?: string;
  sellPrice?: number;
  potion?: {
    duration: string;
    effectCategory: string[];
    affectedStat: string[];
    effectAmount: number;
  };
}

// Full item used for shop displays
export interface ShopItem {
  _id: string;
  name: string;
  description?: string;
  src: string;
  category: string[];
  subCategory: string[];
  buyPrice: number;
  sellPrice: number;
  durability?: number;
  potion?: {
    duration: string;
    effectCategory: string[];
    affectedStat: string[];
    effectAmount: number;
  };
  recipe?: {
    amount: number;
    ingredient: {
      _id: string;
      name: string;
      src?: string;
    };
  }[];
}

export interface CraftingItem extends ShopItem {
  amount: number;
}
