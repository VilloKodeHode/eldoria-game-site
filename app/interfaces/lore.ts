import { ImageRef } from "./shared";

export interface LoreEntry {
  _id: string;
  title: string;
  mainTagline: string;
  category: string;
  loreSummary: string;
  aetherAlignment?: string;
  image?: ImageRef;
}
