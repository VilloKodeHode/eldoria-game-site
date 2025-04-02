import { defineQuery } from "next-sanity";

export const allItems = defineQuery(`*[_type == "item"] {
  _id,
  name,
  description,
  durability,
  "itemID": itemID.current,
  "src": src.asset->url,

  // Categories
  category,
  subCategory,

  // Equippable
  armour,
  weapon,
  jewelry,

  // Consumables
  potion,
  food,

  // Crafting
  recipe[] {
    amount,
    ingredient->{
      _id,
      name,
      description,
      durability,
      "itemID": itemID.current,
      "src": src.asset->url,
      category,
      subCategory,
      buyPrice,
      sellPrice
    }
  },

  // Prices
  buyPrice,
  sellPrice
}`);

export const allIngredients = defineQuery(`*[_type == "item" && "ingredient" in subCategory] {
  _id,
  name,
  description,
  "itemID": itemID.current,
  "src": src.asset->url,
  subCategory,
  buyPrice,
  sellPrice
}`);

export const allPotions = defineQuery(`*[_type == "item" && "potion" in subCategory] {
  _id,
  name,
  description,
  durability,
  "itemID": itemID.current,
  "src": src.asset->url,
  subCategory,
  category,
  buyPrice,
  sellPrice,

  potion {
    duration,
    effectCategory,
    affectedStat,
    effectAmount
  },

  recipe[] {
    amount,
    ingredient->{
      _id,
      _type,
      name,
      description,
      durability,
      "itemID": itemID.current,
      "src": src.asset->url,
      category,
      subCategory,
      buyPrice,
      sellPrice
    }
  }
}`);
