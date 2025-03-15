export interface Item {
  id: string;
  name: string;
  src: string;
  itemType: string;
  subType: string;
  equippable: {
    slot: string | null; 
    damageType?: string | null;
    damage?: [number, number] | null;
    defense?: number | null;
  } | null; 
  consumable: {
    effectType?: string | null;
    affectedStat?: string | null;
    effectAmount?: number | null;
    duration?: string | null;
  } | null; 
  recipie?: {
    ingredients: {
      herbs: number | null,
      berries: number | null,
      mushrooms: number | null,
      water: number | null,
      flowers: number | null,
      crystals: number | null
    },
    materials: {
      iron: number | null,
      cloth: number | null,
      stone: number | null,
      leather: number | null,
      wood: number | null,
    },
  }
  buyPrice: number;
  sellPrice: number;
}

export interface InventoryItem extends Item {
  amount: number;
}

export interface StoreItem extends Item {
  amount: number;
}

export interface PlayerInventory {
  currency: {
    gold: number;
    gems: number;
  };
  items: {
    weapons: InventoryItem[];
    armour: InventoryItem[];
    potions: InventoryItem[];
    foods: InventoryItem[];
    ingredients: InventoryItem[];
    materials: InventoryItem[];
  };
}

export interface PlayerInventoryStore {
  playerInventory: PlayerInventory;
  addItem: (id: string, category: keyof PlayerInventory["items"]) => void;
  removeItem: (id: string, category: keyof PlayerInventory["items"]) => void;
  equipItem: (id: string, category: "weapons" | "armour") => void;
  unequipItem: (id: string, category: "weapons" | "armour") => void;
  useItem: (id: string, category: "potions" | "foods") => void;
  sellItem: (id: string, category: keyof PlayerInventory["items"]) => void;
  viewItem: (id: string, category: keyof PlayerInventory["items"]) => void;
  addGold: (amount: number) => void;
  removeGold: (amount: number) => void;
  addGems: (amount: number) => void;
  removeGems: (amount: number) => void;
  updateInventory: (shopItems: Partial<Record<keyof PlayerInventory["items"], Item[]>>) => void;
}