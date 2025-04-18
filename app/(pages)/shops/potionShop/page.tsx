// app/(pages)/shops/potionShop/page.tsx

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import shopData from "./data/potionShopInfo.json";
import { useSanityDataStore } from "@/app/stores/sanityData/sanityDataStore";
import { CraftSection } from "../components/CraftSection";
import { TradeSection } from "../components/TradeSection";
import { CraftButton } from "../components/buttons/ShopButtons";
import { usePlayerInventory } from "@/app/stores/inventory/inventoryStore";
import { PotionShopSkeleton } from "@/app/components/ui/loading/PotionShopSkeleton";
import { CraftingItem, InventoryItem, ShopItem } from "@/app/interfaces/items";

export default function PotionShopPage() {

const sanity = useSanityDataStore();
  console.log("🧪 Zustand Sanity Data:", sanity);

  const { playerInventory, removeItem, addItem } = usePlayerInventory();
  const sanityIngredients = useSanityDataStore((state) => state.ingredients);
  const sanityPotions = useSanityDataStore((state) => state.potions);

  const [ingredients, setIngredients] = useState<CraftingItem[]>([]);
  const [craftedItem, setCraftedItem] = useState<InventoryItem | null>(null);

  const potionItemsToSell = playerInventory.items
    .filter((invItem) => sanityPotions.some((p) => p._id === invItem.sanityId))
    .map((invItem) => {
      const potion = sanityPotions.find((p) => p._id === invItem.sanityId);
      return potion ? { ...potion, amount: invItem.amount } : null;
    })
    .filter(Boolean) as ShopItem[];

  const shopSellingItems = sanityPotions.map((item) => ({ ...item, amount: 0 }));

  useEffect(() => {
    if (sanityIngredients.length > 0) {
      setIngredients(sanityIngredients.map((item) => ({ ...item, amount: 0 })));
    }
  }, [sanityIngredients]);

  const attemptCraft = async (potion: ShopItem) => {
    if (!potion.recipe) return;

    const hasAllIngredients = potion.recipe.every((r) => {
      const invItem = playerInventory.items.find(
        (i) => i.sanityId === r.ingredient._id
      );
      return invItem && invItem.amount >= r.amount;
    });

    if (!hasAllIngredients) return console.warn("Missing ingredients");

    potion.recipe.forEach((r) => {
      removeItem(r.ingredient._id, "ingredients", r.amount);
    });
    console.log("🧪 Crafting payload:", {
      itemId: potion._id,
      itemType: "potion",
      amount: 1,
    });
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

      await fetch("/api/player/learn-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: potion._id }),
      });

      setIngredients((prev) => prev.map((item) => ({ ...item, amount: 0 })));
    } catch (err) {
      console.error("Craft failed:", err);
    }
  };

  const resetCrafting = () => {
    setIngredients((prev) => prev.map((item) => ({ ...item, amount: 0 })));
    setCraftedItem(null);
  };

  if (sanityIngredients.length === 0 || sanityPotions.length === 0) {
    return <PotionShopSkeleton />;
  }

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
    const chosenPotion = sanityPotions.find((p) =>
      p.recipe?.every((r) => {
        const used = ingredients.find(
          (i) => i._id === r.ingredient._id
        );
        return used?.amount === r.amount;
      })
    );
    if (chosenPotion) {
      attemptCraft(chosenPotion);
    } else {
      alert("No valid recipe selected.");
    }
  }}
  isCreateButton
  shopText={shopData}
/>

          <div>
            <p>{craftedItem ? `Successfully created: ${craftedItem.name}` : ""}</p>
            <Image
              className="w-64 h-64 rounded-lg"
              width={300}
              height={300}
              src={craftedItem?.src ?? "/images/potions/empty-potion.webp"}
              alt={craftedItem ? `Image of a ${craftedItem.name}` : "Empty potion"}
            />
          </div>

          <CraftButton onClick={resetCrafting} isResetButton shopText={shopData} />
        </div>
      </section>

      <div className="grid gap-8 w-full">
        <TradeSection tradeItems={shopSellingItems} />
        <TradeSection tradeItems={potionItemsToSell} buySection={false} />
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
