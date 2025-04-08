export const structureFields = `
  allStructures[]->{
    _id, name, slug, description, structureType, tags, aetherAlignment, "image": image.asset->url,
    linkedLocation->{ _id, name, "image": image.asset->url },
    faction[]->{ _id, name, "symbol": logo.asset->url },
    loreEntry->{ _id, title, mainTagline, "image": image.asset->url },
    associatedItems[]->{ _id, name, category, subCategory, "image": src.asset->url }
  },
`;