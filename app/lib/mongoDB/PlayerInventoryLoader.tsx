"use client"

import { useEffect } from "react"
import { usePlayerInventory } from "@/app/stores/inventory/inventoryStore"
import { useSanityDataStore } from "@/app/stores/sanityData/sanityDataStore"
import { fetchPlayerInventory } from "./fetchPlayerInventory"

export function PlayerInventoryLoader() {
  const setInventory = usePlayerInventory((state) => state.setInventory)
  const sanityData = useSanityDataStore()

  useEffect(() => {
    if (!sanityData.sanityLoaded) return // wait for sanity data to load first

    const loadAndEnrichInventory = async () => {
      try {
        const playerData = await fetchPlayerInventory()
        console.log("🧪 Raw player data:", playerData);
        const { items, currency, learnedRecipes = [] } = playerData;

        const allSanityItems = [
          ...sanityData.ingredients,
          ...sanityData.potions,
          // Later you can include:
          // ...sanityData.weapons,
          // ...sanityData.armor,
          // ...sanityData.materials,
          // ...sanityData.foods,
        ]

        const enrichedItems = items.map((item) => {
          const sanityItem = allSanityItems.find((s) => s._id === item.sanityId)
          return sanityItem
            ? {
                ...item,
                name: sanityItem.name,
                src: sanityItem.src,
                sellPrice: sanityItem.sellPrice,
                recipe: sanityItem.recipe,
                knowRecipe: !!sanityItem.recipe,
                ...(sanityItem.potion && { potion: sanityItem.potion }),
              }
            : item
        })

        setInventory({
          currency,
          items: enrichedItems,
          learnedRecipes,
        })

        console.log("✅ Player inventory loaded with recipes:", learnedRecipes)
      } catch (err) {
        console.error("❌ Failed to load and enrich inventory:", err)
      }
    }

    loadAndEnrichInventory()
  }, [
    sanityData.sanityLoaded,
    setInventory,
    sanityData.ingredients,
    sanityData.potions,
  ])

  return null
}
