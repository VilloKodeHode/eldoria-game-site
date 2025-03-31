"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import shopData from "./data/potionShopInfo.json";
import { useSanityDataStore } from "@/app/stores/sanityData/sanityDataStore";
import { CraftSection } from "../components/CraftSection";
import { TradeSection } from "../components/TradeSection";
import { CraftButton } from "../components/buttons/ShopButtons";
import { usePlayerInventory } from "@/app/stores/inventory/inventoryStore";
import { fetchPlayerInventory } from "@/app/lib/mongoDB/fetchPlayerInventory";
import { PotionShopSkeleton } from "@/app/components/ui/loading/PotionShopSkeleton";
import { CraftingItem, InventoryItem, ShopItem } from "@/app/interfaces/items";

export default function PotionShopPage() {
  const { playerInventory, removeItem, addItem } = usePlayerInventory();
  const sanityIngredients = useSanityDataStore((state) => state.ingredients);
  const sanityPotions = useSanityDataStore((state) => state.potions);
  const setInventory = usePlayerInventory((state) => state.setInventory);

  const [isLoading, setIsLoading] = useState(true);
  const [ingredients, setIngredients] = useState<CraftingItem[]>([]);
  const [shopSellingItems, setShopSellingItems] = useState<ShopItem[]>([]);
  const [craftedItem, setCraftedItem] = useState<InventoryItem | null>(null);

  // Load inventory once
  useEffect(() => {
    async function loadInventory() {
      try {
        const inventory = await fetchPlayerInventory();
        setInventory(inventory);
      } catch (err) {
        console.error("Failed to load inventory:", err);
      }
    }

    loadInventory();
  }, [setInventory]);

  // Wait for Sanity data
  useEffect(() => {
    if (sanityIngredients.length > 0 && sanityPotions.length > 0) {
      setIsLoading(false);
    }
  }, [sanityIngredients, sanityPotions]);

  // Map ingredients
  useEffect(() => {
    if (sanityIngredients.length > 0) {
      const mapped = sanityIngredients.map((item) => ({
        ...item,
        amount: 0,
        id: item.itemID.current,
      }));
      setIngredients(mapped);
    }
  }, [sanityIngredients]);

  // Map potions
  useEffect(() => {
    if (sanityPotions.length > 0) {
      const mapped = sanityPotions.map((item) => ({
        ...item,
        amount: 0,
        id: item.itemID.current,
      }));
      setShopSellingItems(mapped);
    }
  }, [sanityPotions]);

  const attemptCraft = async (potion: ShopItem) => {
    if (!potion.recipe) return;

    // Check if player has all required ingredients
    const hasAllIngredients = potion.recipe.every((r) => {
      const invItem = playerInventory.items.find(
        (i) => i.sanityId === r.ingredient._id
      );
      return invItem && invItem.amount >= r.amount;
    });

    if (!hasAllIngredients) {
      alert("You don't have all the required ingredients!");
      return;
    }

    // Remove ingredients locally
    potion.recipe.forEach((r) => {
      removeItem(r.ingredient._id, "ingredients", r.amount);
    });

    // Save crafted potion to DB
    try {
      const res = await fetch("/api/player/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: potion._id,
          itemType: "potion",
          amount: 1,
        }),
      });

      if (!res.ok) throw new Error("Crafting sync failed");

      addItem(potion);
      setCraftedItem({
        sanityId: potion._id,
        amount: 1,
        type: "potion",
        name: potion.name,
        src: potion.src,
        sellPrice: potion.sellPrice,
        potion: potion.potion,
        recipe: potion.recipe,
        knowRecipe: true,
      });

      alert(`You successfully crafted ${potion.name}!`);
      setIngredients((prev) => prev.map((item) => ({ ...item, amount: 0 })));
    } catch (err) {
      console.error("Craft failed:", err);
    }
  };

  const resetCrafting = () => {
    setIngredients((prev) => prev.map((item) => ({ ...item, amount: 0 })));
    setCraftedItem(null);
  };

  if (isLoading) return <PotionShopSkeleton />;

  return (
    <>
      <section className="grid gap-16">
        <h1 className="text-center text-3xl absolute top-0 left-0 p-4">
          {shopData.title}
        </h1>

        <CraftSection setIngredients={setIngredients} items={ingredients} />

        <div className="flex justify-center gap-8">
          <CraftButton
            onClick={() => {
              const matchedPotion = shopSellingItems.find((potion) => {
                if (!potion.recipe) return false;

                return potion.recipe.every((r) => {
                  const used = ingredients.find(
                    (i) => i._id === r.ingredient._id
                  );
                  return used?.amount === r.amount;
                });
              });

              if (!matchedPotion) {
                alert("No valid recipe selected.");
                return;
              }

              attemptCraft(matchedPotion);
            }}
            isCreateButton
            shopText={shopData}
          />

          <div>
            <p>
              {craftedItem ? `Successfully created: ${craftedItem.name}` : ""}
            </p>
            <Image
              className="w-64 h-64 rounded-lg"
              width={300}
              height={300}
              src={
                craftedItem?.src ?? "/images/potions/empty-potion.webp"
              }
              alt={
                craftedItem
                  ? `Image of a ${craftedItem.name}`
                  : "Empty potion"
              }
            />
          </div>

          <CraftButton
            onClick={resetCrafting}
            isResetButton
            shopText={shopData}
          />
        </div>
      </section>

      <div className="grid gap-8 w-full">
        <TradeSection tradeItems={shopSellingItems} />
      </div>

      <Image
        src={shopData.images.main}
        alt=""
        className="h-full w-full fixed top-0 left-0 object-cover -z-10 hue-rotate-30 opacity-10"
        width={1920}
        height={1080}
      />
    </>
  );
}
