export const skillFields = `
  allSkills[]->{
    _id, name, slug, description, tooltip, type, source, category, targetType, aetherAffinity,
    elementalType, physicalType, range, cooldown, duration, cost,
    conditionsApplied, conditionsRequired,
    "icon": icon.asset->url,
    affectedStats[]{ stat, amount },
    offensiveStats,
    defensiveStats,
    statEffects,
    linkedTrait->{ _id, name },
    linkedItem->{ _id, name, "image": src.asset->url }
  },
`;