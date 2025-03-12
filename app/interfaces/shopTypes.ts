export interface StoreItem {
  name: string;
  amount: number;
  id: string;
  src: string;
}

export interface ShopStore {
  data: StoreItem[];
  increaseItemAmount: (id: string) => void
  decreaseItemAmount: (id: string) => void
  resetItems: () => void;
}
