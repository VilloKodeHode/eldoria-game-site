// ------------------ Basic Items ------------------
export const ingredientFields = `
  craftingIngredients[]->{
    _id, name, description, category, subCategory, "image": src.asset->url, baseGoldValue, baseGemValue,
  },
`;

export const materialFields = `
  craftingMaterials[]->{
    _id, name, description, category, subCategory, "image": src.asset->url, baseGoldValue, baseGemValue,
  },
`;

export const spiceFields = `
  craftingSpices[]->{
    _id, name, description, category, subCategory, "image": src.asset->url, baseGoldValue, baseGemValue,
  },
`;

// ------------------ Consumables ------------------
export const potionFields = `
  potions[]->{
    _id, name, description, category, subCategory, potion, inventoryRole, obtainMethods,
    "image": src.asset->url, baseGoldValue, baseGemValue,
  },
`;

export const foodFields = `
  foods[]->{
    _id, name, description, category, subCategory, food, inventoryRole, obtainMethods,
    "image": src.asset->url, baseGoldValue, baseGemValue,
  },
`;

// ------------------ Equipment ------------------
export const weaponFields = `
  weapons[]->{
    _id, name, description, category, subCategory, weapon, inventoryRole, obtainMethods,
    "image": src.asset->url, baseGoldValue, baseGemValue, durability,
  },
`;

export const armourFields = `
  armours[]->{
    _id, name, description, category, subCategory, armour, inventoryRole, obtainMethods,
    "image": src.asset->url, baseGoldValue, baseGemValue, durability,
  },
`;

export const jewelryFields = `
  jewelry[]->{
    _id, name, description, category, subCategory, jewelry, inventoryRole, obtainMethods,
    "image": src.asset->url, baseGoldValue, baseGemValue,
  },
`;