// Function that can be called to get the potion image url
export const basePotionImageUrl = (potion) => {
    return `/images/potionShop/potions/${potion}-potion.webp`;
  };
  
  // Function that can be called to get the potion object
  export function getPotion(potionToGet) {
    return potions.filter((potion) => potion.id === potionToGet);
  }
  
  // Function that can be called to check the ingredients for a potion:
  export function checkPotionIngredients(potionToCheck) {
    // return potions.filter((potion)=> )
  }
  
  // All potions, created as objects (for easier reference)
  export const potions = [
    {
      name: "Healing Potion",
      id: "healingPotion",
      herbs: 2,
      berries: 1,
      water: 1,
      mushrooms: 0,
      flowers: 0,
      crystals: 1,
      image: basePotionImageUrl("healing"), // returns: /images/potions/healing-potion.webp
    },
    {
      name: "Strength Potion",
      id: "strengthPotion",
      herbs: 0,
      berries: 1,
      water: 1,
      mushrooms: 2,
      flowers: 0,
      crystals: 2,
      image: basePotionImageUrl("strength"),
    },
    {
      name: "Mana Potion",
      id: "manaPotion",
      herbs: 0,
      berries: 0,
      water: 3,
      mushrooms: 0,
      flowers: 1,
      crystals: 2,
      image: basePotionImageUrl("mana"),
    },
    {
      name: "Speed Potion",
      id: "speedPotion",
      herbs: 2,
      berries: 0,
      water: 2,
      mushrooms: 1,
      flowers: 1,
      crystals: 0,
      image: basePotionImageUrl("speed"),
    },
    {
      name: "Stealth Potion",
      id: "stealthPotion",
      herbs: 0,
      berries: 0,
      water: 1,
      mushrooms: 0,
      flowers: 2,
      crystals: 2,
      image: basePotionImageUrl("stealth"),
    },
    {
      name: "Antidote",
      id: "antidote",
      herbs: 1,
      berries: 3,
      water: 2,
      mushrooms: 0,
      flowers: 0,
      crystals: 0,
      image: basePotionImageUrl("antidote"),
    },
    {
      name: "Love Potion",
      id: "lovePotion",
      herbs: 0,
      berries: 0,
      water: 2,
      mushrooms: 0,
      flowers: 2,
      crystals: 2,
      image: basePotionImageUrl("love"),
    },
    {
      name: "Night Vision Potion",
      id: "nightvisionPotion",
      herbs: 1,
      berries: 0,
      water: 1,
      mushrooms: 0,
      flowers: 2,
      crystals: 1,
      image: basePotionImageUrl("nightvision"),
    },
    {
      id: "fireResistancePotion",
      name: "Fire Resistance Potion",
      herbs: 1,
      berries: 1,
      water: 3,
      mushrooms: 0,
      flowers: 1,
      crystals: 2,
      image: basePotionImageUrl("fire-resistance"),
    },
    {
      name: "Frost Resistance Potion",
      id: "frostResistancePotion",
      herbs: 1,
      berries: 2,
      water: 1,
      mushrooms: 1,
      flowers: 1,
      crystals: 2,
      image: basePotionImageUrl("frost-resistance"),
    },
    {
      name: "Lightning Resistance Potion",
      id: "lightningResistancePotion",
      herbs: 1,
      berries: 1,
      water: 1,
      mushrooms: 3,
      flowers: 0,
      crystals: 2,
      image: basePotionImageUrl("lightning-resistance"),
    },
    {
      id: "energyPotion",
      herbs: 4,
      berries: 2,
      water: 1,
      mushrooms: 1,
      flowers: 0,
      crystals: 0,
      name: "Energy Potion",
      image: basePotionImageUrl("energy"),
    },
    {
      id: "focusPotion",
      name: "Focus Potion",
      herbs: 1,
      berries: 0,
      water: 1,
      mushrooms: 0,
      flowers: 4,
      crystals: 2,
      image: basePotionImageUrl("focus"),
    },
  ];
  