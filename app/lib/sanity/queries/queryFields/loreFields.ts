export const loreFields = `
  allLore[]->{
    _id, title, mainTagline, category, loreSummary, aetherAlignment,
    "image": image.asset->url,
  },
`;