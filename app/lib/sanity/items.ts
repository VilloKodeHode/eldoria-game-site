import { defineQuery } from "next-sanity";

export const allItems = defineQuery(`*[_type == "item"] {
  _id,
  name,
  itemID,
  "imageUrl": src.asset->url,
  itemType,
  subType,
  
  // Equippable Items
  armour,
  weapon,
  jewelry,

  // Consumables
  potion,
  food,

  // Crafting
  recipe[] {
    ingredient->{
      _id,
      name,
      "imageUrl": src.asset->url
    },
    amount
  },

  // Prices
  buyPrice,
  sellPrice
}`);

export const allIngredients =
  defineQuery(`*[_type == "item" && "ingredient" in subCategory] {
  _id,
  name,
  description,
  itemID,
    "src": src.asset->url,
  buyPrice,
  sellPrice
}`);

export const allPotions =
  defineQuery(`*[_type == "item" && "potion" in subCategory] {
  _id,
  name,
  itemID,
  description,
  durability,
  buyPrice,
  sellPrice,
  "src": src.asset->url,
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
      category[0],
      subCategory[0],
      "itemID": itemID.current,
      "src": src.asset->url,
      buyPrice,
      sellPrice
    }
  }
}`);
