import { ShopStore, StoreItem } from "@/app/interfaces/shopTypes";
import { useMemo } from "react";
import { create } from "zustand";

// interface ShopState {
//   data: { [key: string]: { [item: string]: { amount: number } } };
// }

export const createShopStore = (initialData: StoreItem[]) =>
  create<ShopStore>((set) => ({
    data: initialData,

    getItemAmount: (id) =>
    (state: {data: StoreItem[]})=>
      state.data.find((item)=> item.id === id)?.amount ?? 0,

    increaseItemAmount: (id) =>
      set((state) => ({
        data: state.data.map((item) =>
          item.id === id
            ? { ...item, amount: Math.min(item.amount + 1, 10) }
            : item
        ),
      })),

    decreaseItemAmount: (id) =>
      set((state) => ({
        data: state.data.map((item) =>
          item.id === id
            ? { ...item, amount: Math.max(item.amount - 1, 0) }
            : item
        ),
      })),

    resetItems: () =>
      set((state) => ({
        data: state.data.map((item) => ({ ...item, amount: 0 })),
      })),
  }));

export const useShopStore = (items: StoreItem[]) => useMemo(() => createShopStore(items), [items]);