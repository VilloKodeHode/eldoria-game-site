export interface MaterialType {
  name: string;
  amount: number;
  id: string;
  src: string;
}

export interface ShopStore {
  data: {
    ingredients?: Record<string, MaterialType>; // Dictionary of materials
  };
  setData: (key: string, values: Record<string, MaterialType>) => void;
  increaseMaterialAmount: (key: string, item: string, max?: number) => void;
  decreaseMaterialAmount: (key: string, item: string) => void;
  resetMaterials: (key: string) => void;
}
