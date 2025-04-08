export interface StoreItem {
  id: string;
  name: string;
  src: string;
  amount: number;
}

export interface ShopStore {
  craftingItemData: StoreItem[];
  increaseCraftingItemAmount: (id: string) => void;
  decreaseCraftingItemAmount: (id: string) => void;
  resetCraftingItems: () => void;
}