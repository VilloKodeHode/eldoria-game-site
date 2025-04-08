export const questFields = `
  allQuests[]->{
    _id, name, slug, shortDescription, longDescription, type, levelRequirement, objectiveSummary, tags,
    experience, gold, rewardTier,
    questSteps[]{ title, description, optional },
    startNpc->{ _id, name, "image": portrait.asset->url },
    endNpc->{ _id, name, "image": portrait.asset->url },
    availableAt[]->{ _id, name },
    requiredQuests[]->{ _id, name },
    requiredItems[]->{ _id, name, "image": src.asset->url },
    requiredConditions[]{ key, value },
    completionTriggers[]{
      conditionType, targetId, amount,
      requiredItems[]->{ _id, name, "image": src.asset->url }
    },
    rewardItems[]->{ _id, name, "image": src.asset->url },
    rewardSkills[]->{ _id, name, "image": icon.asset->url },
    linkedLoreEntry->{ _id, title, mainTagline, "image": image.asset->url },
    faction[]->{ _id, name, "symbol": logo.asset->url }
  },
`;