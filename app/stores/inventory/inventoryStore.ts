import { create } from "zustand";
import { PlayerInventoryStore } from "@/app/interfaces/inventory";
import { InventoryItem } from "@/app/interfaces/items";

export const usePlayerInventory = create<PlayerInventoryStore>((set) => ({
  playerInventory: {
    currency: { gold: 0, gems: 0 },
    items: [],
  },

  setInventory: (inventory) =>
    set(() => ({
      playerInventory: {
        currency: {
          gold: inventory?.currency?.gold ?? 0,
          gems: inventory?.currency?.gems ?? 0,
        },
        items: Array.isArray(inventory?.items) ? inventory.items : [],
      },
    })),

  addItem: (item) =>
    set((state) => {
      const existingItem = state.playerInventory.items.find(
        (i) => i.sanityId === item._id
      );

      const newItem: InventoryItem = {
        sanityId: item._id,
        amount: 1,
        type: item.subCategory?.[0] || "misc",
        name: item.name,
        src: item.src,
        sellPrice: item.sellPrice,
        recipe: item.recipe,
        potion: item.potion,
      };

      const updatedItems = existingItem
        ? state.playerInventory.items.map((i) =>
            i.sanityId === item._id ? { ...i, amount: i.amount + 1 } : i
          )
        : [...state.playerInventory.items, newItem];

      return {
        playerInventory: {
          ...state.playerInventory,
          items: updatedItems,
        },
      };
    }),

  removeItem: (sanityId, _type, amount = 1) =>
    set((state) => {
      const updatedItems = state.playerInventory.items
        .map((item) =>
          item.sanityId === sanityId
            ? { ...item, amount: Math.max(0, item.amount - amount) }
            : item
        )
        .filter((item) => item.amount > 0);

      return {
        playerInventory: {
          ...state.playerInventory,
          items: updatedItems,
        },
      };
    }),

  sellItem: (sanityId, price) =>
    set((state) => {
      const updatedItems = state.playerInventory.items
        .map((item) =>
          item.sanityId === sanityId
            ? { ...item, amount: Math.max(0, item.amount - 1) }
            : item
        )
        .filter((item) => item.amount > 0);

      return {
        playerInventory: {
          ...state.playerInventory,
          currency: {
            ...state.playerInventory.currency,
            gold: state.playerInventory.currency.gold + Number(price),
          },
          items: updatedItems,
        },
      };
    }),

  buyItem: (sanityId, price, type) =>
    set((state) => {
      if (state.playerInventory.currency.gold < price) {
        return state;
      }

      const existingItem = state.playerInventory.items.find(
        (item) => item.sanityId === sanityId
      );

      const updatedItems = existingItem
        ? state.playerInventory.items.map((item) =>
            item.sanityId === sanityId
              ? { ...item, amount: item.amount + 1 }
              : item
          )
        : [...state.playerInventory.items, { sanityId, type, amount: 1 }];

      return {
        playerInventory: {
          ...state.playerInventory,
          currency: {
            ...state.playerInventory.currency,
            gold: state.playerInventory.currency.gold - price,
          },
          items: updatedItems,
        },
      };
    }),

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

  equipItem: () => {},
  unequipItem: () => {},
  useItem: () => {},
}));
