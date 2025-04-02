import { defineQuery } from "next-sanity";

export const allRaces = defineQuery(`*[_type == "characterRace"]{
    _id,
    description,
    raceCategory,
    starterAttributes,
    "portraitMale": portraitMale.asset->url,
    "portraitFemale": portraitFemale.asset->url
  }`);
  
  export const allClasses = defineQuery(`*[_type == "characterClass"] {
    _id,
    _type,
    classCategory,
    tagline,
    mainTagline,
    archetype,
    visualIdentity,
    aethericConnection,
    aethericConnectionTagline,
    aethericAdaptation,
    aethericAdaptationTagline,
    philosophy,
    symbolism,
    folklore,
    description,
    starterAttributes,
    signatureAbilities,
    "portrait": portrait.asset->url,
    "logo": logo.asset->url,
  }`);
  