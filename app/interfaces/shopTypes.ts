export interface StoreItem {
  name: string;
  amount: number;
  id: string;
  src: string;
}

export interface ShopStore {
  craftingItemData: StoreItem[];
  increaseCraftingItemAmount: (id: string) => void
  decreaseCraftingItemAmount: (id: string) => void
  resetCraftingItems: () => void;
}
