export const npcFields = `
  allNPCs[]->{
    _id, name, roleType, isHostile, isBoss, description, aetherAlignment, raceTags, classTags, dialogueKey,
    inventory[]->{ _id, name, "image": src.asset->url },
    skillSet[]->{ _id, name, type },
    faction[]->{ _id, name },
    spawnLocations[]->{ _id, name },
    lootTable[]->{ _id, name },
    level, health, speed, enemyType, lootTier, dangerRating, canBeTamed, combatType, aggroType, elementalType, physicalType,
    corruptedFormOf->{ _id, category },
    "portrait": portrait.asset->url,
  },
`;