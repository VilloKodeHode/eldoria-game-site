export const locationFields = `
  allLocations[]->{
    _id, name, slug, shortDescription, longDescription, type, aetherAlignment, levelMin, levelMax,
    containsAetherNodes, isSafeZone, resourceTags,
    "portrait": portrait.asset->url,
    "mapMarker": mapMarker.asset->url,
    parentRegion->{ _id, name, "portrait": portrait.asset->url },
    relatedFations[]->{ _id, name, "symbol": logo.asset->url },
    inhabitants[]->{ _id, name, "portrait": portrait.asset->url },
    associatedQuests[]->{ _id, name, type },
    connectedLoreEntries[]->{ _id, title, mainTagline, "image": image.asset->url }
  },
`;