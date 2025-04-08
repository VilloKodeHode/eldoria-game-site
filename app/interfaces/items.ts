import { PotionEffect, RecipeIngredient, ImageRef } from "./shared";

export interface ShopItem {
  _id: string;
  name: string;
  description?: string;
  src: ImageRef;
  category: string[];
  subCategory: string[];
  buyPrice: number;
  sellPrice: number;
  durability?: number;
  potion?: PotionEffect;
  recipe?: RecipeIngredient[];
}

export interface InventoryItem {
  sanityId: string;
  amount: number;
  type: string;

  name?: string;
  src?: ImageRef;
  sellPrice?: number;

  knowRecipe?: boolean;
  recipe?: RecipeIngredient[];
  potion?: PotionEffect;
}

export interface CraftingItem extends ShopItem {
  amount: number;
}