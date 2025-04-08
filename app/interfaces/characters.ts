import { AttributeMap, ImageRef } from "./shared";

export interface CharacterRace {
  _id: string;
  raceCategory: string;
  mainTagline: string;
  starterAttributes: AttributeMap;
  portraitMale?: ImageRef;
  portraitFemale?: ImageRef;
  portraitOther?: ImageRef;
}

export interface CharacterClass {
  _id: string;
  classCategory: string;
  mainTagline: string;
  starterAttributes: AttributeMap;
  portrait?: ImageRef;
}