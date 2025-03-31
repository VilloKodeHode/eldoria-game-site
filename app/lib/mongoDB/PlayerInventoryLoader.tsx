"use client";

import { useEffect } from "react";
import { usePlayerInventory } from "@/app/stores/inventory/inventoryStore";
import { useSanityDataStore } from "@/app/stores/sanityData/sanityDataStore";
import { fetchPlayerInventory } from "./fetchPlayerInventory";

export function PlayerInventoryLoader() {
  const setInventory = usePlayerInventory((state) => state.setInventory);
  const sanityData = useSanityDataStore();

  useEffect(() => {
    if (!sanityData.sanityLoaded) return; // wait for sanity data to load first

    const loadAndEnrichInventory = async () => {
      try {
        const playerData = await fetchPlayerInventory();
        console.log("🧪 Raw player data:", playerData);

        const allSanityItems = [
          ...sanityData.ingredients,
          ...sanityData.potions,
          // Later you can include:
          // ...sanityData.weapons,
          // ...sanityData.armor,
          // ...sanityData.materials,
          // ...sanityData.foods,
        ];

        // Only enrich items from the DB
        const enrichedItems = playerData.items.map((item) => {
          const match = allSanityItems.find((s) => s._id === item.sanityId);
          return match
            ? {
                ...item,
                name: match.name,
                src: match.src,
                sellPrice: match.sellPrice,
                recipe: match.recipe,
                knowRecipe: !!match.recipe,
                ...(match.potion && { potion: match.potion }),
              }
            : item; // fallback to raw if no match
        });

        // 👇 always trust currency and learnedRecipes from DB
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
  }, [
    sanityData.sanityLoaded,
    setInventory,
    sanityData.ingredients,
    sanityData.potions,
  ]);

  return null;
}
