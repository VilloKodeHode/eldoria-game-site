import { ShopStore, StoreItem } from "@/app/interfaces/shopTypes";
import { useMemo } from "react";
import { create } from "zustand";

// interface ShopState {
//   data: { [key: string]: { [item: string]: { amount: number } } };
// }

export const createCraftingItemsStore = (initialData: StoreItem[]) =>
  create<ShopStore>((set) => ({
    craftingItemData: initialData,

    getCraftingItemAmount: (id) =>
    (state: {data: StoreItem[]})=>
      state.data.find((item)=> item.id === id)?.amount ?? 0,

    increaseCraftingItemAmount: (id) =>
      set((state) => ({
        craftingItemData: state.craftingItemData.map((item) =>
          item.id === id
            ? { ...item, amount: Math.min(item.amount + 1, 10) }
            : item
        ),
      })),

    decreaseCraftingItemAmount: (id) =>
      set((state) => ({
        craftingItemData: state.craftingItemData.map((item) =>
          item.id === id
            ? { ...item, amount: Math.max(item.amount - 1, 0) }
            : item
        ),
      })),

    resetCraftingItems: () =>
      set((state) => ({
        craftingItemData: state.craftingItemData.map((item) => ({ ...item, amount: 0 })),
      })),
  }));

export const useShopStore = (items: StoreItem[]) => useMemo(() => createCraftingItemsStore(items), [items]);