export interface PlayerInventory {
  currency: {
    gold: number;
    gems: number;
  };
  items: {
    weapons: EquipmentItem[];
    armour: EquipmentItem[];
    potions: ConsumableItem[];
    foods: ConsumableItem[];
    ingredients: CraftingItem[];
    materials: CraftingItem[];
  };
}

export interface InventoryItem {
  amount: number;
  id: string;
  itemName: string;
  buyPrice: number;
  sellPrice: number;
}

export interface CharacterSlots {
  head: string;
  body: string;
  hands: string;
  legs: string;
  feet: string;
  rightHand: string;
  leftHand: string;
  neck: string;
  ringOne: string;
  ringTwo: string;
}

type EquipmentSlot = keyof CharacterSlots;

export interface EquipmentItem extends InventoryItem {
  equipped: boolean;
  slot: EquipmentSlot;
}

export interface ConsumableItem extends InventoryItem {
  effectType: "health" | "mana" | "rejuvenate" | "stamina" | "buff";
  effectAmount: number;
}

export interface CraftingItem extends InventoryItem {
  type: string;
}

export const playerInventory: PlayerInventory = {
  currency: {
    gold: 0,
    gems: 50,
  },
  items: {
    weapons: [
      {
        id: "rustyDagger",
        itemName: "Rusty Dagger",
        amount: 1,
        equipped: true,
        slot: "rightHand",
        buyPrice: 100,
        sellPrice: 20,
      },
    ],
    armour: [
      {
        id: "peasentShirt",
        itemName: "Peasent Shirt",
        amount: 1,
        equipped: true,
        slot: "body",
        buyPrice: 20,
        sellPrice: 5,
      },
      {
        id: "peasentPants",
        itemName: "Peasent Pants",
        amount: 1,
        equipped: true,
        slot: "legs",
        buyPrice: 20,
        sellPrice: 5,
      },
      {
        id: "peasentBoots",
        itemName: "Peasent Boots",
        amount: 1,
        equipped: true,
        slot: "feet",
        buyPrice: 20,
        sellPrice: 5,
      },
    ],
    foods: [],
    potions: [],
    ingredients: [],
    materials: [],
  },
};
