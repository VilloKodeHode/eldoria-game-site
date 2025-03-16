"use client";

// import { ingredients } from "@/app/data/ingredients";
import { CraftSection } from "@/app/(pages)/shops/components/CraftSection";
import shopData from "./data/potionShopInfo.json";
import { CraftButton } from "../components/buttons/ShopButtons";
import { usePlayerInventory } from "@/app/stores/inventory/inventoryStore";
import itemsDataBase from "@/app/data/items.json";
import { PlayerInventory, ShopItem } from "@/app/interfaces/inventory";
import { useState } from "react";
import Image from "next/image";
import { TradeSection } from "../components/TradeSection";
// import { potions } from "@/app/(pages)/shops/potionShop/data/potions";

export default function Home() {
  const { addItem, playerInventory } = usePlayerInventory();
  const shopIngredients: ShopItem[] = itemsDataBase
    .filter((item) => item.subType === shopData.shopMaterialType)
    .map((item) => ({
      ...item,
      amount: 0,
    })) as ShopItem[];
  const [ingredients, setIngredients] = useState<ShopItem[]>(shopIngredients);

  // console.log(playerInventory);

  const shopItemsTosell: ShopItem[] = itemsDataBase
    .filter((item) => item.subType === shopData.shopType)
    .map((item) => ({
      ...item,
      amount: 0,
    })) as ShopItem[];

  const playerItemsTosell: ShopItem[] = playerInventory.items.potions
    .filter((item) => item.subType === shopData.shopType)
    .map((item) => ({
      ...item,
      amount: 0,
    })) as ShopItem[];

  // const [shopSellingItems, setShopSellingItems] =
  //   useState<ShopItem[]>(shopItemsTosell);
  const [craftedItem, setCraftedItem] = useState<ShopItem | null>();

  // const subTypeOfItems = ingredients[0].subType

  const attemptCraft = () => {
    const findMatchingRecipe = itemsDataBase.find((item) => {
      const ingredientsRecipes = Object.values(item.recipe.ingredients || {});
      const currentIngredients = ingredients.map(
        (ingredient) => ingredient.amount
      );
      return ingredientsRecipes.every(
        (requiredAmount, index) => currentIngredients[index] === requiredAmount
      );
    });

    if (findMatchingRecipe) {
      const craftedItem = { ...findMatchingRecipe, amount: 1 } as ShopItem;

      setCraftedItem(craftedItem);

      addItem(
        craftedItem.id,
        craftedItem.subType as keyof PlayerInventory["items"]
      );
    } else {
      setCraftedItem(null);
    }
  };

  return (
    <>
      {/* <div className="min-h-screen grid justify-center gap-24 items-center"> */}
        <section className="grid gap-16">
          <h1 className="text-center text-3xl absolute top-0 left-0 p-4">{shopData.title}</h1>
          <CraftSection setIngredients={setIngredients} items={ingredients} />
          <div className="flex justify-center gap-8">
            <CraftButton
              onClick={attemptCraft}
              isCreateButton={true}
              shopText={shopData}
            />
            <div className="result-area">
              {/* <p id="potionResultText">{shopData.resultText}</p> */}
              <Image
              className="w-64 h-64 rounded-lg"
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
              shopText={shopData}
            />
          </div>
        </section>
        <div className="grid gap-8 w-full">
        <TradeSection tradeItems={shopItemsTosell} />

        <TradeSection tradeItems={playerItemsTosell} buySection={false} />
        </div>

        {/* <div id="books">
          <button id="almanac-button">{potionShopContent.almanacButton}</button>
          <button id="compendium-button">
            {potionShopContent.compendiumButton}
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
        </div> */}
        <Image
          src={shopData.images.main}
          alt=""
          className="h-full w-full fixed top-0 left-0 object-cover -z-10 hue-rotate-30 opacity-10"
          width={1920}
          height={1080}
        />
      {/* </div> */}
    </>
  );
}
