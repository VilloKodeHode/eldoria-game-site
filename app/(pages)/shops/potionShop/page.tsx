"use client";

// import { ingredients } from "@/app/data/ingredients";
import { CraftSection } from "@/app/(pages)/shops/components/CraftSection";
import { potionShopTexts } from "./data/potionShopTexts";
import { CraftButton } from "../components/buttons/ShopButtons";
import { usePlayerInventory } from "@/app/stores/inventory/inventoryStore";
import itemsDataBase from "@/app/data/items.json";
import { InventoryItem, Item, PlayerInventory, ShopItem } from "@/app/data/inventory";
import { useState } from "react";
import Image from "next/image";
// import { potions } from "@/app/(pages)/shops/potionShop/data/potions";

export default function Home() {
  const { addItem } = usePlayerInventory();
  const shopIngredients: ShopItem[] = itemsDataBase
    .filter((item) => item.subType === "ingredient")
    .map((item) => ({
      ...item,
      amount: 0,
    })) as ShopItem[];
  const [ingredients, setIngredients] = useState<ShopItem[]>(shopIngredients);
  const [craftedItem, setCraftedItem] = useState<ShopItem | null>();

  // console.log(itemsDataBase);

  // console.log(
  //   itemsDataBase.map((item) => Object.values(item.recipe.ingredients))
  // );

  const attemptCraft = () => {
    const findMatchingRecipe = itemsDataBase.find((item) => {
      const recipieIngredients = Object.values(item.recipe.ingredients || {});
      const currentIngredients = ingredients.map(
        (ingredient) => ingredient.amount
      );
      return recipieIngredients.every(
        (requiredAmount, index) => currentIngredients[index] === requiredAmount
      );
    });
    // console.log(
    //   findMatchingRecipe ? { ...findMatchingRecipe, amount: 1 }  : null
    // );
    if (findMatchingRecipe) {
      const craftedItem = { ...findMatchingRecipe, amount: 1 } as ShopItem;
      
      setCraftedItem(craftedItem);

      addItem(craftedItem.id, craftedItem.subType as keyof PlayerInventory["items"]);

    } else {
      setCraftedItem(null);
    }
      
  };

  return (
    <>
      <div className="min-h-screen grid justify-center items-center">
        <div className="grid gap-16">
          <CraftSection setIngredients={setIngredients} items={ingredients} />
          <div className="flex justify-center gap-8">
            <CraftButton
              onClick={attemptCraft}
              isCreateButton={true}
              shopText={potionShopTexts}
            />
            <div className="result-area">
              <p id="potionResultText">{potionShopTexts.resultText}</p>
              <Image
                width={300}
                height={300}
                src={
                  craftedItem?.src
                    ? craftedItem?.src
                    : ("/images/potions/empty-potion.webp" as string)
                }
                alt=""
              />
            </div>
            <CraftButton
              onClick={null}
              isResetButton={true}
              shopText={potionShopTexts}
            />
          </div>
        </div>

        <div id="books">
          <button id="almanac-button">{potionShopTexts.almanacButton}</button>
          <button id="compendium-button">
            {potionShopTexts.compendiumButton}
          </button>

          <div id="almanac">
            <div id="almanac-content" className="almanac-content">
              <div className="almanac-background"></div>
            </div>
          </div>

          <div id="compendium">
            <div id="compendium-content" className="compendium-content">
              <div className="compendium-background"></div>
            </div>
          </div>
        </div>
        <div className="background"></div>
      </div>
    </>
  );
}
