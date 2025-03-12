// Function that can be called to get the potion image url
export const basePotionImageUrl = (potion) => {
    return `/images/potionShop/potions/${potion}-potion.webp`;
  };
  
  // Function that can be called to get the potion object
  export function getPotion(potion) {
    return potions[potion];
  }
  
  // Function that can be called to check the ingredients for a potion:
  export function checkPotionIngredients(potion) {
    return Object.entries(potions[potion])
      .filter(([key]) => key !== "image" && key !== "name")
      .map(([, value]) => value);
  }
  
  // All potions, created as objects (for easier reference)
  export const potions = {
    healingPotion: {
      herbs: 2,
      berries: 1,
      water: 1,
      mushrooms: 0,
      flowers: 0,
      crystals: 1,
      image: basePotionImageUrl("healing"), // returns: ./public/images/potions/healing-potion.webp
      name: "Healing Potion",
    },
    strengthPotion: {
      herbs: 0,
      berries: 1,
      water: 1,
      mushrooms: 2,
      flowers: 0,
      crystals: 2,
      image: basePotionImageUrl("strength"),
      name: "Strength Potion",
    },
    manaPotion: {
      herbs: 0,
      berries: 0,
      water: 3,
      mushrooms: 0,
      flowers: 1,
      crystals: 2,
      name: "Mana Potion",
      image: basePotionImageUrl("mana"),
    },
    speedPotion: {
      herbs: 2,
      berries: 0,
      water: 2,
      mushrooms: 1,
      flowers: 1,
      crystals: 0,
      name: "Speed Potion",
      image: basePotionImageUrl("speed"),
    },
    stealthPotion: {
      herbs: 0,
      berries: 0,
      water: 1,
      mushrooms: 0,
      flowers: 2,
      crystals: 2,
      name: "Stealth Potion",
      image: basePotionImageUrl("stealth"),
    },
    antidote: {
      herbs: 1,
      berries: 3,
      water: 2,
      mushrooms: 0,
      flowers: 0,
      crystals: 0,
      name: "Antidote",
      image: basePotionImageUrl("antidote"),
    },
    lovePotion: {
      herbs: 0,
      berries: 0,
      water: 2,
      mushrooms: 0,
      flowers: 2,
      crystals: 2,
      name: "Love Potion",
      image: basePotionImageUrl("love"),
    },
    nightVisionPotion: {
      herbs: 1,
      berries: 0,
      water: 1,
      mushrooms: 0,
      flowers: 2,
      crystals: 1,
      name: "Night Vision Potion",
      image: basePotionImageUrl("nightvision"),
    },
    fireResistancePotion: {
      herbs: 1,
      berries: 1,
      water: 3,
      mushrooms: 0,
      flowers: 1,
      crystals: 2,
      name: "Fire Resistance Potion",
      image: basePotionImageUrl("fire-resistance"),
    },
    frostResistancePotion: {
      herbs: 1,
      berries: 2,
      water: 1,
      mushrooms: 1,
      flowers: 1,
      crystals: 2,
      name: "Frost Resistance Potion",
      image: basePotionImageUrl("frost-resistance"),
    },
    lightningResistancePotion: {
      herbs: 1,
      berries: 1,
      water: 1,
      mushrooms: 3,
      flowers: 0,
      crystals: 2,
      name: "Lightning Resistance Potion",
      image: basePotionImageUrl("lightning-resistance"),
    },
    energyPotion: {
      herbs: 4,
      berries: 2,
      water: 1,
      mushrooms: 1,
      flowers: 0,
      crystals: 0,
      name: "Energy Potion",
      image: basePotionImageUrl("energy"),
    },
    focusPotion: {
      herbs: 1,
      berries: 0,
      water: 1,
      mushrooms: 0,
      flowers: 4,
      crystals: 2,
      name: "Focus Potion",
      image: basePotionImageUrl("focus"),
    },
  };
  