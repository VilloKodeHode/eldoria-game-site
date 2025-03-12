import { ShopStore } from "@/app/interfaces/shopTypes";
import { create } from "zustand";

// interface ShopState {
//   data: { [key: string]: { [item: string]: { amount: number } } };
// }

export const useShopStore = create<ShopStore>((set) => ({
  data: {},
  setData: (key, values) =>
    set((state) => {
      if (!state.data[key]) return state;

      const updatedData = { ...state.data[key] };
      Object.keys(values).forEach((item) => {
        if (updatedData[item]) {
          updatedData[item] = { ...updatedData[item], ...values[item] };
        }
      });
      return {
        data: {
          ...state.data,
          [key]: updatedData,
        },
      };
    }),

  getMaterialAmount: (key, item) => (state) =>
    state.data[key]?.[item]?.amount ?? 0,

  increaseMaterialAmount: (key, item, max = 10) =>
    set((state) => {
      if (!state.data[key]?.[item]) return state; // preventing errors
      if (state.data[key][item].amount >= max) return state; // implementing a max of 10 to each ingredient for adding when crafting

      return {
        data: {
          ...state.data,
          [key]: {
            ...state.data[key],
            [item]: {
              ...state.data[key][item],
              amount: state.data[key][item].amount + 1,
            },
          },
        },
      };
    }),

  decreaseMaterialAmount: (key, item) =>
    set((state) => {
      if (!state.data[key]?.[item]) return state; // preventing errors
      if (state.data[key][item].amount <= 0) return state; // implementing a max of 10 to each ingredient for adding when crafting

      return {
        data: {
          ...state.data,
          [key]: {
            ...state.data[key],
            [item]: {
              ...state.data[key][item],
              amount: state.data[key][item].amount - 1,
            },
          },
        },
      };
    }),

  resetMaterials: (key) =>
    set((state) => {
      if (!state.data[key]) return state;

      // ✅ Optimized Reset Logic
      const updatedData = Object.keys(state.data[key]).reduce((acc, item) => {
        acc[item] = { ...state.data[key][item], amount: 0 };
        return acc;
      }, {} as Record<string, any>);

      return {
        data: {
          ...state.data,
          [key]: updatedData,
        },
      };
    }),
}));
