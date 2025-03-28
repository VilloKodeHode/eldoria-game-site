"use client";

import { useState } from "react";
import { usePlayerInventory } from "@/app/stores/inventory/inventoryStore";
import { useSanityDataStore } from "@/app/stores/sanityData/sanityDataStore";
import { ShopItem } from "@/app/interfaces/items";

export const DevCheats = () => {
  const { addGems, addGold, addItem } = usePlayerInventory();
  const [open, setOpen] = useState(false);
  const [itemId, setItemId] = useState("");

  // Sanity data slices
  const ingredients = useSanityDataStore((state) => state.ingredients);
  const potions = useSanityDataStore((state) => state.potions);
  // Extend here with more types later...

  const allSanityData = {
    ingredients,
    potions,
  };

  const [itemType, setItemType] =
    useState<keyof typeof allSanityData>("ingredients");
  const itemsInSelectedType: ShopItem[] = allSanityData[itemType] || [];

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 z-50 w-10 h-10 rounded-full bg-forest-emerald text-obsidian-black text-lg font-bold flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        title="Dev Cheats">
        ?
      </button>

      {open && (
        <div className="fixed bottom-20 right-4 z-50 bg-obsidian-black border border-forest-emerald text-forest-emerald p-6 rounded-xl shadow-2xl w-[320px] space-y-4 font-mono animate-fade-in">
          <h3 className="text-lg font-semibold text-center underline decoration-forest-emerald">
            Dev Cheats
          </h3>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => addGold(1000)}
              className="px-3 py-1 border border-forest-emerald rounded hover:bg-forest-emerald hover:text-obsidian-black transition">
              +1000 gold
            </button>
            <button
              onClick={() => addGems(100)}
              className="px-3 py-1 border border-forest-emerald rounded hover:bg-forest-emerald hover:text-obsidian-black transition">
              +100 gems
            </button>
          </div>

          <div className="space-y-2">
            {/* Select item type/category */}
            <select
              className="w-full px-2 py-1 border border-forest-emerald bg-transparent text-lunar-pearl rounded"
              value={itemType}
              onChange={(e) => {
                setItemType(e.target.value as keyof typeof allSanityData);
                setItemId(""); // Reset selected item
              }}>
              {Object.keys(allSanityData).map((type) => (
                <option
                  key={type}
                  value={type}>
                  {type}
                </option>
              ))}
            </select>

            {/* Select item */}
            <select
              className="w-full px-2 py-1 border border-forest-emerald bg-transparent text-lunar-pearl rounded"
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}>
              <option value="">Select item</option>
              {itemsInSelectedType.map((item) => (
                <option
                  key={item._id}
                  value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>

            {/* Add selected item */}
            <button
              onClick={() => {
                const itemToAdd = itemsInSelectedType.find(
                  (i) => i._id === itemId
                );
                if (itemToAdd) {
                  addItem(itemToAdd);
                } else {
                  console.warn("Item not found in sanity data.");
                }
              }}
              className="w-full px-3 py-1 border border-forest-emerald rounded hover:bg-forest-emerald hover:text-obsidian-black transition">
              Add item
            </button>
          </div>
        </div>
      )}
    </>
  );
};
