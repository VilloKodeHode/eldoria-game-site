import {
  InventoryItem,
  Item,
  PlayerInventory,
  PlayerInventoryStore,
} from "@/app/interfaces/inventory";
import { create } from "zustand";
// itemsData is an array of items
import itemsData from "@/app/data/items.json";

// function to add an item to the inventory
export const addItemToInventory = (
  id: string,
  amount: number = 1
): InventoryItem => {
  // find the item in the data
  const item = itemsData.find((item) => item.id === id) as Item;
  // if the item is not found, throw an error
  if (!item) throw new Error(`Item with ID ${id} not found`);
  // return the item an add a key (amount) to it
  return { ...item, amount };
};

// create the store:
//? create is a zustand function
//? set is a function to update the store
export const usePlayerInventory = create<PlayerInventoryStore>((set) => ({
  // set the initial state
  // in items we add some items so the player starts with some items
  //? You can try adding more items to see if they work (you need the item id, which can be found in items.json)
  playerInventory: {
    currency: { gold: 0, gems: 0 },
    items: {
      weapons: [addItemToInventory("rustyDagger")],
      armour: [
        addItemToInventory("peasantBoots"),
        addItemToInventory("peasantShirt"),
        addItemToInventory("peasantHat"),
      ],
      potions: [
        addItemToInventory("healingPotion"),
        addItemToInventory("speedPotion"),
        // addItemToInventory("manaPotion"), //! uncomment this line to add the mana potion
      ],
      foods: [],
      ingredients: [],
      materials: [],
    },
  },

  //!unused
  // viewInventory: () => {
  //   set((state) => {
  //     console.log("Inventory:", state.playerInventory);
  //     return state;
  //   });
  // },

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
              : [
                  ...state.playerInventory.items[category],
                  addItemToInventory(id, 1),
                ],
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
        `Used ${item.name}! Effect Type: ${item.consumable?.effectType}, Amount: ${item.consumable?.effectAmount}`
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
      const existingItem = state.playerInventory.items[category].find(
        (item) => item.id === id
      );
      if (!existingItem) return state;

      return {
        playerInventory: {
          ...state.playerInventory,
          currency: {
            ...state.playerInventory.currency,
            gold: state.playerInventory.currency.gold + existingItem.sellPrice,
          },
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

  buyItem: (id, category) =>
    set((state) => {
      const itemToBuy = addItemToInventory(id, 1);
      const itemPrice = itemToBuy.buyPrice;
      const currentGold = state.playerInventory.currency.gold;

      if (currentGold < itemPrice) {
        console.log("You don't have enough gold to buy this item.");
        return state;
      }

      const existingItem = state.playerInventory.items[category].find(
        (item) => item.id === id
      );

      return {
        playerInventory: {
          ...state.playerInventory,
          currency: {
            ...state.playerInventory.currency,
            gold: currentGold - itemPrice,
          },
          items: {
            ...state.playerInventory.items,
            [category]: existingItem
              ? state.playerInventory.items[category].map((item) =>
                  item.id === id ? { ...item, amount: item.amount + 1 } : item
                )
              : [...state.playerInventory.items[category], itemToBuy],
          },
        },
      };
    }),

  addRecipe: (id, category) =>
    set((state) => {
      const item = state.playerInventory.items[category].find(
        (item) => item.id === id
      );

      // If the recipe is already known, return the current state
      if (item?.knowRecipe) return state;
      return {
        playerInventory: {
          ...state.playerInventory,
          items: {
            ...state.playerInventory.items,
            [category]: state.playerInventory.items[category].map((item) =>
              item.id === id ? { ...item, knowRecipe: true } : item
            ),
          },
        },
      };
    }),

  //!unused
  // viewItem: (id, category) =>
  //   set((state) => {
  //     const item = state.playerInventory.items[category].find(
  //       (i) => i.id === id
  //     );
  //     console.log("Item Details:", item);
  //     return state;
  //   }),


  //! not needed, but keep it still to see if it can be used for something else:
  updateInventory: (shopItems) =>
    set((state) => {
      const updatedItems = { ...state.playerInventory.items };

      Object.entries(shopItems).forEach(([category, items]) => {
        items.forEach((newItem) => {
          const inventoryItem = newItem as InventoryItem;
          const amountToadd = inventoryItem.amount ?? 1;
          const itemToAdd = addItemToInventory(inventoryItem.id, amountToadd);
          const existingItem = updatedItems[
            category as keyof PlayerInventory["items"]
          ].find((i) => i.id === newItem.id);

          if (existingItem) {
            existingItem.amount += itemToAdd.amount;
          } else {
            updatedItems[category as keyof PlayerInventory["items"]].push(
              itemToAdd
            );
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
