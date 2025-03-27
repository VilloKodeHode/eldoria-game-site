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
import { useSanityDataStore } from "@/app/stores/sanityData/sanityDataStore";
// import { potions } from "@/app/(pages)/shops/potionShop/data/potions";

export default function Home() {
  const sanityIngredients = useSanityDataStore((state) => state.ingredients);
  const sanityPotions = useSanityDataStore((state) => state.potions);

  console.log("sanityIngredients: ", sanityIngredients);
  console.log("sanityPotions: ", sanityPotions);
  const { addItem, addRecipe, playerInventory } = usePlayerInventory();
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

  //TODO: need to filter out items that has "craftable": false
  const attemptCraft = () => {
    const findMatchingRecipe = itemsDataBase.find((item) => {
      const ingredientsRecipes = Object.values(item.recipe.ingredients || {});
      // get current set ingredients in the potionShop UI:
      const currentIngredients = ingredients.map(
        (ingredient) => ingredient.amount
      );
      return ingredientsRecipes.every(
        (requiredAmount, index) => currentIngredients[index] === requiredAmount
      );
    });

    if (findMatchingRecipe) {
      const craftedItem = {
        ...findMatchingRecipe,
        amount: 1,
        knowRecipe: true,
      } as ShopItem;

      setCraftedItem(craftedItem);

      addItem(
        craftedItem.id,
        craftedItem.subType as keyof PlayerInventory["items"]
      );
      addRecipe(
        craftedItem.id,
        craftedItem.subType as keyof PlayerInventory["items"]
      );
      setIngredients(shopIngredients);
    } else {
      setCraftedItem(null);
    }
  };
  console.log(sanityIngredients[0]?.src?.asset._ref);
  // console.log(ingredients)
  return (
    <>
      {/* <div className="min-h-screen grid justify-center gap-24 items-center"> */}
      <section className="grid gap-16">
        <h1 className="text-center text-3xl absolute top-0 left-0 p-4">
          {shopData.title}
        </h1>

        <div className="min-h-screen flex justify-center items-center gap-8">
          {sanityIngredients &&
            sanityIngredients.map((ingredient) => (
              <div
                className="bg-obsidian-black p-4"
                key={ingredient._id}>
                <p>{ingredient.name}</p>
                {/* <Image
                  src={ingredient.src.asset._ref}
                  alt={ingredient.name}
                /> */}
              </div>
            ))}
        </div>
        <CraftSection
          setIngredients={setIngredients}
          items={ingredients}
        />
        <div className="flex justify-center gap-8">
          <CraftButton
            onClick={attemptCraft}
            isCreateButton={true}
            shopText={shopData}
          />
          <div>
            <p>
              {craftedItem ? "successfully created: " + craftedItem.name : ""}
            </p>
            <Image
              className="w-64 h-64 rounded-lg"
              width={300}
              height={300}
              src={
                craftedItem?.src && ingredients
                  ? craftedItem?.src
                  : "/images/potions/empty-potion.webp"
              }
              alt={craftedItem ? "Image of a " + craftedItem.name : ""}
            />
          </div>
          <CraftButton
            onClick={() => (
              setIngredients(shopIngredients), setCraftedItem(null)
            )}
            isResetButton={true}
            shopText={shopData}
          />
        </div>
      </section>
      <div className="grid gap-8 w-full">
        <TradeSection tradeItems={shopItemsTosell} />

        <TradeSection
          tradeItems={playerItemsTosell}
          buySection={false}
        />
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
