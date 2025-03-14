"use client";

import { ingredients } from "@/app/data/ingredients";
import { CraftSection } from "@/app/(pages)/shops/components/CraftSection";
import { potionShopTexts } from "./data/potionShopTexts";
import { CraftButton } from "../components/buttons/ShopButtons";
import { usePlayerInventory } from "@/app/stores/inventory/inventoryStore";

// import { potions } from "@/app/(pages)/shops/potionShop/data/potions";

export default function Home() {
    const {  } = usePlayerInventory();

  
  return (
    <>
      <div className="min-h-screen grid justify-center items-center">
        <div className="grid gap-16">
          <CraftSection items={ingredients} />
          <div className="flex justify-center gap-8">
            <CraftButton
              onClick={null}
              isCreateButton={true}
              shopText={potionShopTexts}
            />
            <div className="result-area">
              <p id="potionResultText">{potionShopTexts.resultText}</p>
              {/* <Image width={300} height={300} id="potionResultImage" src="" alt="" /> */}
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
            <div
              id="almanac-content"
              className="almanac-content">
              <div className="almanac-background"></div>
            </div>
          </div>

          <div id="compendium">
            <div
              id="compendium-content"
              className="compendium-content">
              <div className="compendium-background"></div>
            </div>
          </div>
        </div>
        <div className="background"></div>
      </div>
    </>
  );
}
