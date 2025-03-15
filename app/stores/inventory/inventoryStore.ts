import {
  InventoryItem,
  Item,
  PlayerInventory,
  PlayerInventoryStore,
} from "@/app/data/inventory";
import { create } from "zustand";
import itemsData from "@/app/data/items.json";


const addItemToInventory = (id: string, amount: number = 1): InventoryItem => {
  const item = itemsData.find((item) => item.id === id) as Item;
  if (!item) throw new Error(`Item with ID ${id} not found`);
  return { ...item, amount };
};

export const usePlayerInventory = create<PlayerInventoryStore>((set) => ({
  
  playerInventory: {
    currency: { gold: 0, gems: 0 },
    items: {
      weapons: [addItemToInventory("rustyDagger")],
      armour: [
        addItemToInventory("peasantBoots"),
        addItemToInventory("peasantShirt"),
        addItemToInventory("peasantHat"),
      ],
      potions: [addItemToInventory("healingPotion"),
        addItemToInventory("speedPotion")
      ],
      foods: [],
      ingredients: [],
      materials: [],
    },
  },

  viewInventory: () => {
    set((state) => {
      console.log("Inventory:", state.playerInventory);
      return state;
    });
  },

  addItem: (id, category) =>
    set((state) => {
      const existingItem = state.playerInventory.items[category].find(
        (item) => item.id === id
      );

      return {
        playerInventory: {
          ...state.playerInventory,
          items: {
            ...state.playerInventory.items,
            [category]: existingItem
              ? state.playerInventory.items[category].map((item) =>
                  item.id === id ? { ...item, amount: item.amount + 1 } : item
                )
              : [...state.playerInventory.items[category], addItemToInventory(id, 1)],
          },
        },
      };
    }),

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
        items: {
          ...state.playerInventory.items,
          [category]: state.playerInventory.items[category].map((item) =>
            item.id === id ? { ...item, equipped: true } : item
          ),
        },
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
        `Used ${item.name}! Effect Type: ${
          (item).consumable?.effectType
        }, Amount: ${item.consumable?.effectAmount}`
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

    updateInventory: (shopItems) =>
      set((state) => {
        const updatedItems = { ...state.playerInventory.items };
  
        Object.entries(shopItems).forEach(([category, items]) => {
          items.forEach((newItem) => {
            const inventoryItem = newItem as InventoryItem
            const amountToadd = inventoryItem.amount ?? 1
            const itemToAdd = addItemToInventory(inventoryItem.id, amountToadd)
            const existingItem = updatedItems[category as keyof PlayerInventory["items"]].find(
              (i) => i.id === newItem.id
            );
  
            if (existingItem) {
              existingItem.amount += itemToAdd.amount;
            } else {
              updatedItems[category as keyof PlayerInventory["items"]].push(itemToAdd);
            }
          });
        });
  
        return {
          playerInventory: { ...state.playerInventory, items: updatedItems },
        };
      }),
      // buyback: (soldItem)=> {

      // },
}));
