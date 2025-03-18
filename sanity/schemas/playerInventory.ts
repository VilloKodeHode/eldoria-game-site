export default {
    name: "playerInventory",
    title: "Player Inventory",
    type: "document",
    fields: [
      {
        name: "currency",
        title: "Currency",
        type: "object",
        fields: [
          { name: "gold", title: "Gold", type: "number" },
          { name: "gems", title: "Gems", type: "number" },
        ],
      },
      {
        name: "items",
        title: "Items",
        type: "array",
        of: [{ type: "reference", to: [{ type: "item" }] }],
      },
    ],
  };