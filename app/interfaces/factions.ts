import { ImageRef } from "./shared";

export interface Faction {
  _id: string;
  name: string;
  slug: string;
  tagline: string;
  summary: string;
  beliefs?: string;
  structure?: string;
  origin?: string;
  symbol?: ImageRef;

  loreEntry?: {
    _id: string;
    title: string;
    mainTagline: string;
    image?: ImageRef;
  };

  notableMembers?: {
    _id: string;
    name: string;
    roleType?: string;
    portrait?: ImageRef;
  }[];

  associatedEntities?: {
    _id: string;
    _type: string;
    name: string;
    title?: string;
    category?: string;
    subCategory?: string;
    image?: ImageRef;
  }[];
}
