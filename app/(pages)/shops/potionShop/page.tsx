// app/(pages)/shops/potionShop/page.tsx

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import shopData from "./data/potionShopInfo.json";
import { useSanityDataStore } from "@/app/stores/sanityData/sanityDataStore";
import { usePlayerInventory } from "@/app/stores/inventory/inventoryStore";
import { CraftSection } from "../components/CraftSection";
import { TradeSection } from "../components/TradeSection";
import { CraftButton } from "../components/buttons/ShopButtons";
import { addToInventory } from "@/app/lib/mongoDB/addToInventory";

export default function PotionShopPage() {
  const sanityIngredients = useSanityDataStore((state) => state.ingredients);
  const sanityPotions = useSanityDataStore((state) => state.potions);
  const { addItem, addRecipe, playerInventory } = usePlayerInventory();

  const [ingredients, setIngredients] = useState([]);
  const [shopSellingItems, setShopSellingItems] = useState([]);
  const [craftedItem, setCraftedItem] = useState(null);

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

  const attemptCraft = async (item) => {
    try {
      await addToInventory(item._id, "potion");
      setCraftedItem({ ...item, amount: 1 });
    } catch (err) {
      console.error("Crafting failed:", err);
    }
  };

  const resetCrafting = () => {
    setIngredients(ingredients.map((item) => ({ ...item, amount: 0 })));
    setCraftedItem(null);
  };

  return (
    <>
      <section className="grid gap-16">
        <h1 className="text-center text-3xl absolute top-0 left-0 p-4">
          {shopData.title}
        </h1>

        <CraftSection setIngredients={setIngredients} items={ingredients} />

        <div className="flex justify-center gap-8">
          <CraftButton onClick={null} isCreateButton shopText={shopData} />

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
              alt={craftedItem ? `Image of a ${craftedItem.name}` : "Empty potion"}
            />
          </div>

          <CraftButton onClick={resetCrafting} isResetButton shopText={shopData} />
        </div>
      </section>

      <div className="grid gap-8 w-full">
        <TradeSection tradeItems={shopSellingItems} />
        {/* <TradeSection tradeItems={playerItemsTosell} buySection={false} /> */}
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
