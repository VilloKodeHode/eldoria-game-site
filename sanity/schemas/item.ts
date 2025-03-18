export default {
    name: "item",
    title: "Item",
    type: "document",
    fields: [
      { name: "name", title: "Name", type: "string" },
      { name: "src", title: "Image", type: "image", options: { hotspot: true } },
      {
        name: "itemType",
        title: "Item Type",
        type: "string",
        options: {
          list: ["equippable", "consumable", "crafting"],
          layout: "radio",
        },
      },
      {
        name: "subType",
        title: "Sub Type",
        type: "string",
        options: {
          //TODO: you should be able to chose a subcategory based on the itemType (equippable spice sound strange) (is subtype needed? (since it is kinda chosen in fields inside of the different parts below))
          list: ["weapon", "armour", "potion", "food", "ingredient", "material, spices"],
        },
      },
  
      // ✅ Show only if itemType is "equippable and armour"
      {
        name: "equippable",
        title: "Equippable",
        type: "object",
        hidden: ({ parent }: { parent: { itemType: string } }) => parent?.itemType !== "equippable",
        //TODO: Should be extended to have more options (from damage - to damage ? elemental damage? Should be split into armour and weapon?)
        fields: [
          { name: "slot", title: "Slot", type: "string" },
          { name: "damageType", title: "Damage Type", type: "string" },
          { name: "damage", title: "array", of: [{ type: "number" }] },
          { name: "defense", title: "Defense", type: "number" },
        ],
      },
// ✅ Show only if itemType is "equippable and weapon"
//TODO create this section

  
      // ✅ Show only if itemType is "consumable"
      {
        name: "consumable",
        title: "Consumable",
        type: "object",
        hidden: ({ parent }: { parent: { itemType: string } }) => parent?.itemType !== "consumable",
        fields: [
          { name: "effectType", title: "Effect Type", type: "string" },
          { name: "affectedStat", title: "Affected Stat", type: "string" },
          { name: "effectAmount", title: "Effect Amount", type: "number" },
          { name: "duration", title: "Duration", type: "string" },
        ],
      },
  
      // ✅ Show only if itemType is "crafting"
      {
        name: "crafting",
        title: "Crafting",
        type: "object",
        hidden: ({ parent }: { parent: { itemType: string } }) => parent?.itemType !== "crafting",
        fields: [
          { name: "materialType", title: "Material Type", type: "string",
            options: {
              list: ["food", "ingredient", "material", "spices"],
            },
           },
          // { name: "requiredLevel", title: "Required Level", type: "number" },
        ],
      },
      { name: "buyPrice", title: "Buy Price", type: "number" },
      { name: "sellPrice", title: "Sell Price", type: "number" },
    ],
  };
  