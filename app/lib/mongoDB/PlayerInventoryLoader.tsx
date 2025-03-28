"use client";

import { useEffect } from "react";
import { usePlayerInventory } from "@/app/stores/inventory/inventoryStore";
import { useSanityDataStore } from "@/app/stores/sanityData/sanityDataStore";
import { fetchPlayerInventory } from "./fetchPlayerInventory";

export function PlayerInventoryLoader() {
  const setInventory = usePlayerInventory((state) => state.setInventory);
  const sanityData = useSanityDataStore();

  useEffect(() => {
    if (!sanityData.sanityLoaded) return; // wait for sanity data

    const loadAndEnrichInventory = async () => {
      try {
        const rawInventory = await fetchPlayerInventory();

        console.log("📦 Raw inventory from DB:", rawInventory);

        const allSanityItems = [
          ...sanityData.ingredients,
          ...sanityData.potions,
          // ...sanityData.weapons, 
          // ...sanityData.armour, 
          // etc....
        ];

        const enrichedItems = rawInventory.items.map((item) => {
          const sanityItem = allSanityItems.find((s) => s._id === item.sanityId);
          return sanityItem
            ? {
                ...item,
                name: sanityItem.name,
                src: sanityItem.src,
                sellPrice: sanityItem.sellPrice,
                recipe: sanityItem.recipe,
                knowRecipe: !!sanityItem.recipe,
                ...(sanityItem.potion && { potion: sanityItem.potion }),
                // Add other item-type enrichments here if needed
              }
            : item; // fallback if no match found
        });

        console.log("✨ Enriched inventory:", enrichedItems);

        setInventory({
          ...rawInventory,
          items: enrichedItems,
        });
      } catch (err) {
        console.error("Failed to load and enrich inventory:", err);
      }
    };

    loadAndEnrichInventory();
  }, [
    sanityData.sanityLoaded,
    setInventory,
    sanityData.ingredients,
    sanityData.potions,
    // Add to deps when new categories are included
  ]);

  return null; // no UI
}
