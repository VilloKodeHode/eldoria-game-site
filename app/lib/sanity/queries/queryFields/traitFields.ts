export const traitFields = `
  allTraits[]->{
    _id, name, slug, tooltip, description, traitType, rarity,
    "icon": icon.asset->url,
    statEffects[]{ stat, amount, duration },
    defensiveBonuses[]{ stat, amount },
    bonusDamage[]{ type, min, max, duration }
  },
`;