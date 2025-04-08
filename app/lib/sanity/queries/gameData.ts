import { classFields, raceFields } from "./queryFields/characterFields";
import { factionFields } from "./queryFields/factionFields";
import { armourFields, foodFields, ingredientFields, jewelryFields, materialFields, potionFields, spiceFields, weaponFields } from "./queryFields/itemFields";
import { locationFields } from "./queryFields/locationFields";
import { loreFields } from "./queryFields/loreFields";
import { npcFields } from "./queryFields/npcFields";
import { questFields } from "./queryFields/questFields";
import { skillFields } from "./queryFields/skillFields";
import { structureFields } from "./queryFields/structureFields";
import { traitFields } from "./queryFields/traitFields";

export const gameContentEntryPointQuery = `
*[_type == "gameContentEntryPoint"][0]{
  ${ingredientFields}
  ${materialFields}
  ${spiceFields}
  ${potionFields}
  ${foodFields}
  ${weaponFields}
  ${armourFields}
  ${jewelryFields}
  ${classFields}
  ${raceFields}
  ${loreFields}
  ${npcFields}
  ${skillFields}
  ${structureFields}
  ${questFields}
  ${locationFields}
  ${factionFields}
  ${traitFields}
}`;