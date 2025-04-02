"use client";

import { useEffect } from "react";
import { usePlayerInventory } from "@/app/stores/inventory/inventoryStore";
import { useSanityDataStore } from "@/app/stores/sanityData/sanityDataStore";
import { fetchPlayerInventory } from "./fetchPlayerInventory";

export function PlayerInventoryLoader() {
  const setInventory = usePlayerInventory((state) => state.setInventory);
  const {
    sanityLoaded,
    ingredients,
    potions,
    // races,
    // classes,
  } = useSanityDataStore();

  useEffect(() => {
    if (!sanityLoaded) return;

    const loadAndEnrichInventory = async () => {
      try {
        const playerData = await fetchPlayerInventory();
        console.log("🧪 Raw player data:", playerData);

        const allSanityItems = [
          ...ingredients,
          ...potions,
          // add more when available
        ];

        const enrichedItems = playerData.items.map((item) => {
          const sanityItem = allSanityItems.find((s) => s._id === item.sanityId);
          return sanityItem
            ? {
                ...item,
                name: sanityItem.name,
                src: sanityItem.src,
                sellPrice: sanityItem.sellPrice,
                recipe: sanityItem.recipe,
                knowRecipe: !!sanityItem.recipe,
                type: sanityItem.subCategory?.[0] ?? "misc",
                ...(sanityItem.potion && { potion: sanityItem.potion }),
              }
            : item;
        });

        setInventory({
          currency: playerData.currency,
          items: enrichedItems,
          learnedRecipes: playerData.learnedRecipes ?? [],
        });

        console.log("✅ Inventory updated from DB and enriched");
      } catch (err) {
        console.error("❌ Failed to load and enrich inventory:", err);
      }
    };

    loadAndEnrichInventory();
  }, [sanityLoaded, ingredients, potions, setInventory]);

  return null;
}
