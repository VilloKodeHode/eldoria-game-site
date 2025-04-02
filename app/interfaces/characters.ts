export interface CharacterRace {
    _id: string;
    description: string;
    raceCategory: string;
    starterAttributes: {
      vitality: number;
      agility: number;
      charisma: number;
      intelligence: number;
      wisdom: number;
      strength: number;
    };
    portraitMale?: string;    // resolved to image URL
    portraitFemale?: string;  // resolved to image URL
  }

  export interface CharacterClass {
    _id: string;
    _type: "characterClass";
    classCategory: string;
    tagline: string;
    mainTagline: string;
    archetype: string;
    visualIdentity: string;
    aethericConnection: string;
    aethericConnectionTagline: string;
    aethericAdaptation: string;
    aethericAdaptationTagline: string;
    philosophy: string;
    signatureAbilities: string[];
    symbolism: string;
    folklore: string;
  
    starterAttributes: {
      strength: number;
      vitality: number;
      agility: number;
      intelligence: number;
      wisdom: number;
      charisma: number;
    };
  
    logo?: {
      asset: {
        _ref: string;
      };
    };
  
    portrait?: {
      asset: {
        _ref: string;
      };
    };
  }