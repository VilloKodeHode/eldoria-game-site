export type ImageRef = string;

export interface AttributeMap {
  strength: number;
  vitality: number;
  agility: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface PotionEffect {
  duration: string;
  effectCategory: string[];
  affectedStat: string[];
  effectAmount: number;
}

export interface RecipeIngredient {
  amount: number;
  ingredient: {
    _id: string;
    name: string;
    src?: ImageRef;
  };
}


export interface StatEffect {
    stat: string;
    amount: number;
    duration?: number;
  }
  
  export interface DefensiveEffect {
    stat: string;
    amount: number;
  }
  
  export interface DamageEffect {
    type: string;
    min: number;
    max: number;
    duration?: number;
  }
