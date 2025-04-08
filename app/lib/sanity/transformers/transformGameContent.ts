import { CharacterClass, CharacterRace } from "@/app/interfaces/characters";
import { ShopItem } from "@/app/interfaces/items";
import { ImageRef } from "@/app/interfaces/shared";

// Helpers
const toImageRef = (url: string | undefined): ImageRef => url ?? "";

// Generic item mapper for most item types
const mapItem = (item: any): ShopItem => ({
  _id: item._id,
  name: item.name,
  description: item.description,
  src: toImageRef(item.image),
  category: item.category || [],
  subCategory: item.subCategory || [],
  buyPrice: item.baseGoldValue || 0,
  sellPrice: Math.round((item.baseGoldValue || 0) * 0.5), // Example logic
  durability: item.durability,
  potion: item.potion,
  recipe: item.recipe,
});

// Specialized mappers
export const mapCharacterClass = (raw: any): CharacterClass => ({
  _id: raw._id,
  classCategory: raw.category,
  mainTagline: raw.mainTagline,
  starterAttributes: raw.starterAttributes,
  portrait: toImageRef(raw.portrait),
});

export const mapCharacterRace = (raw: any): CharacterRace => ({
  _id: raw._id,
  raceCategory: raw.category,
  mainTagline: raw.mainTagline,
  starterAttributes: raw.starterAttributes,
  portraitMale: toImageRef(raw.imageMale),
  portraitFemale: toImageRef(raw.imageFemale),
  portraitOther: toImageRef(raw.imageOther),
});

// Main mapping function
export const transformGameContent = (entry: any) => ({
  ingredients: (entry.craftingIngredients || []).map(mapItem),
  materials: (entry.craftingMaterials || []).map(mapItem),
  spices: (entry.craftingSpices || []).map(mapItem),
  potions: (entry.potions || []).map(mapItem),
  foods: (entry.foods || []).map(mapItem),
  weapons: (entry.weapons || []).map(mapItem),
  armours: (entry.armours || []).map(mapItem),
  jewelry: (entry.jewelry || []).map(mapItem),
  classes: (entry.allClasses || []).map(mapCharacterClass),
  races: (entry.allRaces || []).map(mapCharacterRace),
});
