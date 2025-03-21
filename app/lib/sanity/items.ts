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
