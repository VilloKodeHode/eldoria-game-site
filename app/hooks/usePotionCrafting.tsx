"use client"

import { useState } from "react";
import { CraftingItem, InventoryItem, ShopItem } from "../interfaces/items";
import { usePlayerInventory } from "../stores/inventory/inventoryStore";

export function usePotionCrafting(
    potions: ShopItem[],
    ingredients: CraftingItem[],
    setIngredients: (i: CraftingItem[]) => void
  ) {
    const { playerInventory, removeItem, addItem } = usePlayerInventory();
    const [craftedItem, setCraftedItem] = useState<InventoryItem | null>(null);
  
    const attemptCraft = async () => {
      const chosenPotion = potions.find((potion) =>
        potion.recipe?.every((r) => {
          const used = ingredients.find((i) => i._id === r.ingredient._id);
          return used?.amount === r.amount;
        })
      );
  
      if (!chosenPotion) return alert("No valid recipe selected");
  
      const hasAllIngredients = chosenPotion.recipe?.every((r) => {
        const invItem = playerInventory.items.find((i) => i.sanityId === r.ingredient._id);
        return invItem && invItem.amount >= r.amount;
      });
  
      if (!hasAllIngredients) {
        console.warn("Missing ingredients");
        return;
      }
  
      // Remove ingredients locally
      chosenPotion.recipe.forEach((r) => {
        removeItem(r.ingredient._id, "ingredients", r.amount);
      });
  
      try {
        const [craftRes, learnRes] = await Promise.all([
          fetch("/api/player/inventory", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              itemId: chosenPotion._id,
              itemType: "potion",
              amount: 1,
            }),
          }),
          fetch("/api/player/learn-recipe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ itemId: chosenPotion._id }),
          }),
        ]);
  
        if (!craftRes.ok) throw new Error("Crafting sync failed");
  
        addItem(chosenPotion);
        setCraftedItem({
          sanityId: chosenPotion._id,
          amount: 1,
          type: "potion",
          name: chosenPotion.name,
          src: chosenPotion.src,
          sellPrice: chosenPotion.sellPrice,
          potion: chosenPotion.potion,
          recipe: chosenPotion.recipe,
          knowRecipe: true,
        });
  
        setIngredients(ingredients.map((item) => ({ ...item, amount: 0 })));
      } catch (err) {
        console.error("Craft failed:", err);
      }
    };
  
    const resetCrafting = () => {
      setIngredients(ingredients.map((item) => ({ ...item, amount: 0 })));
      setCraftedItem(null);
    };
  
    return {
      attemptCraft,
      resetCrafting,
      craftedItem,
    };
  }
  