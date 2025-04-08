export const factionFields = `
  allFactions[]->{
    _id, name, slug, tagline, summary, beliefs, structure, origin,
    "symbol": symbol.asset->url,
    loreEntry->{ _id, title, mainTagline, "image": image.asset->url },
    notableMembers[]->{ _id, name, roleType, "portrait": portrait.asset->url },
    associatedEntities[]->{
      _id, _type, name, title, category, subCategory,
      "image": select(
        _type == "characterClass" => portrait.asset->url,
        _type == "characterRace" => portraitMale.asset->url,
        _type == "item" => src.asset->url,
        null
      )
    }
  },
`;