import {
  ConsumableItem,
  playerInventory,
  PlayerInventory,
} from "@/app/data/inventory";
import { create } from "zustand";

export interface PlayerInventoryStore {
  playerInventory: PlayerInventory;
  viewInventory: () => void;
  addItem: (
    id: string,
    itemName: string,
    category: keyof PlayerInventory["items"],
    buyPrice?: number,
    sellPrice?: number
  ) => void;
  removeItem: (
    id: string,
    itemName: string,
    category: keyof PlayerInventory["items"]
  ) => void;
  addGold: (amount: number) => void;
  removeGold: (amount: number) => void;
  addGems: (amount: number) => void;
  removeGems: (amount: number) => void;
  equipItem: (
    id: string,
    itemName: string,
    category: "weapons" | "armour"
  ) => void;
  unequipItem: (
    id: string,
    itemName: string,
    category: "weapons" | "armour"
  ) => void;
  useItem: (
    id: string,
    itemName: string,
    category: "potions" | "foods"
  ) => void;
  sellItem: (
    id: string,
    itemName: string,
    category: keyof PlayerInventory["items"]
  ) => void;
  viewItem: (
    id: string,
    itemName: string,
    category: keyof PlayerInventory["items"]
  ) => void;
}

export const usePlayerInventory = create<PlayerInventoryStore>((set) => ({
  playerInventory: playerInventory,

  viewInventory: () => {
    set((state) => {
      console.log("Inventory:", state.playerInventory);
      return state;
    });
  },

  addItem: (id, itemName, category, buyPrice = 0, sellPrice = 0) =>
    set((state) => ({
      playerInventory: {
        ...state.playerInventory,
        items: {
          ...state.playerInventory.items,
          [category]: state.playerInventory.items[category].some(
            (item) => item.id === id
          )
            ? state.playerInventory.items[category].map((item) =>
                item.id === id ? { ...item, amount: item.amount + 1 } : item
              )
            : [
                ...state.playerInventory.items[category],
                { id, itemName, amount: 1, buyPrice, sellPrice },
              ],
        },
      },
    })),

  removeItem: (id, category) =>
    set((state) => ({
      playerInventory: {
        ...state.playerInventory,
        items: {
          ...state.playerInventory.items,
          [category]: state.playerInventory.items[category]
            .map((item) =>
              item.id === id
                ? { ...item, amount: Math.max(0, item.amount - 1) }
                : item
            )
            .filter((item) => item.amount > 0),
        },
      },
    })),

  addGold: (amount) =>
    set((state) => ({
      playerInventory: {
        ...state.playerInventory,
        currency: {
          ...state.playerInventory.currency,
          gold: state.playerInventory.currency.gold + amount,
        },
      },
    })),

  removeGold: (amount) =>
    set((state) => ({
      playerInventory: {
        ...state.playerInventory,
        currency: {
          ...state.playerInventory.currency,
          gold: Math.max(0, state.playerInventory.currency.gold - amount),
        },
      },
    })),

  addGems: (amount) =>
    set((state) => ({
      playerInventory: {
        ...state.playerInventory,
        currency: {
          ...state.playerInventory.currency,
          gems: state.playerInventory.currency.gems + amount,
        },
      },
    })),

  removeGems: (amount) =>
    set((state) => ({
      playerInventory: {
        ...state.playerInventory,
        currency: {
          ...state.playerInventory.currency,
          gems: Math.max(0, state.playerInventory.currency.gems - amount),
        },
      },
    })),

  equipItem: (id, category) =>
    set((state) => ({
      playerInventory: {
        ...state.playerInventory,
      },
      items: {
        ...state.playerInventory.items,
        [category]: state.playerInventory.items[category].map((item) =>
          item.id === id ? { ...item, equipped: true } : item
        ),
      },
    })),

  unequipItem: (id, category) =>
    set((state) => ({
      playerInventory: {
        ...state.playerInventory,
        items: {
          ...state.playerInventory.items,
          [category]: state.playerInventory.items[category].map((item) =>
            item.id === id ? { ...item, equipped: false } : item
          ),
        },
      },
    })),

  useItem: (id, category) =>
    set((state) => {
      const item = state.playerInventory.items[category].find(
        (i) => i.id === id
      );
      if (!item) return state;
      console.log(
        `Used ${item.itemName}! Effect Type: ${
          (item as ConsumableItem).effectType
        }, Amount: ${(item as ConsumableItem).effectAmount}`
      );

      return {
        playerInventory: {
          ...state.playerInventory,
          items: {
            ...state.playerInventory.items,
            [category]: state.playerInventory.items[category]
              .map((item) =>
                item.id === id
                  ? { ...item, amount: Math.max(0, item.amount - 1) }
                  : item
              )
              .filter((item) => item.amount > 0),
          },
        },
      };
    }),

  sellItem: (id, category) =>
    set((state) => {
      const item = state.playerInventory.items[category].find(
        (i) => i.id === id
      );
      if (!item) return state;

      return {
        playerInventory: {
          ...state.playerInventory,
          currency: {
            ...state.playerInventory.currency,
            gold:
              state.playerInventory.currency.gold +
              item.sellPrice * item.amount,
          },
          items: {
            ...state.playerInventory.items,
            [category]: state.playerInventory.items[category].filter(
              (i) => i.id !== id
            ),
          },
        },
      };
    }),

  viewItem: (id, category) =>
    set((state) => {
      const item = state.playerInventory.items[category].find(
        (i) => i.id === id
      );
      console.log("Item Details:", item);
      return state;
    }),
}));
