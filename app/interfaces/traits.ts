import {
    DamageEffect,
    DefensiveEffect,
    ImageRef,
    StatEffect,
  } from "./shared";
  
  export interface Trait {
    _id: string;
    name: string;
    slug: string;
    tooltip: string;
    description: string;
    traitType: string;
    rarity: string;
    icon?: ImageRef;
  
    statEffects?: StatEffect[];
    defensiveBonuses?: DefensiveEffect[];
    bonusDamage?: DamageEffect[];
  }