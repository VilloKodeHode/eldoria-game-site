// interface for items. Tells us how to structure the items
export interface Item {
  id: string;
  name: string;
  src: string;
  itemType: string;
  subType: string;
  equippable: {
    //TODO se if this stucture can be changed (dont need conditional?)
    //TODO needs to be extended to have secondary damage, and defence for elemental damage (new objects?)
    slot?: string | null;
    damageType?: string | null;
    damage?: [number, number] | null;
    defense?: number | null;
  } | null;
  //TODO se if this stucture can be changed (dont need conditional?)
  consumable: {
    effectType?: string | null;
    affectedStat?: string | null;
    effectAmount?: number | null;
    duration?: string | null;
  } | null;
  knowRecipe: boolean;
  craftable: boolean;
  //TODO se if this stucture can be changed (dont need conditional? Should have conditionals inside?)
  recipe?: {
    ingredients: {
      herbs: number | null;
      berries: number | null;
      mushrooms: number | null;
      water: number | null;
      flowers: number | null;
      crystals: number | null;
    };
    materials: {
      iron: number | null;
      cloth: number | null;
      stone: number | null;
      leather: number | null;
      wood: number | null;
    };
  };
  buyPrice: number;
  sellPrice: number;
}

// for items that are in the inventory, we add an amount to Item:
export interface InventoryItem extends Item {
  amount: number;
}

// for items that are in the shop, we add an amount to Item:
//? This is the same as InventoryItem, but this makes the code easier to follow.
export interface ShopItem extends Item {
  amount: number;
}

// interface for the player inventory: Tells us how to structure the player inventory
export interface PlayerInventory {
  currency: {
    gold: number;
    gems: number;
  };
  items: {
    weapons: InventoryItem[];
    armour: InventoryItem[];
    potions: InventoryItem[];
    // foods in not yet been used
    foods: InventoryItem[];
    ingredients: InventoryItem[];
    materials: InventoryItem[];
  };
}

// interface for the player inventory: Tells us how to structure the player inventory store logic in zustand
export interface PlayerInventoryStore {
  // the initialData should be structured after the PlayerInventory interface:
  playerInventory: PlayerInventory;
  // the 6 next functions needs an id which can be any string, and a category which is a keyof PlayerInventory["items"]
  //? keyof PlayerInventory["items"] is the same as "weapons" | "armour" | "potions" | "foods" (the current subtypes in items.json)
  addItem: (id: string, category: keyof PlayerInventory["items"]) => void;
  removeItem: (id: string, category: keyof PlayerInventory["items"]) => void;
  sellItem: (id: string, category: keyof PlayerInventory["items"]) => void;
  buyItem: (id: string, category: keyof PlayerInventory["items"]) => void;
  //! unused
  // viewItem: (id: string, category: keyof PlayerInventory["items"]) => void;
  addRecipe: (id: string, category: keyof PlayerInventory["items"]) => void;
  // equipItem and unequipItem needs an id which can be any string, and a category which is "weapons" | "armour" (the current equippable types).
  //TODO equipItem and unequipItem has been defined in the store, but has yet to been used anywhere (need to implement this, but need a character sheet first).
  equipItem: (id: string, category: "weapons" | "armour") => void;
  unequipItem: (id: string, category: "weapons" | "armour") => void;
  // useItem needs an id which can be any string, and a category which is "potions" | "foods" (the current consumable types).
  useItem: (id: string, category: "potions" | "foods") => void;
  // add and remove gold and gems simply needs an amount (number) to work
  addGold: (amount: number) => void;
  removeGold: (amount: number) => void;
  addGems: (amount: number) => void;
  removeGems: (amount: number) => void;
  //! Unused. Seems like the inventory updates already by itself without this function.
  updateInventory: (
    shopItems: Partial<Record<keyof PlayerInventory["items"], Item[]>>
  ) => void;
}
