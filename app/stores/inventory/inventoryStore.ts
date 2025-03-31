import { create } from "zustand";
import { PlayerInventoryStore } from "@/app/interfaces/inventory";
import { InventoryItem, ShopItem } from "@/app/interfaces/items";

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
        learnedRecipes: Array.isArray(inventory?.learnedRecipes)
          ? inventory.learnedRecipes
          : [],
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
        knowRecipe: !!item.recipe,
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

  sellItem: (sanityId) =>
    set((state) => {
      const filteredItems = state.playerInventory.items.filter(
        (item) => item.sanityId !== sanityId
      );

      return {
        playerInventory: {
          ...state.playerInventory,
          items: filteredItems,
        },
      };
    }),

    buyItem: (item) =>
      set((state) => {
        const price = item.buyPrice ?? 0;
        const type = item.subCategory?.[0] ?? "misc";
    
        if (state.playerInventory.currency.gold < price) {
          console.warn(
            `⚠ Not enough gold to buy item: need ${price}, have ${state.playerInventory.currency.gold}`
          );
          return state;
        }
    
        const existingItem = state.playerInventory.items.find(
          (i) => i.sanityId === item._id
        );
    
        const newItem: InventoryItem = {
          sanityId: item._id,
          amount: 1,
          type,
          name: item.name,
          src: item.src,
          sellPrice: item.sellPrice,
          recipe: item.recipe,
          knowRecipe: !!item.recipe,
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
    set((state) => {
      const currentGold = state.playerInventory.currency.gold;
      if (currentGold < amount) {
        console.warn(`⚠ Tried to remove ${amount} gold but only had ${currentGold}`);
        return state;
      }

      return {
        playerInventory: {
          ...state.playerInventory,
          currency: {
            ...state.playerInventory.currency,
            gold: currentGold - amount,
          },
        },
      };
    }),

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
    set((state) => {
      const currentGems = state.playerInventory.currency.gems;
      if (currentGems < amount) {
        console.warn(`⚠ Tried to remove ${amount} gems but only had ${currentGems}`);
        return state;
      }

      return {
        playerInventory: {
          ...state.playerInventory,
          currency: {
            ...state.playerInventory.currency,
            gems: currentGems - amount,
          },
        },
      };
    }),

  equipItem: () => {},
  unequipItem: () => {},
  useItem: () => {},
}));