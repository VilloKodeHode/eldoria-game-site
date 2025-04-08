import {
    DamageEffect,
    DefensiveEffect,
    ImageRef,
    StatEffect,
  } from "./shared";
  
  export interface Skill {
    _id: string;
    name: string;
    slug: string;
    description: string;
    tooltip?: string;
    type: string;
    source?: string;
    category?: string;
    targetType?: string;
    aetherAffinity?: string;
    elementalType?: string;
    physicalType?: string;
    range?: number;
    cooldown?: number;
    duration?: number;
    cost?: number;
    icon?: ImageRef;
  
    conditionsApplied?: string[];
    conditionsRequired?: string[];
    affectedStats?: StatEffect[];
  
    offensiveStats?: DamageEffect[];
    defensiveStats?: DefensiveEffect[];
    statEffects?: StatEffect[];
  
    linkedTrait?: {
      _id: string;
      name: string;
    };
  
    linkedItem?: {
      _id: string;
      name: string;
      image?: ImageRef;
    };
  }
  