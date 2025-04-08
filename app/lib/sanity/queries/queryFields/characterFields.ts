export const classFields = `
  allClasses[]->{
    _id, category, mainTagline, starterAttributes, "portrait": portrait.asset->url
  },
`;

export const raceFields = `
  allRaces[]->{
    _id, category, mainTagline, starterAttributes,
    "imageMale": portraitMale.asset->url,
    "imageFemale": portraitFemale.asset->url,
    "imageOther": portraitOther.asset->url,
  },
`;